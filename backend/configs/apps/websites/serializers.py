from rest_framework import serializers
from .models import WebsiteVerification
# Serializers
class WebsiteVerificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = WebsiteVerification
        fields = '__all__'
        read_only = ['adchain_snippet', 'domain_age', 'content_quality_score', 'traffic_legitimacy_score', 'seo_trust_score', 'overall_score', 'status', 'verified_at', 'earnings', 'impressions', ]