from .base import BaseEnum

class WebsiteStatus(BaseEnum):
    PENDING = "PENDING"
    APPROVED = "APPROVED"
    REJECTED = "REJECTED"

class WebsiteCategory(BaseEnum):
    CRYPTOCURRENCY = "CRYPTOCURRENCY"
    DEFI = "DEFI"
    NFT = "NFT"
    BLOCKCHAIN = "BLOCKCHAIN"
    METAVERSE = "METAVERSE"
    GAMING = "GAMING"
    TECHNOLOGY = "TECHNOLOGY"
    FINANCE = "FINANCE"