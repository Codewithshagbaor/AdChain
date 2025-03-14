from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.utils.translation import gettext_lazy as _
from .models import User, UserSession

class UserAdmin(BaseUserAdmin):
    fieldsets = (
        (None, {'fields': ('email', 'phone_number', 'password')}),
        (_('Personal info'), {'fields': ('first_name', 'middle_name', 'avatar')}),
        (_('Permissions'), {'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')}),
        (_('Important dates'), {'fields': ('last_login', 'date_joined')}),
        (_('OTP'), {'fields': ('otp', 'otp_expiration')}),
        (_('Other info'), {'fields': ('role', 'wallet_balance')}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'phone_number', 'password1', 'password2'),
        }),
    )
    list_display = ('email', 'phone_number', 'first_name', 'last_name', 'is_staff', 'is_active')
    search_fields = ('email', 'phone_number', 'first_name', 'last_name')
    ordering = ('email',)
    readonly_fields = ["date_joined"]

class UserSessionAdmin(admin.ModelAdmin):
    list_display = ('user', 'ip_address', 'device_os', 'user_agent', 'last_activity', 'is_active')
    search_fields = ('user__email', 'ip_address', 'device_os', 'user_agent')
    list_filter = ('is_active', 'last_activity')
    readonly_fields = ('id', 'last_activity')

admin.site.register(User, UserAdmin)
admin.site.register(UserSession, UserSessionAdmin)