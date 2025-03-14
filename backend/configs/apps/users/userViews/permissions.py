from rest_framework.permissions import BasePermission

class IsAccountOwner(BasePermission):

    def has_object_permission(self, request, view, obj):
        # Check if the user is trying to access their own account
        return obj == request.user