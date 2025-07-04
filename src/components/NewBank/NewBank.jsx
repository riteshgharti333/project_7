import "./NewBank.scss";

import { RxCross2 } from "react-icons/rx";
import { ArrowRight, CirclePlus } from "lucide-react";
import { useState } from "react";
import axios from "axios";
import { baseUrl } from "../../main";
import { toast } from "sonner";
import LoadingButton from "../LoadingButton/LoadingButton";

const NewBank = ({ setOpenBank, handleBankData }) => {
  const handleClose = () => {
    setOpenBank(false);
  };

  const [isLoading, setIsLoading] = useState(false);
  const [confirmAccountNumber, setConfirmAccountNumber] = useState("");

  const [bankData, setBankData] = useState({
    accountHolderName: "",
    accountNumber: "",
    ifscCode: "",
    bankName: "",
    branchName: "",
    branchName: "",
    upiId: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBankData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    if (bankData.accountNumber !== confirmAccountNumber) {
      toast.error("Account numbers do not match");
      return;
    }

    setIsLoading(true);
    try {
      const { data } = await axios.post(`${baseUrl}/bank/new-bank`, bankData, {
        withCredentials: true,
      });

      if (data && data.bank) {
        toast.success(data.message);
        setOpenBank(false);
        handleBankData(data.bank);
      }
      handleClose();
    } catch (error) {
      console.error("Error saving bank account data", error);
      toast.error(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="newBank">
      <div className="newBank-container">
        <div className="newBank-top">
          <div className="newBank-top-left">
            <RxCross2 className="cross-icon" onClick={handleClose} />
            <h2>Bank Details</h2>
          </div>

          <LoadingButton isLoading={isLoading} onClick={handleSave}>
            Save <ArrowRight size={20} />
          </LoadingButton>
        </div>

        <div className="newBank-form">
          <form action="">
            <div className="form-group">
              <label htmlFor="">
                <span>*</span>Account Holder Name
              </label>
              <input
                type="text"
                name="accountHolderName"
                id=""
                placeholder="account holder name..."
                required
                value={bankData.accountHolderName}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="">
                <span>*</span>Account No
              </label>
              <input
                type="text"
                name="accountNumber"
                id=""
                placeholder="account no..."
                required
                value={bankData.accountNumber}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="">
                <span>*</span>Confirm Bank Account No
              </label>
              <input
                type="text"
                name="confirmAccountNumber"
                id=""
                placeholder="confirm bank account no..."
                required
                value={confirmAccountNumber}
                onChange={(e) => setConfirmAccountNumber(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="">
                <span>*</span>IFSC Code
              </label>
              <input
                type="text"
                name="ifscCode"
                id=""
                placeholder="IFSC code..."
                required
                value={bankData.ifscCode}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="">
                <span>*</span>Bank Name
              </label>
              <input
                type="text"
                name="bankName"
                id=""
                placeholder="bank name..."
                required
                value={bankData.bankName}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="">
                <span>*</span>Branch Name
              </label>
              <input
                type="text"
                name="branchName"
                id=""
                placeholder="branch name..."
                required
                value={bankData.branchName}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="">UPI</label>
              <input
                type="text"
                name="upiId"
                id=""
                placeholder="upi id..."
                value={bankData.upiId}
                onChange={handleInputChange}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewBank;
