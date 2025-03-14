from django.urls import path
from .views import UserRegistrationView, OTPVerificationView, RequestOTPView, EmailLoginView, PhoneNumberLoginView, PasswordResetRequestView, PasswordResetConfirmView

urlpatterns = [
    path('register/', UserRegistrationView.as_view(), name='user-registration'),
    path('verify-otp/', OTPVerificationView.as_view(), name='otp-verification'),
    path('request-otp/', RequestOTPView.as_view(), name='request-otp'),
    path('email/', EmailLoginView.as_view(), name='email-login'),
    path('phone/', PhoneNumberLoginView.as_view(), name='phone-login'),
    path('passwordReset/', PasswordResetRequestView.as_view(), name='phone-email-reset'),
    path('comfirmReset/', PasswordResetConfirmView.as_view(), name='comfirm-password-reset')

]