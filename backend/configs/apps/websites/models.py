
from django.db import models
from django.utils.crypto import get_random_string
import requests
from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver
from apps.utils import enums
import logging
from django.conf import settings
from .ml.spamML import ai_detector
import os
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
    
    @staticmethod
    def scrape_website(url):
        from bs4 import BeautifulSoup
        try:
            response = requests.get(url, timeout=10)
            soup = BeautifulSoup(response.text, "html.parser")
            return " ".join([p.text for p in soup.find_all("p")])
        except Exception as e:
            logger.error(f"Error scraping website {url}: {str(e)}")
            return ""  # Return empty string instead of error message

    @staticmethod
    def detect_spam(text):
        import joblib
        model_path = "spam_model.pkl"

        try:
            vectorizer, spam_model = joblib.load(model_path)
            text_vector = vectorizer.transform([text])
            prediction = spam_model.predict(text_vector)
            return 1 if prediction[0] == 1 else 0  # Return numeric value (1 = spam, 0 = not spam)
        
        except Exception as e:
            logger.error(f"Error detecting spam: {e}")
            return 0  # Default to not spam on error

    @staticmethod
    def detect_ai_text(text):
        try:
            result = ai_detector(text[:512])  # Limit text to avoid token overflow
            
            # Handle result based on its type
            if isinstance(result, list):
                # If result is a list, assume first element contains the score
                # or calculate average if multiple scores
                if len(result) > 0:
                    if isinstance(result[0], (int, float)):
                        return float(result[0])
                    else:
                        # If first element isn't numeric, try to extract a numeric value
                        try:
                            # This assumes the list contains dictionaries with a score field
                            return float(result[0].get('score', 0))
                        except (AttributeError, ValueError):
                            logger.warning("Could not extract numeric AI score from result")
                            return 0
                else:
                    return 0
            elif isinstance(result, (int, float)):
                # If result is already numeric
                return float(result)
            elif isinstance(result, str):
                # If result is a string, try to convert to float
                try:
                    return float(result)
                except ValueError:
                    logger.warning(f"Could not convert AI detection result to float: {result}")
                    return 0
            else:
                # For any other type
                logger.warning(f"Unexpected AI detection result type: {type(result)}")
                return 0
        except Exception as e:
            logger.error(f"Error detecting AI text: {str(e)}")
            return 0  # Default value on error

    def fetch_content_quality_score(self):
        try:
            logger.info(f"Scraping website {self.url}")
            website_text = self.scrape_website(self.url)
            
            if not website_text:
                logger.warning(f"Failed to extract text from website {self.url}")
                self.content_quality_score = 0
                return self.content_quality_score

            try:
                # Now both functions return numeric values
                spam_result = self.detect_spam(website_text)  # 0 or 1
                ai_result = self.detect_ai_text(website_text)  # Float between 0-1
                
                # Calculate content quality score
                base_score = 100
                spam_penalty = 50 if spam_result == 1 else 0  # Now comparing numeric values
                ai_penalty = min(50, ai_result * 50)  # Scale AI score (0-1) to penalty (0-50)
                
                self.content_quality_score = max(0, base_score - spam_penalty - ai_penalty)
                logger.info(f"Content quality score: {self.content_quality_score} (Spam: {spam_result}, AI: {ai_result})")
                return self.content_quality_score
            except Exception as e:
                logger.error(f"Error calculating content quality score: {str(e)}")
                self.content_quality_score = 50  # Default middle score on error
                return self.content_quality_score
        except Exception as e:
            logger.error(f"Error in fetch_content_quality_score: {str(e)}")
            self.content_quality_score = 50  # Default middle score on error
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
                    logger.info(f"Total checks: {total_checks}")
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
                                    score += 15
                                    break
                            score += 10
                                    
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
        try:
            # Track multiple factors and calculate a composite score
            factors = {}
            total_score = 0
            max_points = 0
            
            # 1. Page load speed (using requests timing)
            try:
                import time
                start_time = time.time()
                response = requests.get(self.url, timeout=10)
                load_time = time.time() - start_time
                
                # Score: 20 points max, decreasing as load time increases
                speed_score = min(20, max(0, 20 - (load_time * 10)))
                factors['load_speed'] = speed_score
                total_score += speed_score
                max_points += 20
            except Exception as e:
                logger.warning(f"Error checking load speed: {str(e)}")
            
            # 2. Mobile friendliness (check viewport meta tag)
            try:
                from bs4 import BeautifulSoup
                soup = BeautifulSoup(response.text, 'html.parser')
                
                viewport = soup.find('meta', {'name': 'viewport'})
                mobile_score = 15 if viewport else 0
                factors['mobile_friendly'] = mobile_score
                total_score += mobile_score
                max_points += 15
            except Exception as e:
                logger.warning(f"Error checking mobile friendliness: {str(e)}")
            
            # 3. Check for meta tags (title, description)
            try:
                meta_score = 0
                
                title = soup.find('title')
                if title and title.text and 10 <= len(title.text) <= 70:
                    meta_score += 10
                
                meta_desc = soup.find('meta', {'name': 'description'})
                if meta_desc and meta_desc.get('content') and 50 <= len(meta_desc.get('content')) <= 160:
                    meta_score += 10
                
                factors['meta_tags'] = meta_score
                total_score += meta_score
                max_points += 20
            except Exception as e:
                logger.warning(f"Error checking meta tags: {str(e)}")
            
            # 4. Check for heading structure
            try:
                h1_tags = soup.find_all('h1')
                h2_tags = soup.find_all('h2')
                h3_tags = soup.find_all('h3')
                
                heading_score = 0
                
                # Has exactly one H1 tag
                if len(h1_tags) == 1:
                    heading_score += 5
                
                # Has H2 tags
                if len(h2_tags) > 0:
                    heading_score += 5
                
                # Has H3 tags
                if len(h3_tags) > 0:
                    heading_score += 5
                
                factors['heading_structure'] = heading_score
                total_score += heading_score
                max_points += 15
            except Exception as e:
                logger.warning(f"Error checking heading structure: {str(e)}")
            
            # 5. Check HTTPS
            try:
                https_score = 10 if self.url.startswith('https://') else 0
                factors['https'] = https_score
                total_score += https_score
                max_points += 10
            except Exception as e:
                logger.warning(f"Error checking HTTPS: {str(e)}")
            
            # 6. Check for sitemap.xml
            try:
                sitemap_url = f"{self.url.rstrip('/')}/sitemap.xml"
                sitemap_response = requests.head(sitemap_url, timeout=5)
                sitemap_score = 10 if sitemap_response.status_code == 200 else 0
                factors['sitemap'] = sitemap_score
                total_score += sitemap_score
                max_points += 10
            except Exception as e:
                logger.warning(f"Error checking sitemap: {str(e)}")
            
            # Calculate final score (scale to 0-100)
            if max_points > 0:
                self.seo_trust_score = round((total_score / max_points) * 100)
            else:
                self.seo_trust_score = 0
                
            logger.info(f"SEO factors for {self.url}: {factors}")
            logger.info(f"Final SEO score: {self.seo_trust_score}")
                
        except Exception as e:
            logger.error(f"Error calculating SEO trust score: {str(e)}")
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
        logger.info(f"Starting verification for {self.url}")
            
            # Record initial state for analysis
        initial_state = {
            'domain_age': self.domain_age,
            'content_quality_score': self.content_quality_score,
            'traffic_legitimacy_score': self.traffic_legitimacy_score,
            'seo_trust_score': self.seo_trust_score,
            'overall_score': self.overall_score
        }
            
            # Run verification
        self.fetch_domain_age()
        self.fetch_content_quality_score()
        self.fetch_traffic_legitimacy_score()
        self.fetch_seo_trust_score()
        self.calculate_overall_score()
            
            # Record final state for analysis
        final_state = {
            'domain_age': self.domain_age,
            'content_quality_score': self.content_quality_score,
            'traffic_legitimacy_score': self.traffic_legitimacy_score,
            'seo_trust_score': self.seo_trust_score,
            'overall_score': self.overall_score
        }
            
            # Log the before/after for system improvement
        logger.info(f"Verification completed for {self.url}. Initial: {initial_state}, Final: {final_state}")
            
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
