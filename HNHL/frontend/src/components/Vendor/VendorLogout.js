// Function for handling vendor logout
function VendorLogout() {
  // Removing vendor login-related information from local storage
  localStorage.removeItem("vendor_login");
  localStorage.removeItem("vendor_username");

  // Redirecting to the vendor login page
  window.location.href = "/vendor/login";
}

// Exporting the VendorLogout function as the default export
export default VendorLogout;
