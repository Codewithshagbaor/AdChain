import uuid
import requests
from django.conf import settings

PAYSTACK_BASE_URL = "https://api.paystack.co"

class Paystack:
    def __init__(self):
        self.secret_key = settings.PAYSTACK_SECRET_KEY
        self.base_url = f"{PAYSTACK_BASE_URL}/bank"
        self.headers = {
            "Authorization": f"Bearer {settings.PAYSTACK_SECRET_KEY}",
            "Content-Type": "application/json",
        }

    def get_bank_page(self, country="Nigeria", per_page=5, cursor=None, pay_with_bank=False):
        url = f"{PAYSTACK_BASE_URL}/bank"
        
        params = {"country": country, "perPage": per_page}
        if cursor:
            params["cursor"] = cursor
        if pay_with_bank:
            params["pay_with_bank"] = "true"
        response = requests.get(url, headers=self.headers, params=params)
        data = response.json()

        if not data.get("status"):
            raise Exception(f"Paystack API error: {data.get('message')}")
        
        # Extract the list of banks and meta information
        banks = data.get("data", [])
        meta = data.get("meta", {})

        next_cursor = meta.get("next")
        
        return banks, next_cursor
    
    def verify_account(self, account_number, bank_code):
        url = f"{PAYSTACK_BASE_URL}/bank/resolve?account_number={account_number}&bank_code={bank_code}"
        response = requests.get(url, headers=self.headers)

        if response.status_code == 200 and response.json().get("status").lower() == "true":
            return response.json()
        return None