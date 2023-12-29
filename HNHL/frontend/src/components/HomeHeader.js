// Import necessary dependencies and assets
import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext, CartContext, CurrencyContext } from "../Context";
import logo from "../logo.svg";

// Define the HomeHeader component for the header section on the home page
function HomeHeader(props) {
  // Get user context, cart data, vendor status, and currency context
  const userContext = useContext(UserContext);
  const { cartData } = useContext(CartContext);
  const checkVendor = localStorage.getItem("vendor_login");
  const { CurrencyData, setCurrencyData } = useContext(CurrencyContext);

  // Initialize cart items count based on cart data
  let cartItems = cartData ? cartData.length : 0;

  // Function to handle currency change
  const changeCurrency = (e) => {
    var _currency = e.target.value;
    localStorage.setItem("currency", _currency);
    setCurrencyData(_currency);
  };

  // Render the header section with logo, navigation, and other elements
  return (
    <div className="container text-center">
      <div className="row">
        <div className="col">
          {/* Logo linking to the home page */}
          <Link to="/">
            <img src={logo} alt="Logo" width="250" height="250" />
          </Link>
        </div>
      </div>

      <div className="col">
        {/* Navigation bar with links and dropdowns */}
        <nav className="navbar  navbar-expand-lg navbar-dark bg-dark rounded">
          {/* Navigation links */}
          <ul className="navbar-nav mx-auto">
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

            {/* My Account dropdown for customers */}
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

                  {/* Dropdown menu options */}
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

            {/* Vendor Panel dropdown for vendors */}
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

                  {/* Dropdown menu options for vendors */}
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

            {/* Currency selection dropdown */}
            <li className="nav-item">
              <div className="nav-link">
                <select onChange={changeCurrency} border-radius="0.25">
                  {/* Options for currency selection */}
                  {CurrencyData != "USD" && CurrencyData != "EUR" && (
                    <>
                      <option value="PLN" selected>
                        PLN
                      </option>
                      <option value="USD">USD</option>
                      <option value="EUR">EUR</option>
                    </>
                  )}
                  {CurrencyData == "USD" && (
                    <>
                      <option value="PLN">PLN</option>
                      <option value="USD" selected>
                        USD
                      </option>
                      <option value="EUR">EUR</option>
                    </>
                  )}
                  {CurrencyData == "EUR" && (
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
        </nav>
      </div>
    </div>
  );
}

// Export the HomeHeader component as the default export
export default HomeHeader;
