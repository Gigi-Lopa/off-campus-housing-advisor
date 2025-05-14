import {React, useEffect} from "react";

function Listing({listing, onClickCard}) {
  return (
    <div className="card_">
      <div onClick={()=>{onClickCard(listing.listing_id)}}>
        <div className="position-relative card_img">
          <img 
            src = {`${process.env.REACT_APP_API_ADDRESS}/get/image/${listing.images}`}
            className="card-img-top" 
            alt="Room" 
          />
          <span className="badge bg-light text-dark position-absolute top-0 start-0 m-2 fw-bold guest-status">
            Guest favorite
          </span>
        </div>

        <div className="card-body p-2">
          <h6 className="card-title mb-1">{listing.name}, {listing.location}</h6>
          <p className="card-text text-muted mb-1">
            Hosted by {listing.hosted_by}
          </p>
          <p className="card-text text-muted mb-2">
          {listing.total_students} Students
          </p>
          <div className="d-flex justify-content-between align-items-center">
            <small>
              <strong className = "card-price">${listing.rent} /m</strong> 
            </small>
            <small className="d-flex align-items-center">
              <span className="bi bi-star-fill text-dark me-1" >{listing.rating}</span> 
            </small>
          </div>
        </div>
      </div>   
    </div>
  );
}

export default Listing;
