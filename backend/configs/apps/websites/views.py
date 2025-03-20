from rest_framework import serializers, status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404
from .serializers import WebsiteVerificationSerializer
from .models import WebsiteVerification, Webhook
from django.db.models import Q
import requests
class WebsiteVerificationAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        domain_filter = request.query_params.get('url', None)
        
        queryset = WebsiteVerification.objects.filter(user=request.user)
        
        # Apply domain filter if provided
        if domain_filter:
            normalized_domain = domain_filter.replace('http://', '').replace('https://', '').replace('www.', '').rstrip('/')
            
            # Filter by normalized domain
            queryset = queryset.filter(
                Q(domain__iexact=normalized_domain) |
                Q(domain__iexact=f"http://{normalized_domain}") |
                Q(domain__iexact=f"https://{normalized_domain}") |
                Q(domain__iexact=f"http://www.{normalized_domain}") |
                Q(domain__iexact=f"https://www.{normalized_domain}")
            )
        
        # Serialize the queryset
        serializer = WebsiteVerificationSerializer(queryset, many=True)
        
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        data = request.data.copy()
        data['user'] = request.user.id
        serializer = WebsiteVerificationSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
class WebsiteDeleteAPIView(APIView):
    def delete(self, request, *args, **kwargs):
        website_id = self.kwargs.get('website_id')
        website = get_object_or_404(WebsiteVerification, id=website_id)
        
        # Check if user has permission to verify this website
        if website.user != request.user:
            return Response(
                {"error": "You don't have permission to verify this website"},
                status=status.HTTP_403_FORBIDDEN
            )
        
        website.delete()
        return Response(
                {
                    "message": "Website deleted",
                },
                status=status.HTTP_200_OK
            )

class StartWebsiteVerificationAPIView(APIView):
    permission_classes = [IsAuthenticated]
    
    def post(self, request, *args, **kwargs):
        website_id = self.kwargs.get('website_id')  
        website = get_object_or_404(WebsiteVerification, id=website_id)
        
        # Check if user has permission to verify this website
        if website.user != request.user:
            return Response(
                {"error": "You don't have permission to verify this website"},
                status=status.HTTP_403_FORBIDDEN
            )
        
        # Check if website is already verified
        if website.code_verified:
            return Response(
                {"message": "Website is already verified"},
                status=status.HTTP_200_OK
            )
        
        try:
            url = website.url
            # Ensure URL has proper scheme
            if not url.startswith(('http://', 'https://')):
                url = f"https://{url}"
            
            # Make request with proper headers and timeout
            headers = {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
                'Accept-Language': 'en-US,en;q=0.5',
            }
            
            response = requests.get(url, headers=headers, timeout=15, allow_redirects=True)
            
            # Check if request was successful
            if response.status_code != 200:
                return Response(
                    {
                        "error": f"Failed to access website: HTTP {response.status_code}",
                        "details": "Please make sure the website is accessible"
                    },
                    status=status.HTTP_400_BAD_REQUEST
                )
            
            # Check for verification code
            adchain_snippet = f"<script src='https://cdn.adchain.com/ad.js' data-key='{website.adchain_snippet}'></script>"
            
            if adchain_snippet not in response.text:
                # Code was found, mark as verified
                website.code_verified = True
                website.verify_website()
                website.save()
                
                return Response(
                    {
                        "message": "Website verification completed successfully",
                        "status": f"{website.status}"
                    },
                    status=status.HTTP_200_OK
                )
            else:
                # Code was not found
                return Response(
                    {
                        "error": "Verification code not found on website",
                        "details": "Please make sure you've added the correct verification snippet to your website's homepage",
                        "expected_snippet": adchain_snippet,
                        "status": "missing_verification"
                    },
                    status=status.HTTP_400_BAD_REQUEST
                )
            
        except requests.Timeout:
            return Response(
                {
                    "error": "Website verification timed out",
                    "details": "The website took too long to respond. Please check your website's performance.",
                    "status": "timed_out"
                },
                status=status.HTTP_504_GATEWAY_TIMEOUT
            )
        except requests.ConnectionError:
            return Response(
                {
                    "error": "Could not connect to website",
                    "details": "Please check that your website is accessible and the URL is correct."
                },
                status=status.HTTP_502_BAD_GATEWAY
            )
        except Exception as e:
            return Response(
                {
                    "error": "Failed to verify website",
                    "details": f"An unexpected error occurred. Please try again later: {str(e)}"
                },
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
# Webhook Endpoints
class WebhookAPIView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request):
        Webhook.objects.all().delete()
        Webhook.objects.create(url=request.data.get("url"))
        return Response({"message": "Webhook set successfully"}, status=status.HTTP_200_OK)

    def get(self, request):
        webhook = Webhook.objects.first()
        if webhook:
            return Response({"webhook_url": webhook.url}, status=status.HTTP_200_OK)
        return Response({"message": "No webhook set"}, status=status.HTTP_404_NOT_FOUND)

