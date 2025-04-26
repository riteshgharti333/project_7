import "./Report.scss";
import { Link, useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronDown, ChevronRight } from "lucide-react";
import { useState, useMemo } from "react";
import { reportData } from "../../assets/data";

import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
} from "@tanstack/react-table";

const reportTableData = [
  {
    id: "1",
    name: "Amit Sharma",
    reportType: "Sales",
    date: "2024-04-22T10:00:00Z",
    status: "Completed",
  },
  {
    id: "2",
    name: "Sara Khan",
    reportType: "Purchase",
    date: "2024-04-20T12:30:00Z",
    status: "Pending",
  },
  {
    id: "3",
    name: "Rohit Verma",
    reportType: "Inventory",
    date: "2024-04-19T14:15:00Z",
    status: "Draft",
  },
];

const Report = () => {
  const navigate = useNavigate();
  const [openIndex, setOpenIndex] = useState(null);

  const toggleMenu = (index) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: "name",
        header: "Name",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "reportType",
        header: "Report Type",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: (info) => {
          const value = info.getValue();
          const color =
            value === "Completed"
              ? "green"
              : value === "Pending"
              ? "#f39c12"
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
        accessorKey: "date",
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
    data: reportTableData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="report">
      <div className="report-top">
        <Link onClick={() => navigate(-1)} className="report-top-left">
          <ChevronLeft size={30} />
          <h3>Reports</h3>
        </Link>
      </div>

      <div className="report-content">
        {/* Sidebar */}
        <div className="report-content-sidebar">
          {reportData.map((menu, index) => (
            <div key={index} className="sidebar-group">
              <div className="sidebar-item" onClick={() => toggleMenu(index)}>
                <span>{menu.title}</span>
                {openIndex === index ? (
                  <ChevronDown size={18} />
                ) : (
                  <ChevronRight size={18} />
                )}
              </div>
              <div
                className={`sidebar-subitems ${
                  openIndex === index ? "open" : ""
                }`}
              >
                {menu.subItems.map((sub, i) => (
                  <p key={i}>{sub}</p>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Right Content */}
        <div className="report-content-right">
          <div className="report-table">
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
          </div>
        </div>

      </div>
    </div>
  );
};

export default Report;
