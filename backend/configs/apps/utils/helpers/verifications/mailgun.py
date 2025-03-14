import requests
from django.conf import settings
import logging

logger = logging.getLogger(__name__)

class MailgunService:
    def __init__(self, email):
        self.base_url = f"https://api.mailgun.net/v3/{settings.MAILGUN_DOMAIN}/messages"
        self.email = email
        self.api_key = settings.MAILGUN_API_KEY

    def send_mail(self, subject, message):
        payload = {
            "from": f"Zpilt <mailgun@{settings.MAILGUN_DOMAIN}>",
            "to": self.email,
            "subject": subject,
            "text": message,
        }
        headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
        }

        try:
            response = requests.request("POST", self.base_url, headers=headers, data=payload, auth=("api", self.api_key))
            response.raise_for_status()
            response_data = response.json()
            logger.info(f"Mail sent successfully: {response_data}")
            return response_data
        except requests.RequestException as e:
            error_message = f"Failed to send mail: {e}"
            logger.error(error_message)
            return error_message