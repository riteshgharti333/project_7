import "./NewCustomer.scss";

import { RxCross2 } from "react-icons/rx";
import { ArrowRight, CirclePlus } from "lucide-react";
import { useState } from "react";
import NewAdd from "../NewAdd/NewAdd";

const NewCustomer = ({ setOpenCustomer }) => {
  const handleClose = () => {
    setOpenCustomer(false);
  };

  const [openAdd, setOpenAdd] = useState(false);

  return (
    <div className="newCustomer">
      {openAdd && <NewAdd setOpenAdd={setOpenAdd} />}

      <div className="newCustomer-container">
        <div className="newCustomer-top">
          <div className="newCustomer-top-left">
            <RxCross2 className="cross-icon" onClick={handleClose} />
            <h2>Add Customer</h2>
          </div>

          <button className="primary-btn" onClick={handleClose}>
            Save <ArrowRight size={20} />
          </button>
        </div>

        <div className="newCustomer-form">
          <p>Basic Details</p>
          <form action="">
            <div className="form-group">
              <label htmlFor="">
                <span>*</span>Name
              </label>
              <input type="text" name="" id="" placeholder="name..." />
            </div>
            <div className="form-group">
              <label htmlFor="">Phone</label>
              <input
                type="number"
                name=""
                id=""
                placeholder="phone number..."
              />
            </div>

            <div className="form-group">
              <label htmlFor="">Email</label>
              <input type="mail" name="" id="" placeholder="email..." />
            </div>

            <div className="form-group">
              <p>Company Details (Optional)</p>
              <label htmlFor="">GSTIN</label>
              <input type="text" name="" id="" placeholder="DGG3JVV24KJVKJ41" />
            </div>

            <div className="form-group">
              <label htmlFor="">Company Name</label>
              <input type="text" name="" id="" placeholder="company name..." />
            </div>

            <div className="form-group">
              <label htmlFor="">Billing Address</label>
              <span className="address" onClick={() => setOpenAdd(true)}>
                {" "}
                <CirclePlus /> Billing Address
              </span>
            </div>
            <div className="form-group">
              <label htmlFor="">Shipping Address</label>
              <span className="address">
                {" "}
                <CirclePlus /> Billing Address
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewCustomer;
