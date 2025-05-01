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
  getFilteredRowModel,
} from "@tanstack/react-table";
import { useEffect, useMemo, useState } from "react";
import CardInvoice from "../../../components/CardInvoice/CardInvoice";
import axios from "axios";
import { baseUrl } from "../../../main";

const weekOptions = [
  { value: "today", label: "Today" },
  { value: "this_week", label: "This Week" },
  { value: "last_week", label: "Last Week" },
  { value: "this_month", label: "This Month" },
  { value: "last_month", label: "Last Month" },
  { value: "last_year", label: "Last Year" },
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

const Quotation = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState("All");
  const [openInvoiceCard, setOpenInvoiceCard] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [selectedRange, setSelectedRange] = useState(weekOptions[5]);
  const [invoiceData, setInvoiceData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const getAllInvoice = async () => {
      try {
        const { data } = await axios.get(`${baseUrl}/quotation/all-quotations`);
        if (data && data.quotation) {
          setInvoiceData(data.quotation);
        }
      } catch (error) {
        console.error("Error fetching quotation:", error);
      }
    };
    getAllInvoice();
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleWeekChange = (option) => {
    setSelectedRange(option);
  };

  const filteredData = useMemo(() => {
    let result = invoiceData;

    // Apply status filter
    if (activeFilter !== "All") {
      result = result.filter((item) => {
        const payment = item.payments?.[0];
        const paymentStatus = payment
          ? payment.isFullyPaid
            ? "Paid"
            : "Pending"
          : "Pending";
        return paymentStatus === activeFilter;
      });
    }

    // Apply search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter((invoice) => {
        return (
          invoice.customer?.name?.toLowerCase().includes(query) ||
          invoice._id.toLowerCase().includes(query) ||
          invoice.payments?.[0]?.mode?.toLowerCase().includes(query) ||
          invoice.totalAmount.toString().includes(query)
        );
      });
    }

    // Apply date range filter
    if (selectedRange) {
      const now = new Date();
      let startDate = new Date();

      switch (selectedRange.value) {
        case "today":
          startDate.setHours(0, 0, 0, 0);
          break;
        case "this_week":
          startDate.setDate(now.getDate() - now.getDay());
          break;
        case "last_week":
          startDate.setDate(now.getDate() - now.getDay() - 7);
          break;
        case "this_month":
          startDate.setDate(1);
          break;
        case "last_month":
          startDate.setMonth(now.getMonth() - 1);
          startDate.setDate(1);
          break;
        case "last_year":
          startDate.setFullYear(now.getFullYear() - 1);
          startDate.setMonth(0);
          startDate.setDate(1);
          break;
        default:
          return result;
      }

      result = result.filter((invoice) => {
        const invoiceDate = new Date(invoice.quotationDate);
        return invoiceDate >= startDate;
      });
    }

    return result;
  }, [activeFilter, invoiceData, searchQuery, selectedRange]);

  const columns = useMemo(
    () => [
      {
        accessorKey: "totalAmount",
        header: "Amount",
        cell: (info) => `₹${info.getValue()}`,
      },
      {
        accessorKey: "_id",
        header: "Bill No",
        cell: (info) => info.getValue().slice(-6).toUpperCase(),
      },
      {
        accessorKey: "customer.name",
        header: "Customer Name",
        cell: (info) => info.row.original.customer?.name || "N/A",
      },
      {
        header: "Payment Mode",
        cell: (info) => info.row.original.payments?.[0]?.mode || "N/A",
      },
      {
        header: "Status",
        cell: (info) => {
          const payment = info.row.original.payments?.[0];
          const paymentStatus = payment
            ? payment.isFullyPaid
              ? "Paid"
              : "Pending"
            : "Pending";
          const color = paymentStatus === "Paid" ? "green" : "#f39c12";
          return (
            <span style={{ color, fontWeight: 600 }}>{paymentStatus}</span>
          );
        },
      },
      {
        accessorKey: "quotationDate",
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
        cell: (info) => (
          <div className="view-section">
            <span
              onClick={() => {
                setOpenInvoiceCard(true);
                setSelectedInvoice(info.row.original);
              }}
              className="view-link"
            >
              Quotation
            </span>
            <br />
            <Link
              to={`/quotation/${info.row.original._id}`}
              className="view-link"
            >
              View
            </Link>
          </div>
        ),
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
    getFilteredRowModel: getFilteredRowModel(),
    initialState: {
      pagination: {
        pageSize: 7,
      },
    },
  });

  return (
    <div className="invoice">
      {openInvoiceCard && (
        <CardInvoice
          setOpenInvoiceCard={setOpenInvoiceCard}
          onClose={() => setOpenInvoiceCard(false)}
          title="Quotation"
          dateName="Quotation"
          invoiceSmData={selectedInvoice}
        />
      )}

      <div className="invoice-top">
        <h1>Quotation</h1>
        <Link className="primary-btn" to={"/new-quotation"}>
          <Plus size={20} /> Create Quotation
        </Link>
      </div>

      <div className="invoice-content">
        <div className="invoice-content-items">
          {["All", "Pending", "Paid"].map((filter) => (
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
            <input
              type="search"
              placeholder="Search by customer, bill no, amount..."
              value={searchQuery}
              onChange={handleSearchChange}
            />
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
              <tr key={row.id}>
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
