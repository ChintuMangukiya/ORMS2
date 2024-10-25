import { Component, OnInit } from '@angular/core';

import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;



@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrl: './report.component.css'
})
export class ReportComponent implements OnInit{

  ngOnInit(): void {
    this.generatePDF();
  }

  generatePDF() {

    console.log("Hio");
    const documentDefinition = {
      content: [
        { text: 'PDF Generation Example', style: 'header' },
        { text: 'This PDF is generated with pdfMake and Angular.' }
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true
        }
      }
    };

    pdfMake.createPdf(documentDefinition).open();
  }

}
