from django.db import models
import os
from django.dispatch import receiver
from django.utils.translation import ugettext_lazy as _


class AdvertisementManager(models.Manager):
    def createAdvertisement(self, title, description, video_url, product_url, start_time, end_time, show_image, active, index):
        ads = self.create(title=title, description=description, video_url=video_url, product_url=product_url,
                          start_time=start_time, end_time=end_time, show_image=show_image, active=active, index=index)
        return ads


class Advertisement(models.Model):
    title = models.CharField(max_length=300)
    description = models.CharField(max_length=1000)
    video_url = models.CharField(max_length=254, null=True, blank=True)
    product_url = models.CharField(max_length=254)
    start_time = models.DateTimeField(auto_now=False, auto_now_add=False)
    end_time = models.DateTimeField(auto_now=False, auto_now_add=False)
    show_image = models.BooleanField(default=True)
    active = models.BooleanField(default=True)
    index = models.IntegerField(default=1)

    objects = AdvertisementManager()


class ImageMediaManager(models.Manager):
    def create_image_media(self, image, advertisement):
        imageMedia = self.create(image=image, advertisement=advertisement)
        return imageMedia


class ImageMedia(models.Model):
    advertisement = models.ForeignKey(Advertisement, on_delete=models.CASCADE)
    image = models.ImageField()

    objects = ImageMediaManager()


@receiver(models.signals.post_delete, sender=ImageMedia)
def _post_delete_receiver(sender, instance, **kwargs):
    try:
        if instance.image and os.path.isfile(instance.image.path):
            os.remove(instance.image.path)
    except:
        pass
