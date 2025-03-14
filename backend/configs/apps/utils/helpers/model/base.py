import secrets

from django.db import models
from django.utils import timezone



class BaseModelBaseMixin:
    def is_instance_exist(self):
        return self.__class__.objects.filter(id=self.id).exists()

    @property
    def current_instance(self):
        return self.__class__.objects.get(id=self.id)

class BaseModelMixin(BaseModelBaseMixin, models.Model):
    date_added = models.DateTimeField(auto_now_add=True)
    date_last_modified = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True

    def __str__(self):
        return f"< {type(self).__name__}({self.id}) >"