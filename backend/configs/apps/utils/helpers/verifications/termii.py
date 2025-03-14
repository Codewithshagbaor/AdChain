import requests
from django.conf import settings
import logging

logger = logging.getLogger(__name__)

class TermiiService:
    def __init__(self, phone_number):
        self.base_url = f"https://{settings.TERMII_BASE_URL}/api/sms/send"
        self.phone_number = phone_number
        self.api_key = settings.TERMII_API_KEY

    def send_sms(self, to, message):
        payload = {
            "api_key": self.api_key,
            "to": self.phone_number,
            "from": "Zpilt",
            "sms": message,
            "type": "plain",
            "channel": "generic",
        }
        headers = {
            'Content-Type': 'application/json',
        }

        try:
            response = requests.request("POST", self.base_url, headers=headers, json=payload)
            response.raise_for_status()
            response_data = response.json()
            logger.info(f"SMS sent successfully: {response_data}")
            return response_data
        except requests.RequestException as e:
            error_message = f"Failed to send SMS: {e}"
            logger.error(error_message)
            return error_message