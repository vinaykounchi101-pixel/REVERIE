/**
 * REVERIE Luxury Horology — Official Atelier Invoice & Consignment Generator
 * Generates and prints/downloads high-resolution PDF invoices formatted with
 * Swiss haute horlogerie typography, watermark, and warranty certificates.
 */

export const invoiceService = {
  /**
   * Generates a printable / downloadable PDF invoice for an order
   */
  downloadInvoice(order) {
    if (!order || typeof window === 'undefined') return;

    const orderId = order.orderId || order.orderNumber || order.id || 'REV-ORDER';
    const orderDate = order.date || (order.createdAt ? new Date(order.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) : new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }));
    const paymentMethod = order.paymentDetails || order.paymentMethod || 'Direct Secure Gateway';
    const paymentStatus = (order.paymentStatus || (order.status === 'CONFIRMED' || order.status === 'PROCESSING' || order.status === 'DELIVERED' ? 'CAPTURED / PAID' : 'AUTHORIZATION SECURED')).toUpperCase();
    
    // Format shipping address
    let clientName = 'Valued Collector';
    let addressStr = 'Insured Vault Dispatch Handover';
    let clientEmail = '';
    let clientPhone = '';

    if (order.shippingAddress) {
      if (typeof order.shippingAddress === 'object') {
        const addr = order.shippingAddress;
        clientName = `${addr.firstName || ''} ${addr.lastName || ''}`.trim() || clientName;
        clientEmail = addr.email || '';
        clientPhone = addr.phone || '';
        addressStr = `${addr.address || ''}${addr.apartment ? `, ${addr.apartment}` : ''}, ${addr.city || ''}, ${addr.state ? `${addr.state}, ` : ''}${addr.country || 'Switzerland'} ${addr.postalCode || ''}`.trim();
      } else if (typeof order.shippingAddress === 'string') {
        addressStr = order.shippingAddress;
      }
    }

    // Format items
    const items = order.items && order.items.length > 0 ? order.items : [
      { name: 'Haute Horlogerie Timepiece', sku: 'R01-CALIBRE', quantity: 1, price: order.total || 1250 }
    ];

    let subtotal = order.subtotal || 0;
    if (!subtotal) {
      subtotal = items.reduce((acc, it) => acc + ((it.price || (it.unitPricePaise ? it.unitPricePaise / 100 : 1250)) * (it.quantity || 1)), 0);
    }
    const tax = order.tax || Math.round(subtotal * 0.077);
    const total = order.total || (subtotal + tax);

    const invoiceWindow = window.open('', '_blank');
    if (!invoiceWindow) {
      alert('Please allow popups to download and print your REVERIE invoice.');
      return;
    }

    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>REVERIE Invoice — #${orderId}</title>
  <style>
    @page {
      size: A4;
      margin: 15mm 20mm;
    }
    * {
      box-sizing: border-box;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      background: #ffffff;
      color: #1a1a1e;
      margin: 0;
      padding: 24px;
      font-size: 13px;
      line-height: 1.5;
    }
    .invoice-container {
      max-width: 800px;
      margin: 0 auto;
      border: 1px solid #e0ded8;
      padding: 40px;
      position: relative;
      background: #ffffff;
    }
    .watermark {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) rotate(-30deg);
      font-size: 80px;
      font-weight: 300;
      letter-spacing: 0.3em;
      color: rgba(212, 175, 55, 0.04);
      text-transform: uppercase;
      pointer-events: none;
      user-select: none;
    }
    .header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      border-bottom: 2px solid #111;
      padding-bottom: 24px;
      margin-bottom: 28px;
    }
    .brand-title {
      font-size: 26px;
      font-weight: 300;
      letter-spacing: 0.35em;
      text-transform: uppercase;
      color: #0b0c10;
      margin: 0;
    }
    .brand-sub {
      font-size: 9px;
      letter-spacing: 0.3em;
      text-transform: uppercase;
      color: #888;
      margin-top: 4px;
    }
    .invoice-badge {
      text-align: right;
    }
    .invoice-badge-title {
      font-size: 18px;
      font-weight: 700;
      letter-spacing: 0.08em;
      color: #997d3d;
      margin: 0 0 4px 0;
    }
    .meta-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 24px;
      margin-bottom: 32px;
    }
    .meta-card {
      background: #faf9f6;
      border: 1px solid #eae7e0;
      padding: 16px 20px;
      border-radius: 4px;
    }
    .meta-card h4 {
      margin: 0 0 8px 0;
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 0.15em;
      color: #997d3d;
    }
    .items-table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 24px;
    }
    .items-table th {
      background: #111;
      color: #fff;
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 0.12em;
      padding: 10px 14px;
      text-align: left;
    }
    .items-table td {
      padding: 14px;
      border-bottom: 1px solid #eae7e0;
    }
    .totals-area {
      display: flex;
      justify-content: flex-end;
      margin-bottom: 32px;
    }
    .totals-box {
      width: 320px;
      background: #faf9f6;
      border: 1px solid #eae7e0;
      padding: 16px 20px;
      border-radius: 4px;
    }
    .totals-row {
      display: flex;
      justify-content: space-between;
      margin-bottom: 8px;
      font-size: 13px;
    }
    .totals-row--final {
      border-top: 1px solid #111;
      padding-top: 10px;
      margin-top: 10px;
      font-size: 16px;
      font-weight: 700;
      color: #997d3d;
    }
    .warranty-seal {
      border: 1px dashed #c4a962;
      background: #fdfbf7;
      padding: 16px 20px;
      border-radius: 4px;
      margin-bottom: 28px;
      display: flex;
      align-items: center;
      gap: 16px;
    }
    .seal-icon {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      background: #997d3d;
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 16px;
      font-weight: bold;
      flex-shrink: 0;
    }
    .footer {
      text-align: center;
      font-size: 10px;
      color: #777;
      border-top: 1px solid #eae7e0;
      padding-top: 16px;
    }
    .print-actions {
      text-align: center;
      margin-bottom: 20px;
    }
    .print-btn {
      background: #0b0c10;
      color: #fff;
      border: none;
      padding: 10px 24px;
      font-size: 13px;
      font-weight: 600;
      letter-spacing: 0.05em;
      border-radius: 4px;
      cursor: pointer;
    }
    @media print {
      .print-actions {
        display: none !important;
      }
      body {
        padding: 0;
      }
      .invoice-container {
        border: none;
        padding: 0;
      }
    }
  </style>
