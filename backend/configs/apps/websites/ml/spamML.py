import joblib
from transformers import pipeline
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression

# Load AI Content Detector (Hugging Face Model)
ai_detector = pipeline("text-classification", model="roberta-base-openai-detector")

# Train Spam Detector (Basic ML Model)
def train_spam_model():
    spam_texts = [
        "Buy now! Limited offer!", "Make money fast!!!", "Earn $10,000 per week from home!",
        "Hello, I am a prince from Nigeria...", "Click here to win a free iPhone!",
        "Thank you for your email, I will get back to you.", "This is an article about science."
    ]
    
    labels = [1, 1, 1, 1, 1, 0, 0]  # 1 = Spam, 0 = Not Spam
    
    vectorizer = TfidfVectorizer()
    X = vectorizer.fit_transform(spam_texts)
    model = LogisticRegression()
    model.fit(X, labels)

    joblib.dump((vectorizer, model), "spam_model.pkl")

# Train and save the model once
train_spam_model()

# Load trained model
vectorizer, spam_model = joblib.load("spam_model.pkl")