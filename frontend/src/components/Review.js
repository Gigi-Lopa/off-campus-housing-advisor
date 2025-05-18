import { Star } from "lucide-react";
import user from "../styles/img/user.png"

export default function Review({review}) {
  return (
    <div className="col-md-6 p-4 shadow-md rounded-2xl review">
      <div className="flex items-center gap-4 mb-2">
        <img
          src={user}
          alt="User avatar"
          className="rounded-full user-img"
        />
        <div>
          <p className="review-name">{review.client_name}</p>
        </div>
      </div>
      <div className="flex items-center text-sm text-gray-600 mb-2">
        <div className="flex text-yellow-500 mr-2">
        {Array.from({ length: 5 }, (_, i) => i + 1).map((star) => (
            <span
              key={star}
              style={{
                  color: (review.rating) >= star ? '#ffc107' : '#6A6A7D',
                  fontSize: '1rem'
              }}
            >
            ★
            </span>
        ))}
        </div>
        <span className="mr-2 tertiary-color" style={{marginLeft : "5px"}}>{review.review_score}</span>
      </div>
      <div className="px-0 pt-0 text-gray-800">
        <p className="tertiary-color">
          {review.review}
        </p>
      </div>
    </div>
  );
}
