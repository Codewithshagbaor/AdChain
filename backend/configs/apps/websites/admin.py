from django.contrib import admin
from .models import WebsiteVerification, Webhook
# Register your models here.
admin.site.register(WebsiteVerification)
admin.site.register(Webhook)