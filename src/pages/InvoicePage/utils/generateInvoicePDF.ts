import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import { RefObject } from 'react'

export const generatePDF = async (componentRef: RefObject<HTMLDivElement>) => {
  dayjs.extend(localizedFormat)
  const date = dayjs().format('LLLL')

  if (componentRef?.current) {
    const canvas = await html2canvas(componentRef?.current, { scale: 3 })
    const imgData = canvas.toDataURL('image/png')
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'pt',
      format: [canvas.width, canvas.height],
    })
    pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height)
    pdf.save(`Invoice-${date}.pdf`)
  }
}
