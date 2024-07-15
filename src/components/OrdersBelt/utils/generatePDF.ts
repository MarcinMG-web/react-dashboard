import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import { User } from 'firebase/auth';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { autoTable } from 'jspdf-autotable';
import { enqueueSnackbar } from 'notistack';
import { DataRow } from '../../OrderTable/utils/data';
import { countStatus } from './countStatus';

export type DocWithAutoTable = jsPDF & { autoTable: autoTable };

export const generatePDF = (rowsData: DataRow[], authorizedUser: User | null) => {
  const doc = new jsPDF();

  dayjs.extend(localizedFormat);
  const date = dayjs().format('LLLL');

  // Title
  doc.setFontSize(22);
  doc.text('Orders:', 17, 20);

  doc.setFontSize(12);
  doc.text(`${date}`, 17, 30);

  doc.setFontSize(10);
  doc.text(`by: ${authorizedUser?.email}`, 17, 35);

  // Img
  const imgData = 'src/assets/monkey.png';
  const imageWidth = 30;
  const imageHeight = 30;
  const pageWidth = 203;
  const marginRight = 10;
  const imageX = pageWidth - imageWidth - marginRight;
  const imageY = 10;

  doc.addImage(imgData, 'PNG', imageX, imageY, imageWidth, imageHeight);

  // Main content
  const mainContent = rowsData.map(({ date, customer, status }, index) => [
    `INV-${index + 1}`,
    date,
    customer.name,
    customer.email,
    status,
  ]);

  (doc as DocWithAutoTable).autoTable({
    startY: 44,
    head: [['Id', 'Date', 'Name', 'Email', 'Status']],
    body: mainContent,
    theme: 'striped',
    headStyles: {
      fillColor: [31, 122, 31],
      textColor: [255, 255, 255],
      fontSize: 10,
    },
    footStyles: {
      fillColor: [31, 122, 31],
      textColor: [255, 255, 255],
      fontSize: 10,
    },
  });

  // Summary
  const statusCounts = countStatus(rowsData);
  // Position
  const summaryStartY = (doc as DocWithAutoTable).lastAutoTable.finalY + 10;

  const summaryData = Object.entries(statusCounts).map(([status, count]) => [status, count]);
  const totalValues = rowsData.length;

  (doc as DocWithAutoTable).autoTable({
    startY: summaryStartY,
    head: [['Status', 'Value']],
    body: summaryData,
    foot: [['Total', totalValues]],
    theme: 'striped',
    headStyles: {
      fillColor: [31, 122, 31],
      textColor: [255, 255, 255],
      fontSize: 10,
    },
    footStyles: {
      fillColor: [31, 122, 31],
      textColor: [255, 255, 255],
      fontSize: 10,
    },
  });

  // Name file
  doc.save(`Orders-${date}`);

  enqueueSnackbar('Success download .pdf file!', { variant: 'success' });
};
