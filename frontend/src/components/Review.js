import { Star } from "lucide-react";
import user from "../styles/img/user.png"

export default function Review() {
  return (
    <div className="col-md-6 p-4 shadow-md rounded-2xl review">
      <div className="flex items-center gap-4 mb-2">
        <img
          src={user}

          alt="User avatar"
          className="rounded-full user-img"
        />
        <div>
          <p className="review-name">Patricia</p>
        </div>
      </div>
      <div className="flex items-center text-sm text-gray-600 mb-2">
        <div className="flex text-yellow-500 mr-2">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={16} fill="currentColor" stroke="none" />
          ))}
        </div>
        <span className="mr-2 tertiary-color" style={{marginLeft : "5px"}}>2 days ago</span>
      </div>
      <div className="px-0 pt-0 text-gray-800">
        <p className="tertiary-color">
          Mike was to us the perfect host. We had such a good and memorable time
          at the cottage and property. We hope to be back! Also the contact with
          his daughter Alison was very ...
        </p>
      </div>
    </div>
  );
}
