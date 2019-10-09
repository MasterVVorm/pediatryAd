from django.http import JsonResponse, HttpResponse
from ..models import Advertisement, ImageMedia
from backend.utils import utils
import calendar
from datetime import datetime, timedelta
from django.utils import timezone


def get_ads(request):
    if request.method == 'GET':
        response = {
            'ads': []
        }
        try:
            currentTime = calendar.timegm(datetime.utcnow().utctimetuple())
            ads = []
            for ad in Advertisement.objects.all():
                if currentTime > calendar.timegm(ad.end_time.utctimetuple()) and ad.active:
                    ad.active = not ad.active
                    ad.save(update_fields=['active'])
                elif ad.active:
                    ads.append(ad)
                    
            ads = utils.generateArrayOfAds(ads)

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
        except Exception as e:
            return JsonResponse(status=400, data={"error": "Something went wrong", "traceback": str(e)})

    else:
        return HttpResponse(status=405)
