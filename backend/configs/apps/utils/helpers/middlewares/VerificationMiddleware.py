from django.shortcuts import redirect
from django.http import JsonResponse
from django.utils.deprecation import MiddlewareMixin

ENDPOINT_BASE_URL = "/api"
INCLUDED_PATHS = ["/dashboard/", "/profile/", "/orders/", "/transactions/"]

class VerificationMiddleware(MiddlewareMixin):
    def process_request(self, request):
        # Apply verification check only to included paths
        if not any(request.path.startswith(path) for path in INCLUDED_PATHS):
            return None  # Skip middleware for other routes

        # Ensure user is authenticated
        if not request.user.is_authenticated:
            return JsonResponse({"error": "Authentication required"}, status=401)

        # Check user verification status
        if (
            request.user.is_bvn_verified != "VERIFIED" or
            request.user.is_user_identity_verified != "VERIFIED"
        ):
            return JsonResponse({"error": "User verification required"}, status=403)
        
         # Ensure user has at least one verification method completed
        if not (request.user.is_email_verified or request.user.is_phone_number_verified):
            return JsonResponse({"error": "Either email or phone number must be verified"}, status=403)

        return None
