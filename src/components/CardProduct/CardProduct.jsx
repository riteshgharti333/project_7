import "./CardProduct.scss";

import { RxCross2 } from "react-icons/rx";
import { ArrowRight, CirclePlus } from "lucide-react";

const CardProduct = ({ setOpenCardProduct }) => {
  const handleClose = () => {
    setOpenCardProduct(false);
  };

  return (
    <div className="cardProduct">
      <div className="cardProduct-container">
        <div className="cardProduct-top">
          <div className="cardProduct-top-left">
            <RxCross2
              className="cross-icon"
              onClick={handleClose} // Cross icon click
            />
            <h2>Product Name</h2>
          </div>

          {/* <button className="primary-btn" onClick={handleClose}>
            Save & Update <ArrowRight size={20} />
          </button> */}
        </div>

        <div className="cardProduct-desc">
          <p className="details">Details</p>

          <div className="cardProduct-content">
            <div className="cardProduct-content-left">
              <div className="cardProduct-content-left-item2">
                <div className="cardProduct-content-left-item2-item">
                  <p>
                    Date <span>24-04-2025</span>
                  </p>
                  <p>
                    Due Date <span>24-04-2025</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="cardProduct-price">
          <div className="cardProduct-price-item">
            <p>Price</p>
            <span>₹100</span>
          </div>
          <div className="cardProduct-price-item">
            <p>Sale Amount</p>
            <span>₹100</span>
          </div>
          <div className="cardProduct-price-item">
            <p>Total Discount</p>
            <span>₹100</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardProduct;
