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
    title: "Quotation System",
    link: "quotation-system",
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
    title: "Add Product",
    link: "add-product",
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
