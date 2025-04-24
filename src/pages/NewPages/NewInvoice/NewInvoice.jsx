import "./NewInvoice.scss";

import { useEffect, useRef, useState } from "react";
import { tableData } from "../../../assets/data";

import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  CirclePlus,
  PackageSearch,
  Search,
  Trash,
} from "lucide-react";
import { BsBank2 } from "react-icons/bs";
import { FaPencilAlt } from "react-icons/fa";
import NewCustomer from "../../../components/NewCustomer/NewCustomer";
import NewProduct from "../../../components/NewProduct/NewProduct";
import NewBank from "../../../components/NewBank/NewBank";
import NewSig from "../../../components/NewSig/NewSig";
import { Link, useNavigate } from "react-router-dom";

const NewInvoice = () => {
  const [openDelete, setOpenDelete] = useState(false);

  const cardRef = useRef(null);

  const [openCustomer, setOpenCustomer] = useState(false);
  const [openProduct, setOpenProduct] = useState(false);
  const [openBank, setOpenBank] = useState(false);
  const [openSig, setOpensig] = useState(false);

  const [showNotes, setShowNotes] = useState(false);
  const [showTerms, setShowTerms] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cardRef.current && !cardRef.current.contains(event.target)) {
        setOpenDelete(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openDelete]);

  const DelteCard = () => {
    return (
      <div className="delete-card">
        <div className="delete-card-desc" ref={cardRef}>
          <p>Are you sure to delete this ?</p>

          <div className="delete-card-btn">
            <button
              className="primary-btn"
              onClick={() => setOpenDelete(!openDelete)}
            >
              Close
            </button>
            <button className="delete-btn ">Delete</button>
          </div>
        </div>
      </div>
    );
  };

  const navigate = useNavigate();

  return (
    <div className="newInvoice">
      {openCustomer && <NewCustomer setOpenCustomer={setOpenCustomer} />}

      {openProduct && <NewProduct setOpenProduct={setOpenProduct} />}

      {openBank && <NewBank setOpenBank={setOpenBank} />}

      {openSig && <NewSig setOpensig={setOpensig} />}

      <div className="newInvoice-top">
        <Link onClick={() => navigate(-1)} className="newInvoice-top-left">
          <ChevronLeft size={30} />
          <h3>Create Invoice</h3>
        </Link>

        <div className="newInvoice-top-right">
          <button className="primary-btn">Save as draft</button>
          <button className="primary-btn">
            Save <ArrowRight size={20} />
          </button>
        </div>
      </div>
      <div className="newInvoice-customer">
        <div className="newInvoice-customer-left">
          <div className="newInvoice-customer-left-top">
            <span>Customer Details</span>
            <span onClick={() => setOpenCustomer(true)}>
              <CirclePlus className="plus-icon" />
              Add new Customer?
            </span>
          </div>

          <div className="customer-detail">
            <span>Select Customer</span>

            <div className="customer-detail-search">
              <Search className="search-icon" />
              <input
                type="search"
                name=""
                id=""
                placeholder="select your customer..."
              />
            </div>
          </div>
        </div>

        <div className="newInvoice-customer-right">
          <div className="newInvoice-customer-right-top">
            <span>Other Details</span>
          </div>

          <div className="newInvoice-customer-right-items">
            <div className="newInvoice-customer-right-item">
              <span>Invoice Date</span>
              <input type="date" name="" id="" />
            </div>
            <div className="newInvoice-customer-right-item">
              <span>Due Date</span>
              <input type="date" name="" id="" />
            </div>{" "}
            <div className="newInvoice-customer-right-item">
              <span>Reference</span>
              <input type="search" name="" id="" placeholder="referecnce...." />
            </div>
          </div>
        </div>
      </div>

      <div className="newInvoice-product">
        <div className="newInvoice-product-top">
          <span>Product & Services</span>
          <span onClick={() => setOpenProduct(true)}>
            <CirclePlus className="plus-icon" />
            Add new Product?
          </span>
        </div>

        <div className="newInvoice-product-content">
          <div className="newInvoice-product-content-top">
            <div className="newInvoice-product-content-top-item search-input">
              <Search className="search-icon" />
              <input
                type="search"
                placeholder="search or scan for existing products...."
              />
            </div>

            <div className="newInvoice-product-content-top-item">
              <input type="number" placeholder="Qyt" />
            </div>

            <div className="newInvoice-product-content-top-item">
              <button className="primary-btn">
                <CirclePlus className="plus-icon" /> Add to Bill
              </button>
            </div>
          </div>

          <div className="newInvoice-products-table">
            {/* {tableData.map((item, index) => (
              <div className="newInvoice-products-table-items">
                <div className="newInvoice-products-table-item">
                  <p>Product Name</p>
                  <p className="product-item">
                    {" "}
                    <Trash
                      className="trash-icon"
                      onClick={() => setOpenDelete(!openDelete)}
                    />{" "}
                    {item.item_name}
                  </p>
                </div>
                <div className="newInvoice-products-table-item">
                  <p>Quantity</p>
                  <input
                    className="product-item"
                    type="number"
                    name=""
                    id=""
                    placeholder="qyt"
                  />
                </div>
                <div className="newInvoice-products-table-item">
                  <p>Unit Price</p>
                  <input
                    className="product-item"
                    type="number"
                    name=""
                    id=""
                    placeholder="unit price"
                  />
                </div>
                <div className="newInvoice-products-table-item">
                  <p>Discount on</p>
                  <input
                    className="product-item"
                    type="number"
                    placeholder=""
                  />
                </div>

                <div className="newInvoice-products-table-item">
                  <p>Total Amount</p>
                  <p className="product-item">3000</p>
                </div>
              </div>
            ))} */}

            <div className="newInvoice-products-table-add">
              <PackageSearch className="table-icon" />
              <p>
                Search existing products to add to this list or add new product
                to get started! 🚀
              </p>
              <button
                className="primary-btn"
                onClick={() => setOpenProduct(true)}
              >
                <CirclePlus className="plus-icon" /> Add new Product
              </button>
            </div>
          </div>
        </div>

        <div className="product-summary">
          <div className="product-summary-left">
            <span>Note, Terms and more...</span>
            <div className="product-summary-left-item">
              <p onClick={() => setShowNotes(!showNotes)}>
                <ChevronRight className="right-icon" />
                Notes
              </p>

              {showNotes && (
                <textarea
                  name=""
                  id=""
                  placeholder="add business note..."
                ></textarea>
              )}
            </div>
            <div className="product-summary-left-item">
              <p onClick={() => setShowTerms(!showTerms)}>
                <ChevronRight className="right-icon" /> Terms & Condintion
              </p>
              {showTerms && (
                <textarea
                  name=""
                  id=""
                  placeholder="add term and condition"
                ></textarea>
              )}
            </div>
          </div>

          <div className="product-summary-right">
            <div className="product-summary-amount">
              <div></div>
              <div className="total-amount">
                <div className="total-amount-top">
                  <span>Extra Discount</span>
                  <input type="text" name="" id="" placeholder="%" />
                </div>

                <div className="total-amount-money">
                  <div className="total-amount-money-item">
                    <span>Taxable Amount </span>
                    <span>₹0.00</span>
                  </div>

                  <div className="total-amount-money-item">
                    <span>Round Off </span>
                    <span>0.00</span>
                  </div>

                  <div className="total-amount-money-item big-amount">
                    <span> Total Amount </span>
                    <span>₹0.00</span>
                  </div>
                  <div className="total-amount-money-item">
                    <span>Total Discount </span>
                    <span>₹0.00</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="product-summary-bank">
              <span>Select Bank</span>

              <button onClick={() => setOpenBank(true)}>
                <BsBank2 /> Add Bank to Invoice (Optional)
              </button>
            </div>

            <div className="product-summary-paid">
              <div className="product-summary-paid-top">
                <span>Add payment (Payment Notes, Amount and Mode)</span>

                <div className="fully-paid">
                  <input type="checkbox" name="" id="" />
                  <span>Mark as fully paid</span>
                </div>
              </div>

              <div className="product-summary-paid-items">
                <div className="product-summary-paid-item">
                  <span>Notes</span>
                  <input type="text" name="" id="" placeholder="notes..." />
                </div>

                <div className="product-summary-paid-item">
                  <span>Amount</span>
                  <input type="number" name="" id="" />
                </div>

                <div className="product-summary-paid-item">
                  <span>Payment Mode</span>
                  <select name="" id="">
                    <option value="">UPI</option>
                    <option value="">Cash</option>
                    <option value="">Net Banking</option>
                    <option value="">EMI</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="product-summary-sig">
              <span>Select Signature</span>

              <button onClick={() => setOpensig(true)}>
                <FaPencilAlt /> Add Signature to Invoice (Optional)
              </button>
            </div>

            <div className="product-summary-btn">
              <button className="primary-btn">Save and Print</button>
              <button className="primary-btn">
                Save <ArrowRight className="right-arrow" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {openDelete && <DelteCard />}
    </div>
  );
};

export default NewInvoice;
