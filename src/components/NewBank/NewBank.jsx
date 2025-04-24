import "./NewBank.scss";

import { RxCross2 } from "react-icons/rx";
import { ArrowRight, CirclePlus } from "lucide-react";

const NewBank = ({ setOpenBank }) => {
  const handleClose = () => {
    setOpenBank(false);
  };

  return (
    <div className="newBank">
      <div className="newBank-container">
        <div className="newBank-top">
          <div className="newBank-top-left">
            <RxCross2
              className="cross-icon"
              onClick={handleClose} // Cross icon click
            />
            <h2>Bank Details</h2>
          </div>

          <button className="primary-btn" onClick={handleClose}>
            Save & Update <ArrowRight size={20} />
          </button>
        </div>

        <div className="newBank-form">
          <form action="">
            <div className="form-group">
              <label htmlFor="">
                <span>*</span>Account No
              </label>
              <input type="text" name="" id="" placeholder="account no..." />
            </div>
            <div className="form-group">
              <label htmlFor="">
                <span>*</span>Confirm Bank Account No
              </label>
              <input
                type="text"
                name=""
                id=""
                placeholder="confirm bank account no..."
              />
            </div>
            <div className="form-group">
              <label htmlFor="">
                <span>*</span>IFSC Code
              </label>
              <input type="text" name="" id="" placeholder="IFSC code..." />
            </div>
            <div className="form-group">
              <label htmlFor="">
                <span>*</span>Bank Name
              </label>
              <input type="text" name="" id="" placeholder="bank name..." />
            </div>
            <div className="form-group">
              <label htmlFor="">
                <span>*</span>Branch Name
              </label>
              <input type="text" name="" id="" placeholder="branch name..." />
            </div>
            <div className="form-group">
              <label htmlFor="">
                UPI
              </label>
              <input type="text" name="" id="" placeholder="upi id..." />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewBank;
