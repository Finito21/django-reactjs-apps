import { Link } from "react-router-dom";

function SingleSeller(props) {
  // Display a single seller card with their information
  return (
    <div className="col-12 col-md-3 mb-4">
      <div className="card text-center">
        {/* Link to the seller's detailed page */}
        <Link to={`/seller/${props.seller.user.username}/${props.seller.id}`}>
          {/* Seller's profile image */}
          <img
            src={props.seller.profile_img}
            className="card-img-top"
            alt={props.seller.user.username}
          />
        </Link>
        <div className="card-body text-center">
          {/* Seller's username as a clickable link */}
          <h4 className="card-title" style={{ marginBottom: "10px" }}>
            <Link
              to={`/seller/${props.seller.user.username}/${props.seller.id}`}
              style={{ textDecoration: "none", color: "black" }}
            >
              {props.seller.user.username}
            </Link>
          </h4>
        </div>
      </div>
    </div>
  );
}

// Export the SingleSeller component as the default export
export default SingleSeller;
