import {React} from "react";
import sample from  "../styles/img/q.jpg"
import { Link } from "react-router-dom";
function Listing() {
  return (
    <div className="card_">
      <Link to={"/listing/23"}>
        <div className="position-relative card_img">
          <img 
            src = {sample}
            className="card-img-top" 
            alt="Room" 
          />
          <span className="badge bg-light text-dark position-absolute top-0 start-0 m-2 fw-bold guest-status">
            Guest favorite
          </span>
        </div>

        <div className="card-body p-2">
          <h6 className="card-title mb-1">Orange House, Shashi</h6>
          <p className="card-text text-muted mb-1">
            Hosted by Lucinda & Petrus
          </p>
          <p className="card-text text-muted mb-2">
          15 Students
          </p>
          <div className="d-flex justify-content-between align-items-center">
            <small>
              <strong className = "card-price">$75 /m</strong> 
            </small>
            <small className="d-flex align-items-center">
              <span className="bi bi-star-fill text-dark me-1" ></span> 4.85
            </small>
          </div>
        </div>
      </Link>   
    </div>
  );
}

export default Listing;
