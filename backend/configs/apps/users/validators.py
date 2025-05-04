import re
from .models import User
from apps.utils import enums
from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError

class user_validate_data():
    @staticmethod
    def validate_user_data(data):
        errors = {}

        # Validate First Name, Middle Name, and Last Name
        first_name = data.get('first_name')
        middle_name = data.get('middle_name')
        last_name = data.get('last_name')

        invalid_chars = re.compile(r'[$@#%&]')

        if first_name and len(first_name) < 2:
            errors['first_name'] = "First name must be at least 2 characters long."

        if middle_name and len(middle_name) < 2:
            errors['middle_name'] = "Middle name must be at least 2 characters long."
        if last_name  and len(last_name) < 2:
            errors['last_name'] = "Last name must be at least 2 characters long."

        if invalid_chars.search(first_name):
            errors['first_name'] = "First name must not contain any of the symbols $@#%&."

        if invalid_chars.search(middle_name):
            errors['middle_name'] = "Middle name must not contain any of the symbols $@#%&."
        if invalid_chars.search(last_name):
            errors['last_name'] = "Last name must not contain any of the symbols $@#%&."
        # Validate password
        password = data.get('password')
        if password:
            if len(password) < 5:
                errors['password'] = "The password must be at least 5 characters long."
            if not re.search(r'\d', password):
                errors['password'] = "The password must contain at least one numeric value."
            if not re.search(r'[A-Z]', password):
                errors['password'] = "The password must contain at least one uppercase letter."
            if not re.search(r'[a-z]', password):
                errors['password'] = "The password must contain at least one lowercase letter."
            if not any(char in "$@#%&" for char in password):
                errors['password'] = "The password must contain at least one of the symbols $@#%&."
        if not password:
            errors['password'] = "The password is required."

        return errors
    
    @staticmethod
    def validate_user_email(data):
        errors = {}
        email = data.get('email')
        if not email:
            errors['email'] = "The email is required."
        if email and not re.match(r"[^@]+@[^@]+\.[^@]+", email):
            errors['email'] = "The email is invalid."
        return errors
    
    @staticmethod
    def validate_user_phone_number(data):
        errors = {}
        phone_number = data.get('phone_number')
        if not phone_number:
            errors['phone_number'] = "The phone number is required."
        if phone_number and not re.match(r'^\+?1?\d{9,15}$', phone_number):
            errors['phone_number'] = "The phone number is invalid."
        return errors
    
    @staticmethod
    def validate_user_role(data):
        errors = {}
        role = data.get('role')
        if not role:
            errors['role'] = "The role is required."
        if role and role not in enums.UserAccountType.values():
            errors['role'] = "The role is invalid."
        return errors
    
    @staticmethod
    def validate_user_avatar(data):
        errors = {}
        avatar = data.get('avatar')
        if avatar and not hasattr(avatar, 'name'):
            errors['avatar'] = "Invalid file."
        if avatar and hasattr(avatar, 'name') and not re.match(r'.*\.(jpg|jpeg|png|gif)$', avatar.name.lower()):
            errors['avatar'] = "The avatar must be a valid image file (jpg, jpeg, png, gif)."
        return errors

    @staticmethod
    def validate_user_nin(data):
        errors = {}
        nin = data.get('nin')
        if nin and not re.match(r'^\d{11}$', nin):
            errors['nin'] = "The NIN is invalid."
        return errors

    @staticmethod
    def validate_user_bvn(data):
        errors = {}
        bvn = data.get('bvn')
        if bvn and not re.match(r'^\d{11}$', bvn):
            errors['bvn'] = "The BVN is invalid."
        return errors

    @staticmethod
    def validate_user_wallet_balance(data):
        errors = {}
        wallet_balance = data.get('wallet_balance')
        if wallet_balance and not re.match(r'^\d{1,15}(\.\d{1,2})?$', wallet_balance):
            errors['wallet_balance'] = "The wallet balance is invalid."
        return errors
    
    @staticmethod
    def validate_user_otp(data):
        errors = {}
        otp = data.get('otp')
        if otp and not re.match(r'^\d{6}$', otp):
            errors['otp'] = "The OTP is invalid."
        return errors
        
    @staticmethod
    def validate_user_otp_expiration(data):
        errors = {}
        otp_expiration = data.get('otp_expiration')
        if otp_expiration and not re.match(r'^\d{6}$', otp_expiration):
            errors['otp_expiration'] = "The OTP expiration is invalid."
        return errors

    @staticmethod
    def validate_user_restaurant(data):
        errors = {}
        restaurant = data.get('restaurant')
        if restaurant and not re.match(r'^\d{1,15}$', restaurant):
            errors['restaurant'] = "The restaurant is invalid."
        return errors
    
    def validate_user_wallet_address(data):
        errors = {}
        wallet_address = data.get('wallet_address')
        if wallet_address and not re.match(r'^[a-zA-Z0-9]{42}$', wallet_address):
            errors['wallet_address'] = "The wallet address is invalid."
        return errors