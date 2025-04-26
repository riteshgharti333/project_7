import "./CardInvoice.scss";

import { RxCross2 } from "react-icons/rx";
import { ArrowRight, CirclePlus } from "lucide-react";

const CardInvoice = ({ setOpenInvoiceCard, title }) => {
  const handleClose = () => {
    setOpenInvoiceCard(false);
  };

  return (
    <div className="cardInvoice">
      <div className="cardInvoice-container">
        <div className="cardInvoice-top">
          <div className="cardInvoice-top-left">
            <RxCross2
              className="cross-icon"
              onClick={handleClose} // Cross icon click
            />
            <h2>{title}</h2>
          </div>

          {/* <button className="primary-btn" onClick={handleClose}>
            Save & Update <ArrowRight size={20} />
          </button> */}
        </div>

        <div className="cardInvoice-desc">
          <p className="details">Details</p>

          <div className="cardInvoice-content">
            <div className="cardInvoice-content-left">
              <div className="cardInvoice-content-left-item">
                <span className="invoice-name">KP</span>
              </div>

              <div className="cardInvoice-content-left-item2">
                <p>Apple</p>
                <div className="cardInvoice-content-left-item2-item">
                  <p>
                    {title} Date <span>24-04-2025</span>
                  </p>
                  <p>
                    Due Date <span>24-04-2025</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="cardInvoice-price">
          <h3>₹100.00</h3>

          <div className="cardInvoice-price-customer">
            <table className="cardInvoice-table">
              <tr>
                <td>Customer</td>
                <td>Ritesh</td>
              </tr>
              <tr>
                <td>Phone Number</td>
                <td>123456789</td>
              </tr>
              <tr>
                <td>Email</td>
                <td>a@gmail.com</td>
              </tr>
            </table>
          </div>

          <table className="cardInvoice-product-table">
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Quantity</th>
                <th>Unit Price</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Product A</td>
                <td>2</td>
                <td>₹500</td>
                <td>₹1000</td>
              </tr>
              <tr>
                <td>Product B</td>
                <td>1</td>
                <td>₹1200</td>
                <td>₹1200</td>
              </tr>
              <tr>
                <td>Product C</td>
                <td>3</td>
                <td>₹300</td>
                <td>₹900</td>
              </tr>
            </tbody>
          </table>

          <div className="cardInvoice-total-amount">
            <div className="cardInvoice-total-amount-item">
              <p>Taxable Amount:</p>
              <span>₹100.00</span>
            </div>
            <div className="cardInvoice-total-amount-item">
              <p>Total Amount:</p>
              <span>₹100.00</span>
            </div>{" "}
            <div className="cardInvoice-total-amount-item">
              <p>Amount:</p>
              <span>₹100.00</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardInvoice;
