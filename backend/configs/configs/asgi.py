import os
import django
import environ
from pathlib import Path

from django.core.asgi import get_asgi_application

django.setup()

BASE_DIR = Path(__file__).resolve(strict=True).parent.parent

# Initialize environment variables
env = environ.Env()
environ.Env.read_env(os.path.join(BASE_DIR, 'env/.env'))

os.environ.setdefault(
    "DJANGO_SETTINGS_MODULE", env.str("DJANGO_SETTINGS_MODULE", "configs.settings.local")
)

application = get_asgi_application()