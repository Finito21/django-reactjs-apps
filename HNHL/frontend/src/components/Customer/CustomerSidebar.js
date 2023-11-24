import {Link} from 'react-router-dom';

function CustomerSidebar(){
    return (
        <div className="list-group">
            <Link to="/customer/dashboard" className="list-group-item list-group-item-action active">Dashboard</Link>
            <Link to="/customer/Orders" className="list-group-item list-group-item-action">Orders</Link>
            <Link to="/customer/wishlist" className="list-group-item list-group-item-action">Wishlist</Link>
            <Link to="/customer/customer-profile" className="list-group-item list-group-item-action">Profile</Link>
            <Link to="/customer/change-customer-password" className="list-group-item list-group-item-action">Change Password</Link>
            <Link to="/customer/addresses" className="list-group-item list-group-item-action">Addresses</Link>            
            <Link href="#" className="list-group-item list-group-item-action text-danger">Logout</Link>
        </div>
    )
}
export default CustomerSidebar;