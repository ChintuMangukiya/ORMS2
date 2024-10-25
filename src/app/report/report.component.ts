import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

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

  constructor(private router: Router){}

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

    this.router.navigate(['/']);

  }

}
