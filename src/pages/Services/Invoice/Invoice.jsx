import "./Invoice.scss";

import { Plus, Search } from "lucide-react";
import { IoIosArrowDown } from "react-icons/io";
import Select from "react-select";
import { Link, useNavigate } from "react-router-dom";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";
import { useEffect, useMemo, useState } from "react";
import CardInvoice from "../../../components/CardInvoice/CardInvoice";

import axios from "axios";
import { baseUrl } from "../../../main";
import PDF from "../../../components/PDF/PDF";
import { PDFViewer } from "@react-pdf/renderer";

const weekOptions = [
  { value: "today", label: "Today" },
  { value: "this_week", label: "This Week" },
  { value: "last_week", label: "Last Week" },
  { value: "this_month", label: "This Month" },
  { value: "last_month", label: "Last Month" },
  { value: "last_year", label: "Last Year" }, // Added Last Year option
];

const customStyles = {
  control: (base) => ({
    ...base,
    borderRadius: "5px",
    padding: "2px 4px",
    borderColor: "#ccc",
    boxShadow: "none",
    cursor: "pointer",
    fontSize: "14px",
  }),
  dropdownIndicator: (base) => ({
    ...base,
    padding: "0",
  }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isSelected
      ? "#007bff"
      : state.isFocused
      ? "#e6f0ff"
      : "#fff",
    color: state.isSelected ? "#fff" : "#333",
    padding: "8px 12px",
  }),
};

const Invoice = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState("All");

  const [openInvoiceCard, setOpenInvoiceCard] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  const [selectedRange, setSelectedRange] = useState(weekOptions[5]); // Default set to "Last Year"

  const [openPdf, setOpenPdf] = useState(false);

  /////////////////////////

  const [invoiceData, setInvoiceData] = useState();

  useEffect(() => {
    const getAllInvoice = async () => {
      try {
        const { data } = await axios.get(`${baseUrl}/invoice/all-invoices`);
        if (data && data.invoices) {
          console.log(data);
          setInvoiceData(data.invoices);
        }
      } catch (error) {
        console.error("Error fetching invoices:", error);
      }
    };
    getAllInvoice();
  }, []);

  const handleWeekChange = (option) => {
    setSelectedRange(option);
    console.log("Filter by:", option.value);
  };

  const filteredData = useMemo(() => {
    if (!invoiceData) return [];
    if (activeFilter === "All") return invoiceData;
    return invoiceData.filter((item) => {
      const payment = item.payments?.[0];
      const paymentStatus = payment
        ? payment.isFullyPaid
          ? "Paid"
          : "Pending"
        : "Pending";
      return paymentStatus === activeFilter;
    });
  }, [activeFilter, invoiceData]);

  const columns = useMemo(
    () => [
      {
        accessorKey: "totalAmount",
        header: "Amount",
        cell: (info) => {
          const products = info.row.original.products;
          const total = products.reduce(
            (acc, curr) => acc + curr.totalAmount,
            0
          );
          return `₹${total}`;
        },
      },
      {
        accessorKey: "_id",
        header: "Bill No",
        cell: (info) => info.getValue().slice(-6).toUpperCase(), // last 6 chars of ID
      },
      {
        accessorKey: "customer.name",
        header: "Name",
        cell: (info) => info.row.original.customer?.name || "N/A",
      },
      {
        header: "Payment Mode",
        cell: (info) => info.row.original.payments?.[0]?.mode || "N/A",
      },
      {
        accessorKey: "status", // Assuming you're using "status" in your row data
        header: "Status",
        cell: (info) => {
          const value = info.getValue(); // Get the status value

          // If status is not defined, determine it based on payment data
          const payment = info.row.original.payments?.[0]; // Get the first payment
          const paymentStatus = payment
            ? payment.isFullyPaid
              ? "Paid"
              : "Pending"
            : "Pending"; // Default to "Pending" if no payments are available

          // Set color based on the payment status
          const color =
            paymentStatus === "Paid"
              ? "green"
              : paymentStatus === "Pending"
              ? "#f39c12"
              : paymentStatus === "Cancelled"
              ? "red"
              : "gray";

          return (
            <span style={{ color, fontWeight: 600 }}>{paymentStatus}</span>
          );
        },
      },
      {
        accessorKey: "invoiceDate",
        header: "Date",
        cell: (info) => {
          const date = new Date(info.getValue());
          return date.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          });
        },
      },
      {
        header: "View",
        cell: (info) => {
          return (
            <div className="view-section">
              <span
                onClick={() => {
                  setOpenInvoiceCard(true);
                  setSelectedInvoice(info.row.original);
                }}
                className="view-link"
              >
                Invoice
              </span>
              <br />
              <Link
                to={`/invoice/${info.row.original._id}`}
                className="view-link"
              >
                View
              </Link>
            </div>
          );
        },
      },
    ],
    []
  );

  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 7,
      },
    },
  });

  const handleRowClick = (invoice) => {
    console.log("Row clicked:", invoice);

    setSelectedInvoice(invoice);
    setOpenInvoiceCard(true);
  };

  return (
    <div className="invoice">

      {openInvoiceCard && (
        <CardInvoice
          setOpenInvoiceCard={setOpenInvoiceCard}
          onClose={() => setOpenInvoiceCard(false)}
          title="Invoice"
          dateName="Invoice"
        />
      )}

      <div className="invoice-top">
        <h1>Invoice</h1>
        <Link className="primary-btn" to={"/new-invoice"}>
          <Plus size={20} /> Create Invoice
        </Link>
      </div>

      <div className="invoice-content">
        <div className="invoice-content-items">
          {[
            "All",
            ...["Pending", "Paid"].map(
              (status) =>
                status === "Paid"
                  ? "Paid" // If isFullyPaid = true, show Paid
                  : "Pending" // If isFullyPaid = false, show Pending
            ),
          ].map((filter) => (
            <span
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={activeFilter === filter ? "active-filter" : ""}
            >
              {filter === "All" ? "All Transactions" : filter}
            </span>
          ))}
        </div>

        <div className="invoice-content-inputs">
          <div className="invoice-content-inputs-search">
            <Search className="search-icon" />
            <input type="search" placeholder="search by customer..." />
          </div>
          <div className="invoice-content-inputs-week">
            <Select
              options={weekOptions}
              value={selectedRange}
              onChange={handleWeekChange}
              styles={customStyles}
              isSearchable={false}
              components={{
                DropdownIndicator: () => (
                  <IoIosArrowDown size={18} color="#555" />
                ),
              }}
            />
          </div>
        </div>
      </div>

      <div className="table">
        <table>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                    {header.column.getIsSorted() === "asc"
                      ? " 🔼"
                      : header.column.getIsSorted() === "desc"
                      ? " 🔽"
                      : ""}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                // onClick={() => handleRowClick(row.original)}
                style={{ cursor: "pointer" }}
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

        <div className="pagination">
          <button
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            First
          </button>
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            ◀ Prev
          </button>
          <span className="page">
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </span>
          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next ▶
          </button>
          <button
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            Last
          </button>
        </div>
      </div>
    </div>
  );
};

export default Invoice;
