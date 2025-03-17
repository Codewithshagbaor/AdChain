from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.db.models import Q
from django.contrib.auth.hashers import make_password
from rest_framework import serializers
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from django.utils.translation import gettext_lazy as _
User = get_user_model()

class DynamicFieldsModelSerializer(serializers.ModelSerializer):
    """
    A ModelSerializer that takes an additional `fields` argument that
    controls which fields should be displayed.
    """

    def __init__(self, *args, **kwargs):
        fields = kwargs.pop('fields', None)

        # Instantiate the superclass normally
        super().__init__(*args, **kwargs)

        if fields is not None:
            # Drop any fields that are not specified in the `fields` argument.
            allowed = set(fields)
            existing = set(self.fields)
            for field_name in existing - allowed:
                self.fields.pop(field_name)

class UserSerializer(DynamicFieldsModelSerializer):
    class Meta:
        model = User
        exclude = ['otp', 'is_staff', 'is_active', 'date_joined', 'last_login', 'otp_expiration', 'groups', 'user_permissions', 'is_phone_number_verified']
        read_only_fields = ['is_email_verified', 'wallet_balance']
        write_only_fields = ['password']

    def create(self, validated_data):
        email = validated_data.get('email')
        phone_number = validated_data.get('phone_number')
        password = validated_data.pop('password', None)
        if not email and not phone_number:
            raise serializers.ValidationError("Either email or phone number must be provided.")
        user = User(**validated_data)
        if password:
            user.set_password(password)
        user.save()
        return user

    def update(self, instance, validated_data):
        password = validated_data.pop('password', None)
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        if password:
            instance.set_password(password)
        instance.save()
        return instance
    
    def get_tokens_for_user(self, user):
        refresh = RefreshToken.for_user(user)
        return {
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        }

class UserViewSerializer(DynamicFieldsModelSerializer):
    class Meta:
        model = User
        exclude = ['otp','password','is_staff', 'is_active', 'date_joined', 'last_login', 'otp_expiration', 'groups', 'user_permissions', 'is_phone_number_verified']
        read_only_fields = ['is_email_verified', 'wallet_balance']
        extra_kwargs = {
            'password': {'write_only': True},
        }

    def create(self):
        error_ = f"View not for creating"
        return error_

    def update(self, instance, validated_data):
        password = validated_data.pop('password', None)
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        if password:
            instance.set_password(password)
        instance.save()
        return instance

class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField(required=False)
    phone_number = serializers.CharField(required=False)
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        email = data.get('email')
        phone_number = data.get('phone_number')
        password = data.get('password')

        if not email and not phone_number:
            raise serializers.ValidationError(_("Either email or phone number must be provided."))

        if email:
            user = authenticate(email=email, password=password)
        else:
            user = authenticate(phone_number=phone_number, password=password)

        if user is None:
            raise serializers.ValidationError({"error":"Invalid credentials."})

        data['user'] = user
        return data

    def get_tokens_for_user(self, user):
        refresh = RefreshToken.for_user(user)
        return {
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        }

class PasswordResetRequestSerializer(serializers.Serializer):
    email = serializers.EmailField(required=False)
    phone_number = serializers.CharField(required=False)
    channel = serializers.ChoiceField(choices=["email", "sms"], required=True)

    def validate(self, data):
        email = data.get("email")
        phone_number = data.get("phone_number")

        if not email and not phone_number:
            raise serializers.ValidationError(_("Either email or phone number must be provided."))

        return data

class PasswordResetConfirmSerializer(serializers.Serializer):
    otp = serializers.CharField(required=True)
    email = serializers.EmailField(required=False)
    phone_number = serializers.CharField(required=False)
    new_password = serializers.CharField(write_only=True, min_length=8)

    def validate(self, data):
        email = data.get("email")
        phone_number = data.get("phone_number")
        otp = data.get("otp")
        new_password = data.get("new_password")

        if not email and not phone_number:
            raise serializers.ValidationError(_("Either email or phone number must be provided."))

        if not otp:
            raise serializers.ValidationError(_("OTP is required."))
        
        try:
            user = User.objects.filter(Q(email=email) | Q(phone_number=phone_number)).first()
        except User.DoesNotExist:
            raise serializers.ValidationError(_("User not found."))


        if not user.verify_otp(otp):
            raise serializers.ValidationError(_("Invalid or expired OTP."))

        if len(new_password) < 8:
            raise serializers.ValidationError(_("Password must be at least 8 characters long."))

        return data

    def save(self):
        email = self.validated_data.get("email")
        phone_number = self.validated_data.get("phone_number")
        new_password = self.validated_data.get("new_password")

        user = User.objects.filter(email=email).first() or User.objects.filter(profile__phone_number=phone_number).first()

        if user:
            user.password = make_password(new_password)
            user.save()
        return user

class ChangePasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True, min_length=8)
    confirm_new_password = serializers.CharField(required=True, min_length=8)

    def validate(self, attrs):
        if attrs['new_password'] != attrs['confirm_new_password']:
            raise serializers.ValidationError({"password": "New password fields didn't match."})

        if len(attrs['new_password']) < 8:
            raise serializers.ValidationError(_("Password must be at least 8 characters long."))
        return attrs
