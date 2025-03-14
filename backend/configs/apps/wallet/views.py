from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from apps.users.userViews.permissions import IsAccountOwner
from django.db.models import Q
from django.core.exceptions import ValidationError
from django.contrib.auth import get_user_model
from apps.utils.helpers.payments import *
User = get_user_model()

class GetBanksView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        per_page = int(request.query_params.get("per_page", 5))
        cursor = request.query_params.get("cursor")  # This can be None initially
        pay_with_bank = request.query_params.get("pay_with_bank", "false").lower() == "true"

        handler = Paystack()
        try:
            banks, next_cursor = handler.get_bank_page(
                per_page=per_page, cursor=cursor, pay_with_bank=pay_with_bank
            )
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        return Response(
            {
                "banks": banks,
                "next_cursor": next_cursor,
                "per_page": per_page,
            },
            status=status.HTTP_200_OK,
        )