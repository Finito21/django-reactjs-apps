import VendorSidebar from "./VendorSidebar";
import { useState, useEffect } from "react";
import logo from "../../logo.svg";
import { Link } from "react-router-dom";

const baseUrl = "http://127.0.0.1:8000/api/";

function VendorOrders() {
  const vendor_id = localStorage.getItem("vendor_id");
  const [OrderList, setOrderList] = useState([]);

  useEffect(() => {
    fetchData(baseUrl + `vendor/${vendor_id}/orders/`);
  }, []);

  function fetchData(baseurl) {
    fetch(baseurl)
      .then((response) => response.json())
      .then((data) => {
        setOrderList(data.results);
        console.log(data.results);
      });
  }
  function showConfirm(order_id) {
    var _confirm = window.confirm("Are you sure to delete this order?");
    if (_confirm) {
      fetch(baseUrl + "delete-customer-order/" + order_id, {
        method: "DELETE",
      }).then((response) => {
        if (response.status == 204) {
          fetchData(baseUrl + "vendor/" + vendor_id + "/orders");
        }

        window.location.reload();
      });
    }
  }

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-3 col-12 mb-2">
          <VendorSidebar></VendorSidebar>
        </div>
        <div className="col-md-9 col-12 mb-2">
          <div>
            <div
              className="table-responsive d-flex justify-content-center align-items-center"
              style={{ borderRadius: "10px" }}
            >
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Order Id</th>
                    <th scope="col">Address</th>
                    <th scope="col">Customer Email</th>
                    <th scope="col">Customer Mobile</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {OrderList.map((item, index) => (
                    <tr key={index}>
                      <td className="align-middle">{item.id}</td>
                      <td class="align-middle">
                        {item.customer.customer_addresses.map((address) =>
                          address.default_address ? address.address : null
                        )}
                      </td>
                      <td className="align-middle">
                        {item.customer.user.email}
                      </td>
                      <td className="align-middle">{item.customer.mobile}</td>
                      <td className="align-middle">
                        <th>
                          <Link
                            to={`/vendor/${vendor_id}/customer/${item.customer.id}/orderitems/${item.id}`}
                            className="btn btn-primary btn-sm"
                          >
                            Details
                          </Link>
                        </th>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VendorOrders;
