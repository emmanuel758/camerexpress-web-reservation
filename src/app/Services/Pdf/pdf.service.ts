import { Injectable } from '@angular/core';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import htmlToPdfmake from 'html-to-pdfmake';

@Injectable({
  providedIn: 'root'
})
export class PdfService {

  constructor() {
    (pdfMake as any).vfs = pdfFonts.pdfMake.vfs;
  }

  generatePdf(elementId: string, pdfName: string): void {
    // const element = document.getElementById(elementId);
    // if (!element) {
    //   console.error('Element not found with ID:', elementId);
    //   return;
    // }

    // html2canvas(element).then((canvas) => {
    //   const imgData = canvas.toDataURL('image/png');
    //   const pdf = new jsPDF('p', 'mm', 'a4');
    //   const imgProps = pdf.getImageProperties(imgData);
    //   const pdfWidth = pdf.internal.pageSize.getWidth();
    //   const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    //   pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    //   pdf.save(`${pdfName}.pdf`);
    // });



    // Convertir l'élément HTML en un format compatible avec pdfMake
    // const html = element.innerHTML;
    // const pdfContent = htmlToPdfmake(html);

    // const documentDefinition = {
    //   content: pdfContent, 
    // };

    // pdfMake.createPdf(documentDefinition).download(pdfName);
  }
}
