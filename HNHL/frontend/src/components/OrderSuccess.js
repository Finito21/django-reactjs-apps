// Import necessary dependencies
import { Link } from "react-router-dom";

// Define the OrderSuccess component for displaying a success message after an order is placed
function OrderSuccess() {
  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-8 offset-2">
          {/* Card displaying order success message */}
          <div className="card">
            <div className="card-body text-center">
              {/* Checkmark icon indicating success */}
              <p>
                <i className="fa fa-check-circle text-success fa-3x"></i>
              </p>
              {/* Success message */}
              <h3 className="text-success">Thanks for the Order</h3>
              {/* Buttons to navigate to Home and Customer Dashboard */}
              <p className="mt-4">
                <Link to="/" className="btn btn-primary">
                  Home
                </Link>
                <Link
                  to="/customer/dashboard"
                  className="btn btn-secondary ms-2"
                >
                  Dashboard
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Export the OrderSuccess component as the default export
export default OrderSuccess;
