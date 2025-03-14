import os
from pathlib import Path
import environ
from django.core.wsgi import get_wsgi_application

# Define BASE_DIR
BASE_DIR = Path(__file__).resolve(strict=True).parent.parent

# Initialize environment variables
env = environ.Env()
environ.Env.read_env(os.path.join(BASE_DIR, 'env/.env'))

os.environ.setdefault(
    "DJANGO_SETTINGS_MODULE", env.str("DJANGO_SETTINGS_MODULE", "configs.settings.local")
)

application = get_wsgi_application()