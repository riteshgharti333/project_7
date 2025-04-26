import "./Product.scss";

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
import NewProduct from "../../../components/NewProduct/NewProduct";
import CardProduct from "../../../components/CardProduct/CardProduct";

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
    _id: "101",
    itemName: "Notebook",
    quantity: 3,
    sellingPrice: 120,
    total: 3 * 120, // ₹360
  },
  {
    _id: "102",
    itemName: "Ball Pen",
    quantity: 10,
    sellingPrice: 15,
    total: 10 * 15, // ₹150
  },
  {
    _id: "103",
    itemName: "Water Bottle",
    quantity: 2,
    sellingPrice: 250,
    total: 2 * 250, // ₹500
  },
  {
    _id: "104",
    itemName: "Backpack",
    quantity: 1,
    sellingPrice: 1500,
    total: 1 * 1500, // ₹1500
  },
];

const Product = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState("All");

  const [openProduct, setOpenProduct] = useState(false);

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
        accessorKey: "itemName",
        header: "Item",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "quantity",
        header: "Quantity",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "sellingPrice",
        header: "Selling Price",
        cell: (info) => `₹${info.getValue()}`,
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
    setOpenCardProduct(true);
    setSelectedInvoice(customer);
  };

  const [openCardProduct, setOpenCardProduct] = useState(false);

  return (
    <div className="product">
      {openProduct && <NewProduct setOpenProduct={setOpenProduct} />}

      {openCardProduct && (
        <CardProduct setOpenCardProduct={setOpenCardProduct} />
      )}
      <div className="product-top">
        <h1>Product</h1>
        <button className="primary-btn" onClick={() => setOpenProduct(true)}>
          <Plus size={20} /> Add Item
        </button>
      </div>

      <div className="product-content">
        <div className="product-content-items">
          <span className="active-filter">All Items</span>
        </div>
        {/* 
        <div className="product-content-inputs">
          <div className="product-content-inputs-search">
            <Search className="search-icon" />
            <input type="search" placeholder="search by customer..." />
          </div>
          <div className="product-content-inputs-week">
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

        <div className="product-pagination">
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

export default Product;
