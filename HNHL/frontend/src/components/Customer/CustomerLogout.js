function CustomerLogout() {
  // Remove customer login information from local storage
  localStorage.removeItem("customer_login");
  localStorage.removeItem("customer_username");

  // Redirect to the customer login page
  window.location.href = "/customer/login";
}

export default CustomerLogout;
