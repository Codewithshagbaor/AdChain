from django.db import models
from django.utils.crypto import get_random_string
import requests
from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver
from apps.utils import enums
import logging
from django.conf import settings

logger = logging.getLogger(__name__)
# Model for Website Verification
class WebsiteVerification(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    
    url = models.URLField(unique=True)
    
    category = models.CharField(
        choices=enums.WebsiteCategory.choices(),
        null=False,
        blank=False,
        max_length=20
    )

    earnings = models.PositiveBigIntegerField(default=0.00)
    impressions = models.PositiveBigIntegerField(default=0.00)
    description = models.TextField(blank=True, null=True)
    
    adchain_snippet = models.CharField(max_length=32, unique=True, default=get_random_string(32))
    domain_age = models.IntegerField(null=True, blank=True)
    code_verified = models.BooleanField(default=False)
    content_quality_score = models.FloatField(null=True, blank=True)
    traffic_legitimacy_score = models.FloatField(null=True, blank=True)
    seo_trust_score = models.FloatField(null=True, blank=True)
    overall_score = models.FloatField(null=True, blank=True)
    
    status = models.CharField(
        choices=enums.WebsiteStatus.choices(),
        default=enums.WebsiteStatus.PENDING.value,
        null=False,
        blank=False,
        max_length=20
    )

    verified_at = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def fetch_domain_age(self):
        response = requests.get(f"https://www.whoisxmlapi.com/whoisserver/WhoisService?apiKey={settings.WHOISXML_API_KEY}&domainName={self.url}&outputFormat=JSON")
        if response.status_code == 200:
            data = response.json()
            self.domain_age = data.get('estimatedDomainAge', 0)
        else:
            self.domain_age = 0
        return self.domain_age
    
    def fetch_content_quality_score(self):
        response = requests.post(
            "https://api.openai.com/v1/chat/completions", 
            json={
                "prompt": f"Analyze if this website contains spam or AI-generated content: {self.url}",
                "max_tokens": 50
            }, 
            headers={"Authorization": f"Bearer {settings.OPENAI_API_KEY}"},
            timeout=30
        )
        if response.status_code == 200:
            self.content_quality_score = response.json().get('score', 0) * 100
        else:
            self.content_quality_score = 0
        return self.content_quality_score
    
    def fetch_traffic_legitimacy_score(self):
        try:
            # Get the domain from the URL
            domain = self.url
            
            # Use a combination of free methods to determine legitimacy
            score = 0
            total_checks = 0
            
            # Check domain age using WHOIS
            try:
                import whois
                domain_info = whois.whois(domain)
                if domain_info.creation_date:
                    # Convert to single date if it's a list
                    creation_date = domain_info.creation_date[0] if isinstance(domain_info.creation_date, list) else domain_info.creation_date
                    
                    # Calculate domain age in years
                    import datetime
                    domain_age_years = (datetime.datetime.now() - creation_date).days / 365
                    
                    # Older domains are typically more legitimate
                    if domain_age_years > 5:
                        score += 30
                    elif domain_age_years > 2:
                        score += 20
                    elif domain_age_years > 1:
                        score += 10
                    total_checks += 30
                
            except Exception as e:
                logger.warning(f"Error checking domain age: {str(e)}")
            
            # Check SSL certificate validity and details
            try:
                import ssl
                import socket
                
                context = ssl.create_default_context()
                with socket.create_connection((domain, 443)) as sock:
                    with context.wrap_socket(sock, server_hostname=domain) as ssock:
                        cert = ssock.getpeercert()
                        
                        # Valid certificate adds to legitimacy
                        if cert:
                            score += 15
                            
                            # Check certificate issuer - major CAs tend to have stricter validation
                            issuer = dict(x[0] for x in cert['issuer'])
                            major_cas = ['DigiCert', 'Let\'s Encrypt', 'Comodo', 'GlobalSign', 'GoDaddy', 
                                        'Sectigo', 'Entrust', 'Amazon', 'Google']
                            
                            for ca in major_cas:
                                if any(ca.lower() in str(v).lower() for v in issuer.values()):
                                    score += 10
                                    break
                                    
                            # Check expiration date - certificates renewed recently show active maintenance
                            import datetime
                            not_after = datetime.datetime.strptime(cert['notAfter'], '%b %d %H:%M:%S %Y %Z')
                            not_before = datetime.datetime.strptime(cert['notBefore'], '%b %d %H:%M:%S %Y %Z')
                            
                            # Certificate age in days
                            cert_age = (not_after - not_before).days
                            
                            # Recently issued certificates (last 90 days)
                            now = datetime.datetime.now()
                            days_since_issue = (now - not_before).days
                            if days_since_issue < 90:
                                score += 5
                                
                        total_checks += 30
                        
            except Exception as e:
                logger.warning(f"Error checking SSL certificate: {str(e)}")
            
            # DNS check - verify MX records exist (legitimate sites often have email)
            try:
                import dns.resolver
                
                mx_records = dns.resolver.resolve(domain, 'MX')
                if mx_records and len(mx_records) > 0:
                    score += 10
                    
                # Check for SPF record (shows email security awareness)
                try:
                    spf_records = dns.resolver.resolve(domain, 'TXT')
                    for record in spf_records:
                        if 'spf' in str(record).lower():
                            score += 5
                            break
                except:
                    pass
                    
                total_checks += 15
                    
            except Exception as e:
                logger.warning(f"Error checking DNS records: {str(e)}")
            
            # HTTP response check - verify the site returns proper headers
            try:
                import requests
                response = requests.head(f"{domain}", timeout=5, allow_redirects=True)
                
                # Check status code
                if 200 <= response.status_code < 300:
                    score += 10
                    
                # Check for security headers
                security_headers = ['strict-transport-security', 'content-security-policy',
                                'x-content-type-options', 'x-frame-options']
                                
                for header in security_headers:
                    if header in response.headers:
                        score += 2.5
                        
                total_checks += 20
                    
            except Exception as e:
                logger.warning(f"Error checking HTTP response: {str(e)}")
                
            # Web content check - fetch robots.txt (legitimate sites often have this)
            try:
                import requests
                robot_response = requests.get(f"{domain}/robots.txt", timeout=5)
                if robot_response.status_code == 200:
                    score += 5
                total_checks += 5
                    
            except Exception as e:
                logger.warning(f"Error checking robots.txt: {str(e)}")
            
            # Calculate final score
            if total_checks > 0:
                final_score = int((score / total_checks) * 100)
                self.traffic_legitimacy_score = final_score
            else:
                self.traffic_legitimacy_score = 50  # Default score
                
        except Exception as e:
            logger.error(f"Error fetching traffic legitimacy: {str(e)}")
            self.traffic_legitimacy_score = 50  # Default score
        
        return self.traffic_legitimacy_score
    
    
    def fetch_seo_trust_score(self):
        response = requests.get(f"https://lsapi.seomoz.com/v2/url_metrics?targets={self.url}", headers={
            "Authorization": "Bearer YOUR_MOZ_API_KEY"
        })
        if response.status_code == 200:
            self.seo_trust_score = response.json().get('domainAuthority', 0)
        else:
            self.seo_trust_score = 0
        return self.seo_trust_score

    def calculate_overall_score(self):
        weights = {
            'content_quality_score': 0.4,
            'traffic_legitimacy_score': 0.3,
            'seo_trust_score': 0.3
        }
        scores = [
            (self.content_quality_score or 0) * weights['content_quality_score'],
            (self.traffic_legitimacy_score or 0) * weights['traffic_legitimacy_score'],
            (self.seo_trust_score or 0) * weights['seo_trust_score']
        ]
        self.overall_score = sum(scores)
        return self.overall_score
    
    def auto_approve(self):
        if self.overall_score and self.overall_score >= 75:
            self.status = 'approved'
        else:
            self.status = 'rejected'
        self.save()
    
    def verify_website(self):
        self.fetch_domain_age()
        self.fetch_content_quality_score()
        self.fetch_traffic_legitimacy_score()
        self.fetch_seo_trust_score()
        self.calculate_overall_score()
        self.auto_approve()
        self.save()
    
    def __str__(self):
        return f"{self.url} - {self.status}"

# Webhook URL Model
class Webhook(models.Model):
    url = models.URLField()

# Webhook Notification
@receiver(post_save, sender=WebsiteVerification)
def send_webhook_notification(sender, instance, **kwargs):
    webhook = Webhook.objects.first()
    if webhook:
        requests.post(webhook.url, json={
            "url": instance.url,
            "status": instance.status,
            "overall_score": instance.overall_score
        })
