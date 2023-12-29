// Importing Link component from react-router-dom for navigation
import { Link } from "react-router-dom";

// Functional component for the vendor's sidebar navigation
function VendorSidebar() {
  return (
    // List group containing navigation links
    <div className="list-group">
      {/* Dashboard Link */}
      <Link
        to="/vendor/dashboard"
        className="list-group-item list-group-item-action active"
      >
        Dashboard
      </Link>
      {/* Products Link */}
      <Link
        to="/vendor/products"
        className="list-group-item list-group-item-action"
      >
        Products
      </Link>
      {/* Orders Link */}
      <Link
        to="/vendor/orders"
        className="list-group-item list-group-item-action"
      >
        Orders
      </Link>
      {/* Customers Link */}
      <Link
        to="/vendor/customers"
        className="list-group-item list-group-item-action"
      >
        Customers
      </Link>
      {/* Reports Link */}
      <Link
        to="/vendor/reports"
        className="list-group-item list-group-item-action"
      >
        Reports
      </Link>
      {/* Profile Link */}
      <Link
        to="/vendor/vendor-profile"
        className="list-group-item list-group-item-action"
      >
        Profile
      </Link>
      {/* Change Password Link */}
      <Link
        to="/vendor/change-vendor-password"
        className="list-group-item list-group-item-action"
      >
        Change Password
      </Link>
      {/* Logout Link */}
      <Link
        to="/vendor/logout"
        className="list-group-item list-group-item-action text-danger"
      >
        Logout
      </Link>
    </div>
  );
}

// Exporting the VendorSidebar component as the default export
export default VendorSidebar;
