import "./PDF.scss";

const PDF = () => {
  return (
    <div className="pdf">
      <div className="pdf-container">
        <div className="pdf-container-top">
          <p></p>
          <p>Invoice</p>
          <p>Original for recipient</p>
        </div>

        <hr />

        <div className="pdf-container-company">
          <div className="pdf-container-company-left">
            <div className="pdf-container-company-left-top"></div>

            <div className="pdf-container-company-left-bottom"></div>
          </div>

          <div className="pdf-container-company-right">
            <div className="pdf-container-company-right-top">
              <div className="pdf-container-company-right-top-left">
              </div>
              <div className="pdf-container-company-right-top-right">
              </div>
            </div>
            <hr />
            <div className="pdf-container-company-right-bottom"></div>
          </div>
        </div>





        <div class="pdf-item">
  <table class="pdf-table">
    <thead>
      <tr>
        <th>ID</th>
        <th>Item Name</th>
        <th>HSN/SAC</th>
        <th>Rate/Item</th>
        <th>Qty</th>
        <th>Amount</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>1</td>
        <td>Sample Item</td>
        <td>9987</td>
        <td>₹100</td>
        <td>2</td>
        <td>₹200</td>
      </tr>
    </tbody>
  </table>
</div>

      </div>
    </div>
  );
};

export default PDF;
