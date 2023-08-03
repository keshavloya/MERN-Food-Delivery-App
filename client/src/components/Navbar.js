import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { useSelector } from "react-redux";
import Modal from "../Modal";
import Cart from "../screens/Cart";
library.add(faCartShopping);

const Navbar = () => {
  const cartItem = useSelector((state) => state.cart).length;
  const navigate = useNavigate();
  const [cartView, setCartView] = useState(false);
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userEmail");
    navigate("/login");
  };

  // useEffect(() => {
  //   const currentUrl = window.location.pathname.toString().substring(1);
  //   console.log(currentUrl);
  // });

  return (
    <div className="sticky-top" style={{ zIndex: 900 }}>
      <nav className="navbar navbar-expand-lg navbar-dark bg-success">
        <div className="container-fluid">
          <Link className="navbar-brand fs-1 fst-italic fw-bolder" to="/">
            Deliver Food
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className="nav-link active fs-5"
                  aria-current="page"
                  to="/"
                >
                  Home
                </Link>
              </li>
              {localStorage.getItem("authToken") && (
                <li className="nav-item">
                  <Link
                    className="nav-link fs-5"
                    aria-current="page"
                    to="/myOrder"
                  >
                    My Orders
                  </Link>
                </li>
              )}
            </ul>
            {localStorage.getItem("authToken") ? (
              <div className="d-flex navbar-nav">
                <button className="nav-link fs-6 bg-success border-0">
                  <FontAwesomeIcon
                    icon="fa-solid fa-cart-shopping"
                    onClick={() => setCartView(true)}
                    size="xl"
                  />
                  <i className="fa" style={{ fontSize: "24px" }}></i>
                  {cartItem !== 0 && (
                    <span className="badge badge-warning" id="lblCartCount">
                      {cartItem}
                    </span>
                  )}
                </button>
                {cartView && (
                  <Modal onClose={() => setCartView(false)}>
                    <Cart />
                  </Modal>
                )}
                <button
                  className="nav-link fs-5 bg-success border-0"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="d-flex navbar-nav">
                <Link className="nav-link fs-6" to="/login">
                  Login
                </Link>
                <Link className="nav-link fs-6" to="/signup">
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
