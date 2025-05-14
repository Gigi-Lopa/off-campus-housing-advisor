import unittest
from unittest.mock import patch, AsyncMock
from utils import ReviewSentiment

class TestReviewSentiment(unittest.TestCase):
    def setUp(self):
        self.rs = ReviewSentiment()

    @patch('utils.detect')
    @patch.object(ReviewSentiment, 'translate_review', new_callable=AsyncMock)
    def test_non_english_review_translation(self, mock_translate, mock_detect):
        mock_detect.return_value = "sh"
        mock_translate.return_value = "He was very nice"
        result = self.rs.get_sentiment("Aive munhu ane moyo munyoro")
        self.assertEqual(result['translated_english'], "He was very nice")
        self.assertIn("sentiment", result)

    def test_english_review_sentiment(self):
        result = self.rs.get_sentiment("Was a kind hearted person. His patient with you and everyone")
        self.assertEqual(result["original_shona"], "Was a kind hearted person. His patient with you and everyone")
        self.assertIn("sentiment", result)

    def test_detect_dirty_word(self):
        self.rs.lines = {"badword"}
        with patch.object(self.rs, 'check_clean_liness', return_value=1):
            result = self.rs.get_sentiment("This is a badword")
            self.assertEqual(result, "dirty")

    def test_normalize_text_leetspeak(self):
        word = "H3LL0"
        normalized = self.rs.normalize_text(word)
        self.assertEqual(normalized, "hello")

    def test_normalize_text_special_characters(self):
        word = "H@ppy#Day"
        normalized = self.rs.normalize_text(word)
        self.assertEqual(normalized, "happyday")

if __name__ == '__main__':
    unittest.main()
