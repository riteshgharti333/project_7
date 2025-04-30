import "./SmPDF.scss";

const SmPDF = () => {
  return (
    <div className="smpdf">
      <div className="smpdf-container">
        <div className="smpdf-top">
          <p>Invoice</p>
          <p>Original for recipient</p>
        </div>

        <div className="smpdf-details">
          <h3>Star Marketing</h3>

          <div className="comp-detail">
            <p>
              <span>Mobile:</span>
              <span>+91 8580483491</span>
            </p>
            <p>
              <span>Email:</span>
              <span>a@gmail.com</span>
            </p>
          </div>

          <div className="comp-date">
            <p>
              <span>Invoice #:</span>
              <span>INV-2</span>
            </p>
            <p>
              <span>Invoice Date:</span>
              <span>26 Apr 2025</span>
            </p>
            <p>
              <span>Due Date:</span>
              <span>26 Apr 2025</span>
            </p>
          </div>
          <div className="comp-user">
            <p>Customer Details:</p>
            <p>Suraj</p>
            <p>Ph: +91 12345678</p>
          </div>

          <div className="comp-table">
            <table>
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
                  <td>Sample Item</td>
                  <td>₹100</td>
                  <td>2</td>
                  <td>₹200</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="comp-total">
            <div className="comp-total-item">
              <p>Total</p>
              <p>₹900.00</p>
            </div>
            <div className="comp-total-item">
              <p>Total Discount</p>
              <p>₹100.00</p>
            </div>
          </div>

          <div className="comp-word">
            <p>Total Items / Qty : 1 /10 </p>
            <p>Total amount (in words): INR Nine Hundred Rupees Only.</p>
          </div>

          <hr />

          <div className="comp-total">
            <div className="comp-total-item">
              <p>Amount Payble</p>
              <p>₹100.00</p>
            </div>
          </div>

          <div className="comp-sig">
            <p>For Star Marketing</p>
            <img src="" alt="" />
            <p>Authorized Signatory</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmPDF;
