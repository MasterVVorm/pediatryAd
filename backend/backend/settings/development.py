from .base import *

# Database
# https://docs.djangoproject.com/en/2.1/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': 'pediatryad',
        'USER': 'pediatryadmin',
        'PASSWORD': 'markmark1',
        'HOST': 'localhost',
        'PORT': ''
    }
}

MEDIA_ROOT = os.path.join(BASE_DIR, 'media')