</head>
<body>

  <div class="print-actions">
    <button class="print-btn" onclick="window.print()">Print / Save as PDF</button>
  </div>

  <div class="invoice-container">
    <div class="watermark">REVERIE</div>

    <div class="header">
      <div>
        <h1 class="brand-title">R E V E R I E</h1>
        <div class="brand-sub">Manufacture Horlogère Suisse • Genève</div>
        <div style="font-size: 11px; color: #666; margin-top: 8px;">
          Rue du Rhône, 1204 Genève, Switzerland<br>
          VAT ID: CHE-491.204.819 MWST
        </div>
      </div>
      <div class="invoice-badge">
        <h2 class="invoice-badge-title">OFFICIAL INVOICE</h2>
        <div style="font-size: 13px; font-weight: 600;">#${orderId}</div>
        <div style="font-size: 12px; color: #666; margin-top: 4px;">Date: ${orderDate}</div>
        <div style="font-size: 11px; color: #2e7d32; font-weight: 600; margin-top: 4px;">Status: ${paymentStatus}</div>
      </div>
    </div>

    <div class="meta-grid">
      <div class="meta-card">
        <h4>Consigned To:</h4>
        <div style="font-weight: 600; font-size: 14px; margin-bottom: 4px;">${clientName}</div>
        <div style="color: #555; font-size: 12px; line-height: 1.5;">
          ${addressStr}<br>
          ${clientEmail ? `Email: ${clientEmail}<br>` : ''}
          ${clientPhone ? `Tel: ${clientPhone}` : ''}
        </div>
      </div>

      <div class="meta-card">
        <h4>Acquisition & Payment:</h4>
        <div style="font-size: 12px; color: #444; line-height: 1.6;">
          <strong>Payment Rail:</strong> ${paymentMethod}<br>
          <strong>Consignment Mode:</strong> DHL Armored Insured Courier<br>
          <strong>Security Protocol:</strong> Swiss Escrow Authenticated<br>
          <strong>Currency:</strong> USD ($)
        </div>
      </div>
    </div>

    <table class="items-table">
      <thead>
        <tr>
          <th style="width: 45%;">Horological Reference</th>
          <th style="text-align: center; width: 15%;">Ref / SKU</th>
          <th style="text-align: center; width: 10%;">Qty</th>
          <th style="text-align: right; width: 15%;">Unit Price</th>
          <th style="text-align: right; width: 15%;">Total</th>
        </tr>
      </thead>
      <tbody>
        ${items.map((it) => {
          const itName = it.name || it.productName || 'Haute Horlogerie Timepiece';
          const itSku = it.sku || 'R01-CHRONO';
          const itQty = it.quantity || 1;
          const itPrice = it.price || (it.unitPricePaise ? it.unitPricePaise / 100 : 1250);
          const itLineTotal = itPrice * itQty;
          return `
            <tr>
              <td>
                <strong style="color: #111;">${itName}</strong>
                <div style="font-size: 11px; color: #777;">Swiss Made • Certified Calibre</div>
              </td>
              <td style="text-align: center; font-size: 11px; color: #555;">${itSku}</td>
              <td style="text-align: center; font-weight: 600;">${itQty}</td>
              <td style="text-align: right; color: #444;">$${itPrice.toLocaleString()}</td>
              <td style="text-align: right; font-weight: 600; color: #997d3d;">$${itLineTotal.toLocaleString()}</td>
            </tr>
          `;
        }).join('')}
      </tbody>
    </table>

    <div class="totals-area">
      <div class="totals-box">
        <div class="totals-row">
          <span style="color: #666;">Subtotal:</span>
          <strong>$${subtotal.toLocaleString()}</strong>
        </div>
        <div class="totals-row">
          <span style="color: #666;">Insured Courier Express:</span>
          <strong style="color: #997d3d;">COMPLIMENTARY</strong>
        </div>
        <div class="totals-row">
          <span style="color: #666;">Swiss VAT & Customs:</span>
          <strong>$${tax.toLocaleString()}</strong>
        </div>
        <div class="totals-row totals-row--final">
          <span>Total Amount Paid:</span>
          <span>$${total.toLocaleString()} USD</span>
        </div>
      </div>
    </div>

    <div class="warranty-seal">
      <div class="seal-icon">✓</div>
      <div style="font-size: 12px; color: #444; line-height: 1.5;">
        <strong style="color: #997d3d;">5-Year Global Manufacture Warranty Activated:</strong>
        This document serves as your official acquisition receipt and proof of provenance. Keep this reference for routine atelier servicing, strap adjustments, and vault transfer authentication.
      </div>
    </div>

    <div class="footer">
      © ${new Date().getFullYear()} REVERIE SA. All rights reserved. • Manufacture Horlogère Suisse, Rue du Rhône, 1204 Genève.<br>
      Inquiries and bespoke assistance: concierge@reverie.luxury
    </div>
  </div>

  <script>
    window.onload = function() {
      // Prompt print dialog after a brief render delay
      setTimeout(function() {
        window.print();
      }, 500);
    };
  </script>
</body>
</html>
    `;

    invoiceWindow.document.open();
    invoiceWindow.document.write(html);
    invoiceWindow.document.close();
  }
};
