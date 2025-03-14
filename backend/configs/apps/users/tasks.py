from celery import shared_task
from django.utils import timezone
from .models import User
from apps.utils.helpers.verifications import OTPVerifyHandler

@shared_task
def send_otp_to_user(user_id, channel="sms"):
    try:
        user = User.objects.get(id=user_id)
        contact = user.phone_number if channel == "sms" else user.email
        OTPVerifyHandler(user, contact, channel).verify_send_otp()
    except User.DoesNotExist:
        pass

@shared_task
def send_email_verification(user_id):
    try:
        user = User.objects.get(id=user_id)
        OTPVerifyHandler(user, user.email, "email").verify_send_otp()
    except User.DoesNotExist:
        pass