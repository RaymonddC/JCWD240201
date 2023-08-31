import { useSelector } from 'react-redux';
const ExcelJS = require('exceljs');

export default function ExcelDownload() {
  const { revenue, totalTransaction, totalUser, topSale } = useSelector(
    (state) => state.salesReport,
  );
  const excelHandler = () => {
    const workbook = new ExcelJS.Workbook();
    const sheetRevenue = workbook.addWorksheet('Revenue');
    const sheetTransaction = workbook.addWorksheet('Transaction');
    const sheetUser = workbook.addWorksheet('User');
    const sheetProduct = workbook.addWorksheet('Product');

    sheetRevenue.properties.defaultRowHeight = 30;
    sheetTransaction.properties.defaultRowHeight = 30;
    sheetUser.properties.defaultRowHeight = 30;
    sheetProduct.properties.defaultRowHeight = 30;

    sheetRevenue.columns = [
      {
        header: 'date',
        key: 'date',
        width: 20,
      },
      {
        header: 'Today Revenue',
        key: 'today_revenue',
        width: 20,
      },
    ];

    revenue?.map((value) => {
      return sheetRevenue.addRow({
        date: value?.date,
        today_revenue: value?.today_revenue,
      });
    });

    sheetTransaction.columns = [
      {
        header: 'date',
        key: 'date',
        width: 20,
      },
      {
        header: 'Total Transaction',
        key: 'total_transaction',
        width: 20,
      },
    ];

    totalTransaction?.map((value) => {
      return sheetTransaction.addRow({
        date: value?.date,
        total_transaction: value?.total_transaction,
      });
    });

    sheetUser.columns = [
      {
        header: 'date',
        key: 'date',
        width: 20,
      },
      {
        header: 'Total User',
        key: 'total_user',
        width: 20,
      },
    ];

    totalUser?.map((value) => {
      return sheetUser.addRow({
        date: value?.date,
        total_user: value?.total_user,
      });
    });

    sheetProduct.columns = [
      {
        header: 'Product',
        key: 'product',
        width: 50,
      },
      {
        header: 'Total closed stock',
        key: 'quantity_closed',
        width: 20,
      },
      {
        header: 'Total opened stock',
        key: 'quantity_opened',
        width: 20,
      },
    ];

    topSale?.map((value) => {
      return sheetProduct.addRow({
        product: value?.name,
        quantity_closed: value?.quantity_closed,
        quantity_opened: value?.quantity_opened,
      });
    });

    workbook.xlsx.writeBuffer().then((data) => {
      const blob = new Blob([data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
      const url = window.URL.createObjectURL(blob);
      const anchor = document.createElement('a');
      anchor.href = url;
      anchor.download = 'sales-report.xlsx';
      anchor.click();
      window.URL.revokeObjectURL(url);
    });
  };
  return (
    <button className="btn btn-primary text-white" onClick={excelHandler}>
      Excel
    </button>
  );
}
