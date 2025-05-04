from django.urls import path
from .views import *

urlpatterns = [
    path('', WebsiteVerificationAPIView.as_view(), name="websites"),
    path('<int:website_id>/verify/', StartWebsiteVerificationAPIView.as_view(), name='start-website-verification'),
    path('<int:website_id>/delete/', WebsiteDeleteAPIView.as_view(), name='website-delete'),
    path('hooks/', WebhookAPIView .as_view(), name="hooks"),
    path('getAdUnits/', AdUnitAPIView.as_view(), name="get-ad-units"),
    path('getAdUnit/<int:id>/', UpdateAdUnitAPIView.as_view(), name="get-ad-units"),
    path('getAdUnit/<int:id>/delete/', DeleteAdUnitAPIView.as_view(), name="delete-ad-unit"),
    path('getAdUnit/<int:id>/update/', UpdateAdUnitAPIView.as_view(), name="update-ad-unit"),
    path('createAdunit/', CreateAdUnitAPIView.as_view(), name="create-ad-unit"),
]