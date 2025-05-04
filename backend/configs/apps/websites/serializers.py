from rest_framework import serializers
from .models import WebsiteVerification, AdUnit
# Serializers
class WebsiteVerificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = WebsiteVerification
        fields = '__all__'
        read_only = ['adchain_snippet', 'domain_age', 'content_quality_score', 'traffic_legitimacy_score', 'seo_trust_score', 'overall_score', 'status', 'verified_at', 'earnings', 'impressions', ]

class AdUnitSerializer(serializers.ModelSerializer):
    class Meta:
        model = AdUnit
        fields = '__all__'
        read_only = ['ad_unit_code', 'ad_unit_id', 'status', 'created_at', 'updated_at', 'ad_unit_clicks', 'ad_unit_impressions', 'ad_unit_revenue', 'ad_unit_ctr',  ]