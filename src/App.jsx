import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Dashboard from "./pages/Dashboard/Dashboard";
import Invoice from "./pages/Services/Invoice/Invoice";
import NewInvoice from "./pages/NewPages/NewInvoice/NewInvoice";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/invoice" element={<Invoice />} />
          </Route>
          <Route path="/new-invoice" element={<NewInvoice />} />
          
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
