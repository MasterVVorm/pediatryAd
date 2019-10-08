from django.http import JsonResponse, HttpResponse
from ..models import Advertisement, ImageMedia
from backend.utils import utils


def get_ads(request):
    if request.method == 'GET':
        response = {
            'ads': []
        }
        ads = utils.generateArrayOfAds(Advertisement.objects.all())

        for ad in ads:
            images = ImageMedia.objects.filter(advertisement=ad)
            if(len(ad.video_url) == 0):
                video_url = None
            else:
                video_url = ad.video_url
            


            response['ads'].append({
                "title": ad.title,
                "description": ad.description,
                "image_url": images[0].image.url,
                "show_image": ad.show_image,
                "product_url": ad.product_url,
                "video_url": video_url,
            })

        return JsonResponse(response)
    else:
        return HttpResponse(status=405)
