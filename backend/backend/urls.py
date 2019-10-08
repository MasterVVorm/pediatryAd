from django.contrib import admin
from django.urls import path, include
from django.http import JsonResponse
from django.conf.urls import url
from backend.settings.base import API_VERSION, DEBUG, MEDIA_ROOT, MEDIA_URL
from django.conf.urls.static import static, serve
admin.autodiscover()

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('backend.apps.user.urls')),
    path('api/', include('backend.apps.advertisements.urls')),
    path('api/version', lambda req: JsonResponse({"version": API_VERSION})),
    path(r'api/media/', serve,
        {'document_root': MEDIA_ROOT}),
]

# urlpatterns += static(MEDIA_URL, document_root=MEDIA_ROOT)
