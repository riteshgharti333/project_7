import React from "react";
import "./BillingInvoice.scss";

const BillingInvoice = () => {
  return (
    <div className="invoice-wrapper">
      <div className="invoice-header">
        <h1>Star Marketing</h1>
        <div className="contact-info">
          <p>Mobile: 9876543210</p>
          <p>Email: starmarketing@example.com</p>
        </div>
      </div>

      <div className="invoice-details">
        <div>
          <strong>Invoice No:</strong> INV-2
        </div>
        <div>
          <strong>Invoice Date:</strong> 26 Apr 2025
        </div>
        <div>
          <strong>Due Date:</strong> 26 Apr 2025
        </div>
      </div>
      <div className="customer-details">
        <h3>Bill To:</h3>
        <p>Suraj</p>
      </div>
      <table className="invoice-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Item</th>
            <th>Rate/Item</th>
            <th>Qty</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Banana</td>
            <td>₹40.00</td>
            <td>10</td>
            <td>₹400.00</td>
          </tr>
        </tbody>
      </table>

      <div className="invoice-totals">
        <p>
          <strong>Total Items/Qty:</strong> 1/10
        </p>
        <p>
          <strong>Total:</strong> ₹400.00
        </p>
        <p>
          <strong>Amount Payable:</strong> ₹400.00
        </p>
        <p>
          <strong>Amount in Words:</strong> INR Four Hundred Rupees Only
        </p>
      </div>

      {/* Footer */}
      <div className="invoice-footer">
        <p>For Star Marketing</p>
        <p>Authorized Signatory</p>
        <p className="powered-by">Powered by Swipe</p>
      </div>
    </div>
  );
};

export default BillingInvoice;
