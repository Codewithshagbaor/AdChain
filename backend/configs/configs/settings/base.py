import os

from pathlib import Path
from celery.schedules import crontab
from corsheaders.defaults import default_headers as cors_default_headers
from django.utils.timezone import timedelta
import environ


from ..celery.queue import CeleryQueue

BASE_DIR = Path(__file__).resolve(strict=True).parent.parent.parent
env = environ.Env()
environ.Env.read_env(os.path.join(BASE_DIR, 'env/.env'))

APPS_DIR = BASE_DIR / "apps"

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = env.str(
    "DJANGO_SECRET_KEY", "oz_a&u-+h+j$9g-@w&-7mqgns@&$9h&-4he7y3h4+_v7^zwi)n"
)

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = env.bool("DJANGO_DEBUG", False)
PRODUCTION = env.bool("DJANGO_PRODUCTION", False)

ALLOWED_HOSTS = env.list(
    "DJANGO_ALLOWED_HOSTS",
    default=[
        "*",
    ],
)
CSRF_TRUSTED_ORIGINS = env.list(
    "DJANGO_CSRF_TRUSTED_ORIGINS",
    default=[],
)

# Application definition
INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "rest_framework",
    "rest_framework_simplejwt",
    "rest_framework_simplejwt.token_blacklist",
    "corsheaders",
    "django_celery_beat",
]


MY_APPS = [
    "apps.users.apps.UsersConfig",
    "apps.utils.apps.UtilsConfig",
    "apps.websites.apps.WebsitesConfig",
]

INSTALLED_APPS += MY_APPS
MIDDLEWARE = [
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]


ROOT_URLCONF = "configs.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [os.path.join(BASE_DIR, "templates")],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
                "django.template.context_processors.static", 
            ],
        },
    },
]

ASGI_APPLICATION = "configs.asgi.application"
WSGI_APPLICATION = "configs.wsgi.application"

# Password validation
# https://docs.djangoproject.com/en/3.1/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",
    },
]

# Internationalization
# https://docs.djangoproject.com/en/3.1/topics/i18n/

LANGUAGE_CODE = "en-us"

TIME_ZONE = "Africa/Lagos"

USE_I18N = True

USE_L10N = True

USE_TZ = True

# Celery
CELERY_BROKER = env.str("DJANGO_CELERY_BROKER", default="redis://localhost:6379/1")
CELERY_BROKER_URL = env.str("DJANGO_CELERY_BROKER", default="redis://localhost:6379/1")
CELERY_RESULT_BACKEND = env.str(
    "DJANGO_CELERY_BACKEND", default="redis://localhost:6379/1"
)
CELERY_TIMEZONE = env.str("DJANGO_CELERY_TIMEZONE", default="UTC")
CELERY_ACKS_LATE = True
CELERY_TASK_REJECT_ON_WORKER_LOST = True
CELERYD_PREFETCH_MULTIPLIER = 1
CELERY_PREFETCH_MULTIPLIER = 1
CELERY_QUEUES = CeleryQueue.queues()

# Rest Framework
REST_FRAMEWORK = {
    "DEFAULT_AUTHENTICATION_CLASSES": (
        "rest_framework_simplejwt.authentication.JWTAuthentication",
    ),
    "DEFAULT_PERMISSION_CLASSES": (
        "rest_framework.permissions.IsAuthenticated",
        # "apps.utils.permissions.CheckBlacklistedAccessToken",
    ),
    "DEFAULT_FILTER_BACKENDS": [
        "django_filters.rest_framework.DjangoFilterBackend",
        "rest_framework.filters.OrderingFilter",
        "rest_framework.filters.SearchFilter",
    ],
    "DEFAULT_PAGINATION_CLASS": "rest_framework.pagination.LimitOffsetPagination",
    "PAGE_SIZE": 10,
}

SIMPLE_JWT = {
    "ACCESS_TOKEN_LIFETIME": timedelta(minutes=30),
    "REFRESH_TOKEN_LIFETIME": timedelta(days=7),
    "ROTATE_REFRESH_TOKENS": True,
    "BLACKLIST_AFTER_ROTATION": True,
    "UPDATE_LAST_LOGIN": True,
    "ALGORITHM": "HS256",
    "SIGNING_KEY": SECRET_KEY,
    "VERIFYING_KEY": None,
    "AUDIENCE": None,
    "ISSUER": None,
    "JWK_URL": None,
    "LEEWAY": 0,
    "AUTH_HEADER_TYPES": ("Bearer",),
    "AUTH_HEADER_NAME": "HTTP_AUTHORIZATION",
    "USER_ID_FIELD": "id",
    "USER_ID_CLAIM": "user_id",
    "USER_AUTHENTICATION_RULE": "rest_framework_simplejwt.authentication.default_user_authentication_rule",
    "AUTH_TOKEN_CLASSES": ("rest_framework_simplejwt.tokens.AccessToken",),
    "TOKEN_TYPE_CLAIM": "token_type",
    "JTI_CLAIM": "jti",
    "SLIDING_TOKEN_REFRESH_EXP_CLAIM": "refresh_exp",
    "SLIDING_TOKEN_LIFETIME": timedelta(minutes=5),
    "SLIDING_TOKEN_REFRESH_LIFETIME": timedelta(days=1),
}

