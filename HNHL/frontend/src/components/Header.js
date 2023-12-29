// Import necessary dependencies and assets
import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext, CartContext, CurrencyContext } from "../Context";
import logo from "../logo.svg";

// Define the Header component
function Header(props) {
  // Access user, cart, and currency context
  const userContext = useContext(UserContext);
  const { cartData } = useContext(CartContext);
  const checkVendor = localStorage.getItem("vendor_login");
  const { CurrencyData, setCurrencyData } = useContext(CurrencyContext);

  // Calculate the number of items in the cart
  var cartItems = cartData ? cartData.length : 0;
  console.log(cartData);

  // Function to handle currency change
  const changeCurrency = (e) => {
    var _currency = e.target.value;
    localStorage.setItem("currency", _currency);
    setCurrencyData(_currency);
  };

  // Render the navigation bar
  return (
    <nav className="navbar navbar-expand-lg">
      <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
        {/* Logo */}
        <Link className="navbar-brand" to="/">
          <img src={logo} alt="Logo" width="150" height="150" />
        </Link>

        {/* Navigation Links */}
        <div className="collapse navbar-collapse " id="navbarTogglerDemo01">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 navbar-dark bg-dark rounded">
            <li className="nav-item">
              <Link className="nav-link" aria-current="page" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" aria-current="page" to="/categories">
                Categories
              </Link>
            </li>

            {/* My Account Dropdown */}
            {!checkVendor && (
              <>
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    My Account
                  </a>
                  <ul className="dropdown-menu">
                    {userContext.login !== "true" && (
                      <>
                        <li>
                          <Link
                            className="dropdown-item"
                            to="/customer/register"
                          >
                            Register
                          </Link>
                        </li>
                        <li>
                          <Link className="dropdown-item" to="/customer/login">
                            Login
                          </Link>
                        </li>
                      </>
                    )}
                    {userContext.login === "true" && (
                      <>
                        <li>
                          <Link
                            className="dropdown-item"
                            to="/customer/dashboard"
                          >
                            Dashboard
                          </Link>
                        </li>
                        <li>
                          <Link className="dropdown-item" to="/customer/logout">
                            Logout
                          </Link>
                        </li>
                      </>
                    )}
                  </ul>
                </li>
              </>
            )}

            {/* Vendor Panel Dropdown */}
            {checkVendor && (
              <>
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Vendor Panel
                  </a>
                  <ul className="dropdown-menu">
                    <li>
                      <Link className="dropdown-item" to="/vendor/dashboard">
                        Dashboard
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/vendor/logout">
                        Logout
                      </Link>
                    </li>
                  </ul>
                </li>
              </>
            )}

            {/* My Cart link for customers */}
            {!checkVendor && userContext.login == "true" && (
              <>
                {cartItems > 0 && (
                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      aria-current="page"
                      to="/checkout"
                    >
                      My Cart ({cartItems})
                    </Link>
                  </li>
                )}

                {!(cartItems > 0) && (
                  <li className="nav-item">
                    <Link className="nav-link" aria-current="page">
                      My Cart ({cartItems})
                    </Link>
                  </li>
                )}
              </>
            )}

            {/* Currency Selector */}
            <li className="nav-item">
              <div className="nav-link">
                <select onChange={changeCurrency}>
                  {/* PLN Option */}
                  {CurrencyData !== "USD" && CurrencyData !== "EUR" && (
                    <>
                      <option value="PLN" selected>
                        PLN
                      </option>
                      <option value="USD">USD</option>
                      <option value="EUR">EUR</option>
                    </>
                  )}

                  {/* USD Option */}
                  {CurrencyData === "USD" && (
                    <>
                      <option value="PLN">PLN</option>
                      <option value="USD" selected>
                        USD
                      </option>
                      <option value="EUR">EUR</option>
                    </>
                  )}

                  {/* EUR Option */}
                  {CurrencyData === "EUR" && (
                    <>
                      <option value="PLN">PLN</option>
                      <option value="USD">USD</option>
                      <option value="EUR" selected>
                        EUR
                      </option>
                    </>
                  )}
                </select>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

// Export the Header component as the default export
export default Header;
