import "./NewSig.scss";

import { RxCross2 } from "react-icons/rx";
import { ArrowRight, CirclePlus } from "lucide-react";
import { FaPlus } from "react-icons/fa";

const NewSig = ({ setOpensig }) => {
  const handleClose = () => {
    setOpensig(false);
  };

  return (
    <div className="newSig">
      <div className="newSig-container">
        <div className="newSig-top">
          <div className="newSig-top-left">
            <RxCross2
              className="cross-icon"
              onClick={handleClose} // Cross icon click
            />
            <h2>Signature Details</h2>
          </div>

          <button className="primary-btn" onClick={handleClose}>
            Save & Update <ArrowRight size={20} />
          </button>
        </div>

        <div className="newSig-form">
          <form action="">
            <div className="form-group">
              <label htmlFor="">
                <span>*</span>Signature Name
              </label>
              <input
                type="text"
                name=""
                id=""
                placeholder="signature name..."
              />
            </div>

            <div className="form-group">
              <label htmlFor="">
                <span>*</span> Upload
              </label>
              <div className="add-sig">
                <FaPlus />
                <p>Upload signature</p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewSig;