AUTH_USER_MODEL = "users.User"
AUTHENTICATION_BACKENDS = [
    "django.contrib.auth.backends.ModelBackend",
    "apps.users.backends.PhoneNumberAuthenticationBackend",
    "apps.users.backends.EmailAuthenticationBackend",
]

# ____________CORS_____________________
if not env.bool("DJANGO_CORS_ALLOW_ALL_ORIGINS", default=False):
    CORS_ALLOW_ALL_ORIGINS = False
    CORS_ALLOWED_ORIGINS = env.list(
        "DJANGO_CORS_ALLOWED_ORIGINS",
        default=[],
    )
    CORS_ALLOWED_ORIGIN_REGEXES = env.list(
        "DJANGO_CORS_ALLOWED_ORIGIN_REGEXES",
        default=[],
    )
else:
    CORS_ALLOW_ALL_ORIGINS = True


# ___________________GLOBAL_________________________
ENVIRONMENT_NAME = env.str("DJANGO_ENVIRONMENT_NAME", default="")
API_VERSION = env.int("DJANGO_API_VERSION", default=1)

BACKEND_API_BASE_URL = env.str(
    "DJANGO_BACKEND_API_BASE_URL", "https://dev.usezpilit.com"
)

FRONTEND_BASE_URL = env.str("FRONTEND_BASE_URL", "https://dev.usezpilit.com")

ADMIN_CREATION_TOKEN_EXPIRATION_SECS = env.int(
    "DJANGO_ADMIN_CREATION_TOKEN_EXPIRATION_SECS", default=(3600 * 6)
)

# Cached Global Variable expires in 24 hours
GLOBAL_VARIABLE_EXPIRATION_SECS = env.int(
    "GLOBAL_VARIABLE_EXPIRATION_SECS", default=(3600 * 24)
)

PASSWORD_RESET_TOKEN_EXPIRATION_SECS = env.int(
    "DJANGO_PASSWORD_RESET_TOKEN_EXPIRATION_SECS", default=(3600 * 6)
)
EMAIL_VERIFICATION_TOKEN_EXPIRATION_SECS = env.int(
    "DJANGO_EMAIL_VERIFICATION_TOKEN_EXPIRATION_SECS", default=(3600 * 6)
)
EMAIL_LOGIN_TOKEN_EXPIRATION_SECS = env.int(
    "DJANGO_EMAIL_LOGIN_TOKEN_EXPIRATION_SECS", default=(3600 * 6)
)

SITE_NAME = env.str("DJANGO_SITE_NAME", "Zpilit")
PASSWORD_RESET_PAGE = env.str("DJANGO_PASSWORD_RESET_PAGE", "**************")
ADMIN_EMAIL = env.str("DJANGO_ADMIN_EMAIL", "*************")
ADMIN_PASSWORD = env.str("DJANGO_ADMIN_PASSWORD", "***************")

# WATERMARK_FILE_URL = env.str(
#     "DJANGO_WATERMARK_FILE_URL",
#     default="https://i.ibb.co/1bKyNwS/watermark.png",
#     # default="https://vibesdomain-dev-storage.s3.us-east-2.amazonaws.com/static/misc/watermarking/watermark.png",
# )
# APPLY_WATERMARK_ON_FILE_UPLOAD = env.bool(
#     "DJANGO_APPLY_WATERMARK_ON_FILE_UPLOAD", default=False
# )

# APPLY_COMPRESSION_ON_FILE_UPLOAD = env.bool(
#     "DJANGO_APPLY_COMPRESSION_ON_FILE_UPLOAD", default=True
# )


# _______________ PUSH NOTIFICATION __________________________
PUSH_NOTIFICATIONS_SETTINGS = {
    "FCM_API_KEY": "YOUR_FCM_SERVER_KEY",
}


