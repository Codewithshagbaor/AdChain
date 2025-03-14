from .base import BaseEnum

class WalletType(BaseEnum):
    NGN = "Nigerian Naira"
    USD = "US Dollar"
    BTC = "Bitcoin"
    ETH = "Ethereum"

class TranscationType(BaseEnum):
    DEPOSIT = "DEPOSIT"
    WITHDRAWAL = "WITHDRAWAL"
    PAYMENT = "PAYMENT"
    REFUND = "REFUND"

class TranscationStatus(BaseEnum):
    PENDING = "PENDING"
    SUCCESSFUL = "SUCCESSFUL"
    FAILED = "FAILED"
    CANCELLED = "CANCELLED"