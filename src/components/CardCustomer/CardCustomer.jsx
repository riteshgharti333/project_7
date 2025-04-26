import "./CardCustomer.scss";

import { RxCross2 } from "react-icons/rx";
import { ArrowRight, CirclePlus } from "lucide-react";

const CardCustomer = ({ setOpenCustomerCard }) => {
  const handleClose = () => {
    setOpenCustomerCard(false);
  };

  return (
    <div className="cardCustomer">
      <div className="cardCustomer-container">
        <div className="cardCustomer-top">
          <div className="cardCustomer-top-left">
            <RxCross2
              className="cross-icon"
              onClick={handleClose} // Cross icon click
            />
            <h2>Customer Name</h2>
          </div>

          {/* <button className="primary-btn" onClick={handleClose}>
            Save & Update <ArrowRight size={20} />
          </button> */}
        </div>

        <div className="cardCustomer-desc">
          <p className="details">Details</p>

          <div className="cardCustomer-content">
            <div className="cardCustomer-content-left">
              <div className="cardCustomer-content-left-item">
                <span className="invoice-name">KP</span>
              </div>

              <div className="cardCustomer-content-left-item2">
                <p>Apple</p>
                <div className="cardCustomer-content-left-item2-item">
                  <p>
                    Invoice Date <span>24-04-2025</span>
                  </p>
                  <p>
                    Due Date <span>24-04-2025</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="cardCustomer-price">
          <h3>₹100.00</h3>

          <table className="cardCustomer-product-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Date</th>
                <th>Status</th>
                <th>Amount</th>
                <th>Closing Balance</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>#TXN001</td>
                <td>2025-04-25</td>
                <td>Completed</td>
                <td>₹1,200</td>
                <td>₹10,800</td>
                <td>
                  <button>Delete</button>
                </td>
              </tr>
              <tr>
                <td>#TXN002</td>
                <td>2025-04-24</td>
                <td>Pending</td>
                <td>₹800</td>
                <td>₹9,600</td>
                <td>
                  <button>Delete</button>
                </td>
              </tr>
              <tr>
                <td>#TXN003</td>
                <td>2025-04-23</td>
                <td>Failed</td>
                <td>₹500</td>
                <td>₹8,800</td>
                <td>
                  <button>Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CardCustomer;
