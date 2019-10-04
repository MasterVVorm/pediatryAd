from django.urls import path
from .views.advertisement import advertisement, advertisements
from .views.image import image, update_image
from .views.public import get_ads
from .views import update_advertisement
urlpatterns = [
    path('get_ads', get_ads, name="ads"),
    path('company', advertisement, name="advertisement"),
    path('companies', advertisements, name="advertisements"),
    path('update_title', update_advertisement.update_title, name="update_title"),
    path('update_description', update_advertisement.update_description,
         name="update_decription"),
    path('update_show_image', update_advertisement.update_show_image,
         name="update_show_image"),
    path('update_times', update_advertisement.update_times, name="update_times"),
    path('update_active', update_advertisement.update_active, name="update_active"),
    path('update_video', update_advertisement.update_video_url, name="update_video"),
    path('update_product', update_advertisement.update_product_url,
         name="update_product"),
    path('update_index', update_advertisement.update_index,
         name="update_index"),

    path('image', image, name="image"),
    path('update_image', update_image, name="update_image")
]
