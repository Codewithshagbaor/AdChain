import pyotp
from django.utils import timezone
from django.conf import settings
from datetime import timedelta
from .termii import TermiiService
from .mailgun import MailgunService

class OTPVerifyHandler:
    __slots__ = ["_contact", "_channel", "_user"]

    @staticmethod
    def format_phone_number(phone_no: str):
        phone_no = phone_no.strip()
        return phone_no if phone_no.startswith("+") else ("+" + phone_no)

    def __init__(self, user, contact, channel):
        self._user = user
        if channel == "email":
            self._contact = contact
        else:
            self._contact = self.format_phone_number(contact)
        self._channel = channel

    def generate_otp(self):
        otp = pyotp.random_base32()[:6]  # Generate a 6-digit OTP
        self._user.otp = otp
        self._user.otp_expiration = timezone.now() + timedelta(minutes=10)
        self._user.save()
        return otp

    def send_otp_via_email(self):
        otp = self.generate_otp()
        subject = "Your OTP Code"
        message = f"Your OTP code is {otp}"
        # from_email = settings.DEFAULT_FROM_EMAIL
        # recipient_list = [self._contact]
        handler= MailgunService(self._contact)

        try:
            handler.send_mail(subject, message)
            return {"status": "success", "message": "OTP sent via email"}
        except Exception as e:
            raise Exception(f"Failed to send OTP via email: {e}")

    def send_otp_via_sms(self):
        otp = self.generate_otp()
        handler = TermiiService(self._contact)
        message = f"Your OTP code is {otp}"
        response = handler.send_sms(self._contact, message)
        if response.get("status") == "success":
            return response
        else:
            error_message = response.get("message", "Failed to send OTP via SMS")
            return error_message

    def verify_send_otp(self):
        if self._channel == "email":
            return self.send_otp_via_email()
        else:
            return self.send_otp_via_sms()
