import "./Quotation.scss";

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
import { useMemo, useState } from "react";
import CardInvoice from "../../../components/CardInvoice/CardInvoice";

const weekOptions = [
  { value: "today", label: "Today" },
  { value: "this_week", label: "This Week" },
  { value: "last_week", label: "Last Week" },
  { value: "this_month", label: "This Month" },
  { value: "last_month", label: "Last Month" },
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

const data = [
  {
    _id: "1",
    name: "Amit Sharma",
    email: "amit@example.com",
    phoneNumber: "9876543210",
    createdAt: "2024-04-22T10:00:00Z",
    amount: "₹4,200",
    mode: "UPI",
    status: "Paid",
    billNo: "INV-1001",
  },
  {
    _id: "2",
    name: "Sara Khan",
    email: "sara.khan@example.com",
    phoneNumber: "9812345678",
    createdAt: "2024-04-20T12:30:00Z",
    amount: "₹2,500",
    mode: "Cash",
    status: "Pending",
    billNo: "INV-1002",
  },
  {
    _id: "3",
    name: "Rohit Verma",
    email: "rohit.verma@example.com",
    phoneNumber: "9123456780",
    createdAt: "2024-04-19T14:15:00Z",
    amount: "₹1,850",
    mode: "Card",
    status: "Cancelled",
    billNo: "INV-1003",
  },
  {
    _id: "4",
    name: "Nikita Joshi",
    email: "nikita.j@example.com",
    phoneNumber: "9012345678",
    createdAt: "2024-04-18T08:45:00Z",
    amount: "₹3,600",
    mode: "UPI",
    status: "Paid",
    billNo: "INV-1004",
  },
  {
    _id: "5",
    name: "Manoj Mehta",
    email: "manoj.m@example.com",
    phoneNumber: "9998887777",
    createdAt: "2024-04-16T11:20:00Z",
    amount: "₹5,000",
    mode: "Bank Transfer",
    status: "Draft",
    billNo: "INV-1005",
  },
];

const Quotation = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState("All");

  const [openInvoiceCard, setOpenInvoiceCard] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  const [selectedRange, setSelectedRange] = useState(weekOptions[1]); // default to "This Week"

  const handleWeekChange = (option) => {
    setSelectedRange(option);
    // Optional: apply filtering logic here
    console.log("Filter by:", option.value);
  };

  const filteredData = useMemo(() => {
    if (activeFilter === "All") return data;
    return data.filter((item) => item.status === activeFilter);
  }, [activeFilter]);

  const columns = useMemo(
    () => [
      {
        accessorKey: "amount",
        header: "Amount",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "billNo",
        header: "Bill No",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "name",
        header: "Name",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "mode",
        header: "Payment Mode",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: (info) => {
          const value = info.getValue();
          const color =
            value === "Paid"
              ? "green"
              : value === "Pending"
              ? "#f39c12"
              : value === "Cancelled"
              ? "red"
              : "gray";
          return (
            <span
              style={{
                color,
                fontWeight: 600,
              }}
            >
              {value}
            </span>
          );
        },
      },
      {
        accessorKey: "createdAt",
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
          title="Quotation"
          dateName="Quotation"
        />
      )}

      <div className="invoice-top">
        <h1>Quotations</h1>
        <Link className="primary-btn" to={"/new-quotation"}>
          <Plus size={20} /> Create Quotation
        </Link>
      </div>

      <div className="invoice-content">
        <div className="invoice-content-items">
          {["All", "Open", "Closed"].map((filter) => (
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
                onClick={() => handleRowClick(row.original)}
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

export default Quotation;
