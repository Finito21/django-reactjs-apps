// Import necessary dependencies
import { Link } from "react-router-dom";

// Define the OrderFailure component for displaying a failure message after an order fails
function OrderFailure() {
  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-8 offset-2">
          {/* Card displaying order failure message */}
          <div className="card">
            <div className="card-body text-center">
              {/* Cross icon indicating failure */}
              <p>
                <i className="fa fa-times-circle text-danger fa-3x"></i>
              </p>
              {/* Failure message */}
              <h3 className="text-danger">Oops... Something went wrong</h3>
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

// Export the OrderFailure component as the default export
export default OrderFailure;
