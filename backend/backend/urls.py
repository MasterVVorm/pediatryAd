from django.contrib import admin
from django.urls import path, include
from django.http import JsonResponse
from django.conf.urls import url
from django.conf import settings
from django.conf.urls.static import static, serve
admin.autodiscover()

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('backend.apps.user.urls')),
    path('api/', include('backend.apps.advertisements.urls')),
    path('api/version', lambda req: JsonResponse({"version": settings.API_VERSION})),
    url(r'^api/media/(?P<path>.*)$', serve,
        {'document_root': settings.MEDIA_ROOT}),
]

# urlpatterns += static(MEDIA_URL, document_root=MEDIA_ROOT)
