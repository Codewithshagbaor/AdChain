from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db import models
import uuid, secrets
from django.utils import timezone
from apps.utils import enums
from apps.utils.helpers.model.base import BaseModelMixin
from configs.celery.queue import CeleryQueue
from django.utils.translation import gettext_lazy as _
import random
import string

class UserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError("Email is required")
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self.create_user(email, password, **extra_fields)
    
    def get_by_phone_number(self, phone_number):
        return self.filter(**{"phone_number": phone_number}).first()

    def get_by_email(self, email):
        return self.filter(**{"email": email}).first()

class User(AbstractBaseUser, PermissionsMixin):
    id = models.CharField(primary_key=True, max_length=15, editable=False, unique=True)
    email = models.EmailField(unique=True, blank=True, null=True)
    phone_number = models.CharField(max_length=20, blank=True, null=True, unique=True)
    first_name = models.CharField(max_length=255, blank=True, null=True)
    last_name = models.CharField(max_length=255, blank=True, null=True)
    
    wallet_address = models.CharField(max_length=42, unique=True, null=True)
    nonce = models.CharField(max_length=100, null=True)
    
    role = models.CharField(
        choices=enums.UserAccountType.choices(),
        default=enums.UserAccountType.PUBLISHER.value,
        null=False,
        blank=False,
        max_length=20
    )
    
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)  # Django admin access

    
    avatar = models.ImageField(upload_to='avatars/', null=True, blank=True)

    points = models.DecimalField(max_digits=15, decimal_places=2, default=0.00)
    
    is_email_verified = models.BooleanField(_("Email Verified"),default=False)
    is_phone_number_verified = models.BooleanField(_("Phone Number Verified"), default=False)

    
    otp = models.CharField(
        _("Otp"), default="0000", max_length=6, blank=True, null=True
    )
    otp_expiration = models.DateTimeField(blank=True, null=True)



    date_joined = models.DateTimeField(auto_now_add=True, editable=True)

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    def __str__(self):
        return f"{self.email} - {self.phone_number}"
    
    def get_fullname(self):
        return f"{self.first_name} {self.last_name}"

    def verify_email(self):
        self.is_email_verified = True
        self.save()
    
    def verify_phone_number(self):
        self.is_phone_number_verified = True
        self.save()

    def send_otp(self, channel="sms"):
        assert self.phone_number, "User must have a valid phone number for OTP Verification"
        from .tasks import send_otp_to_user
        send_otp_to_user.apply_async((self.id, channel), queue=CeleryQueue.Definitions.ACCOUNT_VERIFICATION)

    def send_email_verification(self):
        assert self.email, "User must have a valid email for Email Verification"
        from .tasks import send_email_verification
        send_email_verification.apply_async((self.id,), queue=CeleryQueue.Definitions.ACCOUNT_VERIFICATION)
    
    def add_phone_number(self, phone_number):
        """Update phone number and send OTP for verification."""
        self.phone_number = phone_number
        self.is_phone_number_verified = False
        self.save()
        self.send_otp(channel="sms")  # Background task via Celery

    def add_wallet_address(self, wallet_address):
        """Update wallet address."""
        self.wallet_address = wallet_address
        self.save()
    
    def verify_otp(self, otp):
        if self.otp == otp and timezone.now() < self.otp_expiration:
            self.otp = None
            self.otp_expiration = None
            self.save()
            return True
        else:
            return False
        
    def modify_points(self, added_points):
        self.points += added_points
        self.save()

    def save(self, *args, **kwargs):
        if not self.id:
            self.id = self.generate_unique_id()
        super().save(*args, **kwargs)

    def generate_unique_id(self):
        return ''.join(random.choices(string.ascii_letters + string.digits, k=15))
    
    def generate_nonce():
        return "".join(random.choices(string.ascii_letters + string.digits, k=16))
    
class UserSession(BaseModelMixin):
    id = models.CharField(primary_key=True, null=False, blank=False, max_length=64)

    user = models.ForeignKey(
        User,
        related_name="user_session",
        verbose_name=_("User session"),
        on_delete=models.CASCADE,
    )
    refresh = models.CharField(max_length=255, unique=True, null=True, blank=True)
    access = models.CharField(max_length=255, unique=True, null=True, blank=True)
    ip_address = models.CharField(max_length=255, null=True, blank=True)
    device_os = models.CharField(max_length=255, null=True, blank=True)
    user_agent = models.CharField(max_length=255, null=True, blank=True)
    last_activity = models.DateTimeField(auto_now=True)
    is_active = models.BooleanField(default=True)

    def get_identifier(self):
        return secrets.token_hex(5) + str(int(timezone.now().timestamp()))

    def save(self, *args, **kwargs):
        if not self.id:
            self.id = self.get_identifier()
        super().save(*args, **kwargs)

    class Meta:
        verbose_name = "User Session"
        verbose_name_plural = "User Sessions"

    def __str__(self):
        return f"{self.user.username} - {self.date_added}"