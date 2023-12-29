import { Link } from "react-router-dom";

function CustomerSidebar() {
  // Sidebar component for customer navigation
  return (
    <div className="list-group">
      {/* Link to the customer dashboard */}
      <Link
        to="/customer/dashboard"
        className="list-group-item list-group-item-action active"
      >
        Dashboard
      </Link>
      {/* Link to customer orders */}
      <Link
        to="/customer/orders"
        className="list-group-item list-group-item-action"
      >
        Orders
      </Link>
      {/* Link to customer wishlist */}
      <Link
        to="/customer/wishlist"
        className="list-group-item list-group-item-action"
      >
        Wishlist
      </Link>
      {/* Link to customer profile */}
      <Link
        to="/customer/customer-profile"
        className="list-group-item list-group-item-action"
      >
        Profile
      </Link>
      {/* Link to change customer password */}
      <Link
        to="/customer/change-customer-password"
        className="list-group-item list-group-item-action"
      >
        Change Password
      </Link>
      {/* Link to customer addresses */}
      <Link
        to="/customer/addresses"
        className="list-group-item list-group-item-action"
      >
        Addresses
      </Link>
      {/* Link to customer logout with a text-danger color */}
      <Link
        to="/customer/logout"
        className="list-group-item list-group-item-action text-danger"
      >
        Logout
      </Link>
    </div>
  );
}

export default CustomerSidebar;
