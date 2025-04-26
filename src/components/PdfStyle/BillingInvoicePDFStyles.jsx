// BillingInvoicePDFStyles.js
import { StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 11,
    fontFamily: "Helvetica",
    color: "#333",
    lineHeight: 1.6,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  
  logoContainer: {
    width: "30%",
  },
  
  logo: {
    width: 100,  // or adjust size you want
    height: "auto",
  },
  
  companyInfo: {
    width: "70%",
    textAlign: "right",
  },
  
  companyName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  
  contactInfo: {
    fontSize: 10,
    color: "#666",
  },
  
  titleSection: {
    textAlign: "center",
    marginBottom: 20,
  },
  invoiceTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 10,
    color: "#888",
  },
  customerInfo: {
    marginBottom: 20,
  },
  invoiceInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  table: {
    display: "table",
    width: "100%",
    marginBottom: 10,
  },
  tableRow: {
    flexDirection: "row",
    borderBottom: "1px solid #eee",
    padding: "8px 0",
    alignItems: "center",
  },
  tableHeader: {
    backgroundColor: "#f5f5f5",
    fontWeight: "bold",
  },
  tableCol: {
    width: "20%",
    textAlign: "center",
  },
  tableColItem: {
    width: "40%",
    textAlign: "left",
    paddingLeft: 8,
  },
  totals: {
    marginTop: 10,
    textAlign: "right",
  },
  footer: {
    position: "absolute",   // 👈 very important
    bottom: 40,             // 👈 distance from bottom (adjust if needed)
    left: 40,               // 👈 match your page padding
    right: 40,
    fontSize: 9,
    color: "#aaa",
    textAlign: "center",
    borderTop: "1px solid #eee",
    paddingTop: 10,
  },
  
});

export default styles;
