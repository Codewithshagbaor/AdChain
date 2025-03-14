from django.db import models
import uuid, secrets
from django.utils import timezone
from apps.utils import enums
from apps.utils.helpers.model.base import BaseModelMixin
from configs.celery.queue import CeleryQueue
from django.utils.translation import gettext_lazy as _
import random
import string
from django.contrib.auth import get_user_model
User = get_user_model()

class Wallet(models.Model, BaseModelMixin):
    id = models.CharField(primary_key=True, max_length=15, editable=False, unique=True)
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="wallet")
    balance = models.DecimalField(max_digits=12, decimal_places=2, default=0.00)
    
    wallet_type = models.CharField(
        choices=enums.WalletType.choices(),
        default=enums.WalletType.NGN.value,
        null=False,
        blank=False,
        max_length=10
    )

    wallet_address = models.CharField(max_length=255, blank=True, null=True)

    created_at = models.DateTimeField(auto_now_add=True)

    def deposit(self, amount):
        """Deposit money into wallet"""
        self.balance += amount
        self.save()

    def withdraw(self, amount):
        """Withdraw money from wallet if balance is sufficient"""
        if self.balance >= amount:
            self.balance -= amount
            self.save()
            return True
        return False

    def __str__(self):
        return f"{self.user.full_name} - {self.wallet_type} {self.balance}"
    
    def generate_unique_id(self):
        return ''.join(random.choices(string.digits, k=15))
    
    def save(self, *args, **kwargs):
        if not self.id:
            self.id = self.generate_unique_id()
        super().save(*args, **kwargs)


class WalletTransaction(models.Model):
    transaction_id = models.CharField(primary_key=True, max_length=25, editable=False, unique=True)
    
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="user_transactions")

    wallet = models.ForeignKey(Wallet, on_delete=models.CASCADE, related_name="transactions")
    
    transaction_type =models.CharField(
        choices=enums.TranscationType.choices(),
        null=False,
        blank=False,
        max_length=20
    )

    transcation_status = models.CharField(
        choices=enums.TranscationStatus.choices(),
        default=enums.TranscationStatus.PENDING.value,
        null=False,
        blank=False,
        max_length=20
    )

    amount = models.DecimalField(max_digits=12, decimal_places=2)
    balance_after_transaction = models.DecimalField(max_digits=12, decimal_places=2)
    balance_before_transaction = models.DecimalField(max_digits=12, decimal_places=2)

    description = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.transaction_type.upper()} - {self.amount} ({self.wallet.user.email})"
    
    # def generate_unique_id(self):
    #     random_digits = ''.join(random.choices(string.digits, k=20))
    #     return f'TRANS{random_digits}'
    
    # def save(self, *args, **kwargs):
    #     if not self.id:
    #         self.id = self.generate_unique_id()
    #     super().save(*args, **kwargs)

    def get_balance_before_transaction(self):
        before_transaction = self.wallet.balance
        return before_transaction