# _______________ FIREBASE __________________________
FIREBASE_CONFIG_PATH = os.path.join(
    BASE_DIR,
    "envs",
    env.str("DJANGO_FIREBASE_CONFIG_URL", default="******************"),
)



# ____________________________TERMII _______________________________
TERMII_API_KEY = env.str(
    "TERMII_API_KEY",
    default="TLQCTmvmwf5d1MSv3Qxf96e78vrpjVSTmcfA5NvFVulVY8I023Eqvop2OkW8r3",
)
TERMII_BASE_URL = env.str(
    "TERMII_BASE_URL",
    default="api.ng.termii.com")
# ___________EMAIL______________________
DEFAULT_FROM_EMAIL = env.str("DJANGO_DEFAULT_FROM_EMAIL", default="**************")
MAILGUN_API_KEY = env.str("MAILGUN_API_KEY", default="***************")
MAILGUN_DOMAIN = env.str("MAILGUN_DOMAIN", default="***************")


# ____________OTP_____________________________________
OTP_EXPIRATION_MINS = env.int("DJANGO_OTP_EXPIRATION_MINS", default=10)

REDIS_HOST_USE_CONNECTION_STRING = env.bool(
    "DJANGO_REDIS_HOST_USE_CONNECTION_STRING", default=False
)

REDIS_HOST = env.str("DJANGO_REDIS_HOST", default="localhost")
REDIS_PORT = env.int("DJANGO_REDIS_PORT", default=6379)


if REDIS_HOST_USE_CONNECTION_STRING:
    REDIS_HOSTS = [
        (env.str("DJANGO_REDIS_HOST_CONNECTION_STRING", default="**************"))
    ]
else:
    REDIS_HOSTS = [
        (
            REDIS_HOST,
            REDIS_PORT,
        )
    ]


# ______________PAYMENTS__________________
PAYSTACK_SECRET_KEY = env.str("DJANGO_PAYSTACK_SECRET_KEY", "*************")
PAYSTACK_PUBLIC_KEY = env.str("DJANGO_PAYSTACK_PUBLIC_KEY", "*************")

PAYMENT_SUCCESS_URL = env.str(
    "DJANGO_PAYMENT_SUCCESS_URL", "https://dev.usezpilit.com/success"
)

PAYMENT_FAILURE_URL = env.str(
    "DJANGO_PAYMENT_FAILURE_URL", "https://dev.usezpilit.com/failure"
)
# ______________________ Cache _______________________________-


CACHES = {
    "default": {
        "BACKEND": "django_redis.cache.RedisCache",
        "LOCATION": (
            f"redis://{REDIS_HOST}:{REDIS_PORT}"
            if not REDIS_HOST_USE_CONNECTION_STRING
            else REDIS_HOSTS[0]
        ),
    }
}


CACHE_TTL = env.int("DJANGO_VIEW_CACHE_TTL_SECS", 60 * 15)


SESSION_ENGINE = "django.contrib.sessions.backends.cached_db"

WHOISXML_API_KEY = os.environ.get('WHOISXML_API_KEY', '')
OPENAI_API_KEY = os.environ.get('OPENAI_API_KEY', '')
CLOUDFLARE_API_KEY = os.environ.get('CLOUDFLARE_API_KEY', '')
CLOUDFLARE_EMAIL = os.environ.get('CLOUDFLARE_EMAIL', '')
MOZ_API_KEY = os.environ.get('MOZ_API_KEY', '')
# ________________________ HSTS
SECURE_HSTS_SECONDS = 31536000  # Enforce HTTPS for one year
SECURE_HSTS_INCLUDE_SUBDOMAINS = True
SECURE_HSTS_PRELOAD = True

SECURE_REFERRER_POLICY = "no-referrer-when-downgrade"

LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,

    'formatters': {
        'verbose': {
            'format': '[{levelname}] {asctime} {name} | {message}',
            'style': '{',
        },
        'simple': {
            'format': '[{levelname}] {message}',
            'style': '{',
        },
    },

    'handlers': {
        'console': {
            'class': 'logging.StreamHandler',
            'formatter': 'verbose',
        },
        'file': {
            'class': 'logging.FileHandler',
            'filename': os.path.join(BASE_DIR, 'logs', 'django.log'),
            'formatter': 'verbose',
            'level': 'INFO',
        },
    },

    'root': {
        'handlers': ['console', 'file'],
        'level': 'DEBUG',
    },

    'loggers': {
        'django': {
            'handlers': ['console', 'file'],
            'level': 'INFO',
            'propagate': False,
        },
        'django.server': {
            'handlers': ['console', 'file'],
            'level': 'DEBUG',
            'propagate': False,
        },
    },
}