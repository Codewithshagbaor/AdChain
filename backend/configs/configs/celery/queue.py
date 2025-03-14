from kombu import Queue


class CeleryQueue:
    class Definitions:
        EMAIL_AND_SMS_NOTIFICATION = "email-sms-notification"
        PAYMENT = "payment"
        LOGGING = "logging"
        ACCOUNT_VERIFICATION = "account-verification"

    @staticmethod
    def queues():
        return tuple(
            (Queue(getattr(CeleryQueue.Definitions, item)))
            for item in filter(
                lambda ref: not ref.startswith("_"), dir(CeleryQueue.Definitions)
            )
        )
