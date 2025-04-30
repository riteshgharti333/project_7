import "./NewAdd.scss";

import { RxCross2 } from "react-icons/rx";
import { ArrowRight, CirclePlus } from "lucide-react";

const NewAdd = ({ setOpenAdd }) => {
  const handleClose = () => {
    setOpenAdd(false);
  };

  return (
    <div className="newAdd">
      <div className="newAdd-container">
        <div className="newAdd-top">
          <div className="newAdd-top-left">
            <RxCross2
              className="cross-icon"
              onClick={handleClose} // Cross icon click
            />
            <h2>Add Billing Address</h2>
          </div>

          <button className="primary-btn" onClick={handleClose}>
            Save & Update <ArrowRight size={20} />
          </button>
        </div>

        <div className="newAdd-form">
          <form action="">
            <div className="form-group">
              <label htmlFor="">Country</label>
              <input type="text" name="" id="" placeholder="India..." />
            </div>
            <div className="form-group">
              <label htmlFor="">
                <span>*</span>Address Line 1
              </label>
              <input type="text" name="" id="" placeholder="address line 1" />
            </div>
            {/* <div className="form-group">
              <label htmlFor="">
                <span>*</span>Address Line 2
              </label>
              <input type="text" name="" id="" placeholder="address line 2" />
            </div> */}
            <div className="form-group">
              <label htmlFor="">
                <span>*</span>Pincode
              </label>
              <input type="text" name="" id="" placeholder="pincode..." />
            </div>
            <div className="form-group">
              <label htmlFor="">
                <span>*</span>City
              </label>
              <input type="text" name="" id="" placeholder="city..." />
            </div>
            <div className="form-group">
              <label htmlFor="">State</label>
              <input type="text" name="" id="" placeholder="state..." />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewAdd;
