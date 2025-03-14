from django.contrib import admin
from django.urls import path, include
from django.conf import settings

urlpatterns = [
    path(f"api/v{settings.API_VERSION}/auth/", include("apps.users.urls")),
    path(f"api/v{settings.API_VERSION}/user/", include("apps.users.userViews.urls")),
    path(f"api/v{settings.API_VERSION}/wallet/", include("apps.wallet.urls")),
    path('admin/', admin.site.urls),
]
