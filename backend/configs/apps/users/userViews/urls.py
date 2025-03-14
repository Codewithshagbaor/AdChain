from django.urls import path
from .accountViews import *
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path("addPhone/", AddPhoneNumberView.as_view(), name="add_phone"),
    path("verifyPhone/", VerifyPhoneNumberView.as_view(), name="verify_phone"),
    path('getUser/', UserView.as_view(), name='user-view'),
    path('changePassword/', ChangePasswordView.as_view(), name='change-password'),
    path('editAvatar/', AvatarView.as_view(), name='avatar-view'),
]
