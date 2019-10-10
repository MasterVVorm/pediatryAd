from .base import *

# Database
# https://docs.djangoproject.com/en/2.1/ref/settings/#databases
DEBUG = False

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': 'postgres',
        'USER': 'postgres',
        'HOST': 'db',
        'PORT': '5432'
    }
}

MEDIA_ROOT = os.path.join(BASE_DIR+"/../../../", 'media')
