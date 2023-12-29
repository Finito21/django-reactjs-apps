// CustomersList.js
import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
const baseUrl = "http://127.0.0.1:8000/api/";

function CustomersList({ customerList }) {
  function showConfirm(customer_id) {
    var _confirm = window.confirm("Are you sure to delete this Customer?");
    if (_confirm) {
      fetch(baseUrl + "delete-customer-orders/" + customer_id, {
        method: "DELETE",
      }).then((response) => {
        if (response.bool === true) {
          fetchData(baseUrl + "vendor/customer/" + customer_id + "/orderitems");
        }
        window.location.reload();
      });
    }
  }

  return (
    <div className="container mt-4">
      <div
        className="table-responsive d-flex justify-content-center align-items-center"
        style={{ borderRadius: "10px" }}
      >
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Mobile</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {customerList.map((item, index) => (
              <tr key={index}>
                <td className="align-middle">{item.user.username}</td>
                <td className="align-middle">{item.user.email}</td>
                <td className="align-middle">{item.customer.mobile}</td>
                <td className="align-middle">
                  <button
                    onClick={() => showConfirm(item.customer.id)}
                    className="btn btn-danger btn-sm ms-1"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CustomersList;
