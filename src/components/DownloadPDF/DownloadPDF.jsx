import React, { useEffect, useRef } from "react";
import { jsPDF } from "jspdf";
import PDF from "../../components/PDF/PDF"; // Import your PDF content component

const DownloadPDF = () => {
  const pdfContentRef = useRef(null); // Create a ref to your PDF content

  // Function to trigger the PDF download
  const handleDownload = () => {
    const element = pdfContentRef.current;

    if (element) {
      const doc = new jsPDF();

      // Wait for the content to be fully loaded and styled
      doc.html(element, {
        callback: function (doc) {
          // After rendering the HTML into PDF, save the PDF file
          doc.save("invoice.pdf");
        },
        x: 10,
        y: 10,
        html2canvas: {
          scale: 4, // Higher scale for better quality
          logging: true, // Enable logging to debug rendering issues
          useCORS: true, // Allow cross-origin images and fonts
        },
      });
    }
  };

  return (
    <div>
      {/* Render your existing PDF content component */}
      <div id="pdf-content" ref={pdfContentRef}>
        <PDF />
      </div>

      {/* Button to trigger the PDF download */}
      <button onClick={handleDownload} className="download-btn">
        Download PDF
      </button>
    </div>
  );
};

export default DownloadPDF;
