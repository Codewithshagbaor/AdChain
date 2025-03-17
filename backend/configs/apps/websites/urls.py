from django.urls import path
from .views import *

urlpatterns = [
    path('', WebsiteVerificationAPIView.as_view(), name="websites"),
    path('<int:website_id>/verify/', StartWebsiteVerificationAPIView.as_view(), name='start-website-verification'),
    path('<int:website_id>/delete/', WebsiteDeleteAPIView.as_view(), name='website-delete'),
    path('hooks/', WebhookAPIView .as_view(), name="hooks")
]