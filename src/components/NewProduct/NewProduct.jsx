import "./NewProduct.scss";

import { RxCross2 } from "react-icons/rx";
import { ArrowRight, CirclePlus } from "lucide-react";

const NewProduct = ({ setOpenProduct }) => {
  const handleClose = () => {
    setOpenProduct(false);
  };

  return (
    <div className="newProduct">
      <div className="newProduct-container">
        <div className="newProduct-top">
          <div className="newProduct-top-left">
            <RxCross2
              className="cross-icon"
              onClick={handleClose} // Cross icon click
            />
            <h2>Add Product</h2>
          </div>

          <button className="primary-btn" onClick={handleClose}>
            Save Product <ArrowRight size={20} />
          </button>
        </div>

        <div className="newProduct-form">
          <p>Basic Details</p>
          <form action="">
            <div className="form-group">
              <label htmlFor="">
                <span>*</span>Name
              </label>
              <input type="text" name="" id="" placeholder="item name..." />
            </div>
            <div className="form-group">
              <label htmlFor="">Selling Price</label>
              <input
                type="number"
                name=""
                id=""
                placeholder="selling price..."
              />
            </div>

            <div className="form-group">
              <label htmlFor="">Pimary Unit</label>
              <input type="number" name="" id="" placeholder="unit..." />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewProduct;
