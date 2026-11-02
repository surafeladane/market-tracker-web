from datetime import timedelta
from django.utils import timezone
from django.contrib.auth.models import User
from marketplace.models import Crop, Market, PriceEntry

user = User.objects.first()
crop = Crop.objects.first()
market = Market.objects.first()

if not (user and crop and market):
    print("Missing a user, crop or market. Add them in the admin first.")
else:
    prices = [4200, 4300, 4250, 4400, 4500, 4450]
    for i, p in enumerate(prices):
        entry = PriceEntry.objects.create(
            crop=crop, market=market, submitted_by=user,
            price=p, condition="Grade A"
        )
        PriceEntry.objects.filter(id=entry.id).update(
            date_submitted=timezone.now() - timedelta(days=len(prices) - i)
        )
    print("Created", len(prices), "entries. Total now:", PriceEntry.objects.count())
