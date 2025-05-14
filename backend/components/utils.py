from googletrans import Translator
import asyncio
from lines import lines
from transformers import pipeline
from langdetect import detect
import re
class ReviewSentiment:
    def __init__(self):
       self.sentiment_pipeline = pipeline("sentiment-analysis", model="nlptown/bert-base-multilingual-uncased-sentiment")
       self.LEET_MAP = str.maketrans("01345@$!", "oieasasi")
    
    async def translate_review(self, review):
        async with Translator() as translator:
            result = await translator.translate(review, dest='en')
            if result:
                return result.text
        return None
    
    def normalize_text(self, word):
        clean = word.lower().translate(self.LEET_MAP)
        clean = re.sub(r'[^a-z\s]', '', clean)
        return clean
    
    def check_clean_liness(self, word):
        word = self.normalize_text(word)
        if word in lines:
            return 1
        return 0
    def get_sentiment(self, review):
        words = review.lower().split(" ")
        for word in words:
            if self.check_clean_liness(word) == 1:           
                return "dirty"
        
        LANGUAGE = detect(review)
        if LANGUAGE != "en":
            english_review = asyncio.run(self.translate_review(review))
        else:
            english_review = review

        sentiment = self.sentiment_pipeline(english_review)
        return {
            "original_shona": review,
            "translated_english": english_review,
            "sentiment": sentiment
        }
review_sentiment = ReviewSentiment() 
print(review_sentiment.get_sentiment("Was a kind hearted person. His patient with you and everyone"))