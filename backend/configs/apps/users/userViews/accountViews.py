from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from apps.users.serializers import UserViewSerializer, ChangePasswordSerializer
from .permissions import IsAccountOwner
from apps.users.validators import user_validate_data
from apps.users.models import User
from apps.users.tasks import send_email_verification, send_otp_to_user
from django.db.models import Q
from django.core.exceptions import ValidationError
from django.contrib.auth.password_validation import validate_password

class AddPhoneNumberView(APIView):
    permission_classes = [IsAuthenticated, IsAccountOwner]

    def post(self, request):
        user = request.user
        phone_number = request.data.get("phone_number")

        # Validate phone number
        errors = user_validate_data.validate_user_phone_number(request.data)
        if errors:
            return Response(errors, status=status.HTTP_400_BAD_REQUEST)

        # Check for uniqueness
        if User.objects.filter(phone_number=phone_number).exists():
            return Response({"error": "Phone number already exists."}, status=status.HTTP_400_BAD_REQUEST)

        user.add_phone_number(phone_number)  # This triggers OTP in the background
        return Response({"message": "Phone number added. OTP sent."}, status=status.HTTP_200_OK)

class AddWalletAddressView(APIView):
    permission_classes = [IsAuthenticated, IsAccountOwner]

    def post(self, request):
        user = request.user
        wallet_address = request.data.get("wallet_address")

        # Validate wallet address
        errors = user_validate_data.validate_user_wallet_address(request.data)
        if errors:
            return Response(errors, status=status.HTTP_400_BAD_REQUEST)

        user.add_wallet_address(wallet_address)
        return Response({"message": "Wallet address added successfully."}, status=status.HTTP_200_OK)


class VerifyPhoneNumberView(APIView):
    permission_classes = [IsAuthenticated, IsAccountOwner]

    def post(self, request):
        user = request.user
        otp = request.data.get("otp")

        if user.verify_otp(otp):
            user.verify_phone_number()
            return Response({"message": "Phone number verified successfully."}, status=status.HTTP_200_OK)

        return Response({"error": "Invalid OTP or OTP expired."}, status=status.HTTP_400_BAD_REQUEST)


class UserView(APIView):
    permission_classes = [IsAuthenticated, IsAccountOwner]

    def get(self, request):
        user = request.user
        serializer = UserViewSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)

class AvatarView(APIView):
    permission_classes = [IsAuthenticated, IsAccountOwner]

    def post(self, request):
        user = request.user
        avatar = request.FILES.get("avatar")

        # Validate avatar
        errors = user_validate_data.validate_user_avatar(request.FILES)
        if errors:
            return Response(errors, status=status.HTTP_400_BAD_REQUEST)

        user.avatar = avatar
        user.save()
        return Response({"message": "Avatar updated successfully."}, status=status.HTTP_200_OK)

# class UpdateUserView(APIView):
#     permission_classes = [IsAuthenticated, IsAccountOwner]

#     def get(self, request):
#         return Response({"error": "GET not Allowed"}, status=status.HTTP_405_METHOD_NOT_ALLOWED)

#     def put(self, request):
#         user = request.user
#         data = request.data

#         # Validate user data
#         errors = user_validate_data.validate_user_data(data)
#         errors.update(user_validate_data.validate_user_email(data))
#         errors.update(user_validate_data.validate_user_phone_number(data))
#         errors.update(user_validate_data.validate_user_role(data))
#         errors.update(user_validate_data.validate_user_avatar(data))
#         errors.update(user_validate_data.validate_user_nin(data))
#         errors.update(user_validate_data.validate_user_bvn(data))
#         errors.update(user_validate_data.validate_user_wallet_balance(data))

#         if errors:
#             return Response(errors, status=status.HTTP_400_BAD_REQUEST)

#         serializer = UserViewSerializer(user, data=data, partial=True)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_200_OK)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ChangePasswordView(APIView):
    permission_classes = [IsAuthenticated, IsAccountOwner]

    def post(self, request):
        serializer = ChangePasswordSerializer(data=request.data)
        if serializer.is_valid():
            user = request.user
            if not user.check_password(serializer.validated_data['old_password']):
                return Response({"old_password": ["Wrong password."]}, status=status.HTTP_400_BAD_REQUEST)
            
            new_password = serializer.validated_data['new_password']
            
            try:
                validate_password(new_password, user)
            except ValidationError as e:
                return Response({'error': e.messages}, status=status.HTTP_400_BAD_REQUEST)
            
            user.set_password(new_password)
            user.save()
            return Response({"message": "Password updated successfully"}, status=status.HTTP_200_OK)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)