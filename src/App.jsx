import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Toaster } from "sonner";

import Layout from "./components/Layout/Layout";
import Dashboard from "./pages/Dashboard/Dashboard";
import Invoice from "./pages/Services/Invoice/Invoice";

import NewInvoice from "./pages/NewPages/NewInvoice/NewInvoice";
import NewQuotation from "./pages/NewPages/NewQuotation/NewQuotation";

import Customer from "./pages/Services/Customer/Customer";
import Product from "./pages/Services/Product/Product";
import Quotation from "./pages/Services/Quotation/Quotation";
import Report from "./pages/Report/Report";
import Billing from "./pages/Services/Billing/Billing";
import PDF from "./components/PDF/PDF";
import SmPDF from "./pages/SmPDF/SmPDF";
import DownloadPDF from "./components/DownloadPDF/DownloadPDF";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Toaster position="top-center" richColors />
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/invoice" element={<Invoice />} />
            <Route path="/customer" element={<Customer />} />
            <Route path="/product" element={<Product />} />
            <Route path="/quotation" element={<Quotation />} />
            <Route path="/billing" element={<Billing />} />
            <Route path="/download-pdf" element={<DownloadPDF />} />
          </Route>
          <Route path="/new-invoice" element={<NewInvoice />} />
          <Route path="/new-quotation" element={<NewQuotation />} />
          <Route path="/report" element={<Report />} />
          <Route path="/invoice/:id" element={<PDF />} />
          <Route path="/sm-pdf" element={<SmPDF />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
