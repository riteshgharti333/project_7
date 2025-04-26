import {
  BadgePercent,
  ClipboardList,
  LayoutDashboard,
  MonitorCog,
  Receipt,
  ReceiptText,
  ShoppingCart,
  UsersRound,
} from "lucide-react";

export const sidebarItems = [
  {
    icon: LayoutDashboard,
    title: "Dashboard",
    link: "",
  },
  {
    icon: ReceiptText,
    title: "Invoice",
    link: "invoice",
  },

  {
    icon: Receipt,
    title: "Billing",
    link: "billing",
  },

  {
    icon: MonitorCog,
    title: "Quotation",
    link: "quotation",
  },
  {
    icon: UsersRound,
    title: "Customer",
    link: "customer",
  },

  {
    icon: ClipboardList,
    title: "Report",
    link: "report",
  },
  {
    icon: ShoppingCart,
    title: "Product",
    link: "product",
  },
  {
    icon: BadgePercent,
    title: "Discount ",
    link: "discount",
  },
];

//////////////// table Data

export const tableData = [
  {
    item_name: "Apple Box",
    item_qt: "2",
    item_unit_price: "2000",
  },
];





export const reportData = [
  {
    title: "Import Data",
    subItems: ["Sales", "Purchases", "Expenses"],
  },
  {
    title: "Export Data",
    subItems: ["Invoices", "Product List", "Transactions"],
  },
  {
    title: "Sales Report",
    subItems: ["Daily Sales", "Monthly Sales", "Customer Wise"],
  },
  {
    title: "Purchase Report",
    subItems: ["Vendor Wise", "Monthly Purchase", "GST Summary"],
  },
  {
    title: "Stock Report",
    subItems: ["Current Stock", "Low Stock", "Expired Stock"],
  },
  {
    title: "Tax Report",
    subItems: ["GST", "TDS", "VAT"],
  },
  {
    title: "Employee Report",
    subItems: ["Attendance", "Salary", "Performance"],
  },
  {
    title: "Customer Report",
    subItems: ["Top Customers", "Feedback", "Returns"],
  },
  {
    title: "Financial Report",
    subItems: ["Profit & Loss", "Balance Sheet", "Cash Flow"],
  },
  {
    title: "Activity Logs",
    subItems: ["Login Logs", "Action Logs", "Error Logs"],
  },
];
