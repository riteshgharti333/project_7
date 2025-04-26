import "./Customer.scss";

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
import NewCustomer from "../../../components/NewCustomer/NewCustomer";
import CardCustomer from "../../../components/CardCustomer/CardCustomer";

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
    phoneNumber: "9876543210",
    balance: "₹4,200",
    createdAt: "2024-04-20T12:30:00Z",
  },
  {
    _id: "1",
    name: "Amit Sharma",
    phoneNumber: "9876543210",
    balance: "₹4,200",
    createdAt: "2024-04-20T12:30:00Z",
  },
  {
    _id: "1",
    name: "Amit Sharma",
    phoneNumber: "9876543210",
    balance: "₹4,200",
    createdAt: "2024-04-20T12:30:00Z",
  },
  {
    _id: "1",
    name: "Amit Sharma",
    phoneNumber: "9876543210",
    balance: "₹4,200",
    createdAt: "2024-04-20T12:30:00Z",
  },
  {
    _id: "1",
    name: "Amit Sharma",
    phoneNumber: "9876543210",
    balance: "₹4,200",
    createdAt: "2024-04-20T12:30:00Z",
  },
];

const Customer = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState("All");

    const [openCustomerCard , setOpenCustomerCard] = useState(false);

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
        accessorKey: "name",
        header: "Name",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "phoneNumber",
        header: "Phone Number",
        cell: (info) => info.getValue(),
      },

      {
        accessorKey: "balance",
        header: "Closing Balance",
        cell: (info) => info.getValue(),
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

  const handleRowClick = (customer) => {
    setOpenCustomerCard(true);
    setSelectedInvoice(customer);

  };

  const [openCustomer, setOpenCustomer] = useState(false);

  return (
    <div className="customer">
      {openCustomer && <NewCustomer setOpenCustomer={setOpenCustomer} />}

      {openCustomerCard && <CardCustomer setOpenCustomerCard={setOpenCustomerCard} />}
      <div className="customer-top">
        <h1>Customers</h1>
        <button className="primary-btn" onClick={() => setOpenCustomer(true)}>
          <Plus size={20} /> New Customer
        </button>
      </div>

      <div className="customer-content">
        <div className="customer-content-items">
          <span className="active-filter">All Customers</span>
        </div>
        {/* 
        <div className="customer-content-inputs">
          <div className="customer-content-inputs-search">
            <Search className="search-icon" />
            <input type="search" placeholder="search by customer..." />
          </div>
          <div className="customer-content-inputs-week">
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
        </div> */}
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

        <div className="table-bottom">
          <div className="table-bottom-desc">
            <div className="table-bottom-desc-item">
              <span>You Pay</span>
              <span>₹0.00</span>
            </div>
            <div className="table-bottom-desc-item">
              <span>Your Collect</span>
              <span>₹0.00</span>
            </div>
          </div>

          <div className="customer-pagination">
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
    </div>
  );
};

export default Customer;
