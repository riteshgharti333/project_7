import React from "react";
import {
  PDFDownloadLink,
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
  Font,
  PDFViewer,
} from "@react-pdf/renderer";
import logo from "../../../assets/images/logo.png"; // Import your logo

// // Register premium fonts
// Font.register({
//   family: "Montserrat",
//   fonts: [
//     { src: "https://fonts.gstatic.com/s/montserrat/v15/JTUSjIg1_i6t8kCHKm459Wlhyw.woff2" }, // Regular
//     { src: "https://fonts.gstatic.com/s/montserrat/v15/JTURjIg1_i6t8kCHKm45_dJE3gnD-w.woff2", fontWeight: 600 }, // Semi-bold
//     { src: "https://fonts.gstatic.com/s/montserrat/v15/JTURjIg1_i6t8kCHKm45_bZF3gnD-w.woff2", fontWeight: 700 } // Bold
//   ]
// });

// Premium color palette
const colors = {
  primary: "#2a4365", // Deep blue
  secondary: "#718096", // Cool gray
  accent: "#4299e1", // Bright blue
  lightBg: "#f8fafc", // Very light gray
  border: "#e2e8f0", // Light border
};

// Create premium styles
const styles = StyleSheet.create({
  page: {
    padding: 20,
    // fontFamily: "Montserrat",
    fontSize: 11,
    color: colors.primary,
    backgroundColor: "#ffffff",
    lineHeight: 1.5,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    borderBottomStyle: "solid",
  },
  logoContainer: {
    width: 70,
    height: 70,
    backgroundColor: "#ffffff",
    padding: 8,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: "100%",
    height: "auto",
    maxHeight: 64,
  },
  businessInfo: {
    textAlign: "right",
  },
  businessName: {
    fontSize: 16,
    fontWeight: 700,
    color: colors.primary,
    marginBottom: 4,
  },
  contactInfo: {
    fontSize: 9,
    color: colors.secondary,
    marginBottom: 2,
  },
  invoiceTitleContainer: {
    marginBottom: 10,
    textAlign: "center",
  },
  invoiceTitle: {
    fontSize: 28,
    fontWeight: 700,
    color: colors.primary,
    letterSpacing: 1,
    marginBottom: 4,
  },
  invoiceSubtitle: {
    fontSize: 10,
    color: colors.secondary,
    letterSpacing: 0.5,
    textTransform: "uppercase",
    marginTop: 10,
  },
  documentInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
    padding: 16,
    backgroundColor: colors.lightBg,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: colors.border,
    borderStyle: "solid",
  },
  infoColumn: {
    width: "48%",
  },
  infoLabel: {
    fontSize: 10,
    color: colors.secondary,
    marginBottom: 2,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  infoValue: {
    fontSize: 12,
    fontWeight: 600,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 700,
    color: colors.primary,
    marginBottom: 5,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  table: {
    width: "100%",
    marginBottom: 24,
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: colors.primary,
    paddingVertical: 8,
  },
  tableHeaderText: {
    color: "#ffffff",
    fontSize: 10,
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    borderBottomStyle: "solid",
    paddingVertical: 10,
  },
  tableColNumber: {
    width: "8%",
    paddingHorizontal: 8,
    textAlign: "center",
  },
  tableColItem: {
    width: "42%",
    paddingHorizontal: 8,
  },
  tableColRate: {
    width: "16%",
    paddingHorizontal: 8,
    textAlign: "right",
  },
  tableColQty: {
    width: "16%",
    paddingHorizontal: 8,
    textAlign: "center",
  },
  tableColAmount: {
    width: "16%",
    paddingHorizontal: 8,
    textAlign: "right",
  },
  totalsContainer: {
    marginTop: 24,
    padding: 16,
    backgroundColor: colors.lightBg,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: colors.border,
    borderStyle: "solid",
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  totalLabel: {
    fontSize: 12,
    color: colors.secondary,
  },
  totalValue: {
    fontSize: 12,
    fontWeight: 600,
  },
  grandTotal: {
    fontSize: 14,
    fontWeight: 700,
    color: colors.primary,
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    borderTopStyle: "solid",
  },
  footer: {
    position: "absolute",
    bottom: 36,
    left: 48,
    right: 48,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    borderTopStyle: "solid",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  footerText: {
    fontSize: 8,
    color: colors.secondary,
  },
  watermark: {
    position: "absolute",
    bottom: 120,
    right: 48,
    fontSize: 72,
    color: "#f0f4f8",
    fontWeight: 700,
    opacity: 0.3,
    transform: "rotate(-30deg)",
  },
});

const BillingInvoicePDF = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Watermark */}
      <Text style={styles.watermark}>PAID</Text>

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Image style={styles.logo} src={logo} />
        </View>
        <View style={styles.businessInfo}>
          <Text style={styles.businessName}>YOUR BUSINESS NAME</Text>
          <Text style={styles.contactInfo}>
            123 Business Street, City, Country
          </Text>
          <Text style={styles.contactInfo}>Mobile: +91 8580483491</Text>
          <Text style={styles.contactInfo}>
            Email: riteshgmr121232@gmail.com
          </Text>
          <Text style={styles.contactInfo}>GSTIN: 22AAAAA0000A1Z5</Text>
        </View>
      </View>

      {/* Invoice Title */}
      <View style={styles.invoiceTitleContainer}>
        <Text style={styles.invoiceTitle}>INVOICE</Text>
        <Text style={styles.invoiceSubtitle}>ORIGINAL FOR RECIPIENT</Text>
      </View>

      {/* Document Info */}
      <View style={styles.documentInfo}>
        <View style={styles.infoColumn}>
          <Text style={styles.infoLabel}>Invoice Number</Text>
          <Text style={styles.infoValue}>INV-2</Text>

          <Text style={styles.infoLabel}>Invoice Date</Text>
          <Text style={styles.infoValue}>26 Apr 2025</Text>

          <Text style={styles.infoLabel}>Due Date</Text>
          <Text style={styles.infoValue}>26 Apr 2025</Text>
        </View>

        <View style={styles.infoColumn}>
          <Text style={styles.infoLabel}>Bill To</Text>
          <Text style={styles.infoValue}>Suraj</Text>

          <Text style={styles.infoLabel}>Address</Text>
          <Text style={styles.infoValue}>123 Customer Street, City</Text>

          <Text style={styles.infoLabel}>Contact</Text>
          <Text style={styles.infoValue}>+91 9876543210</Text>
        </View>
      </View>

      {/* Items Table */}
      <Text style={styles.sectionTitle}>Item Details</Text>
      <View style={styles.table}>
        {/* Table Header */}
        <View style={styles.tableHeader}>
          <Text style={[styles.tableHeaderText, styles.tableColNumber]}>#</Text>
          <Text style={[styles.tableHeaderText, styles.tableColItem]}>
            Item Description
          </Text>
          <Text style={[styles.tableHeaderText, styles.tableColRate]}>
            Unit Price
          </Text>
          <Text style={[styles.tableHeaderText, styles.tableColQty]}>Qty</Text>
          <Text style={[styles.tableHeaderText, styles.tableColAmount]}>
            Amount
          </Text>
        </View>

        {/* Table Row */}
        <View style={styles.tableRow}>
          <Text style={styles.tableColNumber}>1</Text>
          <Text style={styles.tableColItem}>
            Premium Bananas (Organic, Grade A)
          </Text>
          <Text style={styles.tableColRate}>₹40.00</Text>
          <Text style={styles.tableColQty}>10</Text>
          <Text style={styles.tableColAmount}>₹400.00</Text>
        </View>
      </View>

      {/* Totals */}
      <View style={styles.totalsContainer}>
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Subtotal:</Text>
          <Text style={styles.totalValue}>₹400.00</Text>
        </View>
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Discount:</Text>
          <Text style={styles.totalValue}>-₹0.00</Text>
        </View>
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Shipping:</Text>
          <Text style={styles.totalValue}>₹0.00</Text>
        </View>
        <View style={styles.totalRow}>
          <Text style={styles.grandTotal}>Total Amount:</Text>
          <Text style={[styles.grandTotal, { textAlign: "right" }]}>
            ₹420.00
          </Text>
        </View>
      </View>

      {/* Amount in Words */}
      <View style={{ marginTop: 12 }}>
        <Text style={styles.infoLabel}>Amount in Words:</Text>
        <Text style={{ fontSize: 10, fontStyle: "italic" }}>
          INR Four Hundred Twenty Rupees Only
        </Text>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          This is a computer generated invoice
        </Text>
        <Text style={styles.footerText}>Page 1 of 1</Text>
      </View>
    </Page>
  </Document>
);

const Billing = () => {
  return (
    <div style={{ height: "100vh" }}>
      <PDFDownloadLink
        document={<BillingInvoicePDF />}
        fileName="premium-invoice.pdf"
      >
        {({ loading }) => (
          <button
            style={{
              position: "fixed",
              top: 80,
              right: 20,
              padding: "12px 24px",
              backgroundColor: "#2a4365",
              color: "white",
              border: "none",
              borderRadius: 4,
              fontWeight: 600,
              cursor: "pointer",
              boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
              zIndex: 100,
            }}
          >
            {loading ? "Generating..." : "Download Premium Invoice"}
          </button>
        )}
      </PDFDownloadLink>

      <div style={{ width: "100%", height: "100%" }}>
        <PDFViewer
          style={{
            width: "100%",
            height: "100%",
            border: "none",
            marginTop: "60px",
          }}
        >
          <BillingInvoicePDF />
        </PDFViewer>
      </div>
    </div>
  );
};

export default Billing;
