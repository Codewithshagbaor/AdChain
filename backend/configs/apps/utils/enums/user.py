from .base import BaseEnum

class UserAccountType(BaseEnum):
    ADMINISTRATOR = "ADMINISTRATOR"
    PUBLISHER = "PUBLISHER"
    ADVERTISER = "ADVERTISER"

class VerificationStatus(BaseEnum):
    PENDING = "PENDING"
    PARTIAL = "PARTIAL"
    VERIFIED = "VERIFIED"
    UNVERIFIED = "UNVERIFIED"
    DECLINED = "DECLINED"