import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { Student, StudentService } from '../students/students.service';
import { map, Subscription, take } from 'rxjs';
import { DataStorageSrevice } from '../data-storage.service';
import { convertedStudentData } from '../classes/class-result/class-result.component';
import { style } from '@angular/animations';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrl: './report.component.css'
})
export class ReportComponent implements OnInit, OnDestroy {

  id!: string;

  stds: convertedStudentData[] = [];

  student?: convertedStudentData;

  subscription!: Subscription;

  marksArray: string[] = [];

  array: any[] = [];

  arrayu = [1,'1','2',3,1];

  validPdf = true;

  ngOnInit(): void {

    this.id = this.route.snapshot.params['id'];

    this.subscription = this.dataStorageService.fetchStudents1().pipe(take(1), map((data) => {

      for (const key in data) {
        this.stds.push({
          ...data[key],
          id: key,
          marksArray: data[key].marksArray.map((data) => ({
            subject: data.subject,
            totalMarks: 100,
            marks: data.marks,
            grade: data.marks > 90 ? 'AA' : data.marks > 80 ? 'AB' : data.marks > 70 ? 'BB' : data.marks > 60 ? 'BC' : data.marks > 50 ? 'CC' : data.marks > 40 ? 'CD' : data.marks > 33 ? 'DD' : 'EE',
            status: data.marks > 33 ? 'Passed' : 'Failed',
          }))
        });
      }


      return this.stds;
    })).subscribe((students: convertedStudentData[]) => {

      this.student = students.slice().find((e) => e.id == this.id);

      this.student?.marksArray?.map((e)=>{
        this.array.push(Object.values(e));
      });


      console.log(Array.from(Object.values(this.student!.marksArray[0])));

      if (this.student != undefined) {

        this.validPdf = true;
        this.router.navigate(['/']);
        this.generatePDF();

      }
      else {

        this.validPdf = false;
        setTimeout(() => {
          this.router.navigate(['/']);
        }, 500000);

      }


    })
  }

  constructor(private router: Router, private route: ActivatedRoute, private studentService: StudentService, private dataStorageService: DataStorageSrevice) { }


  async convertImageUrlToBase64(imageUrl: string): Promise<string> {
    const response = await fetch(imageUrl);
    const blob = await response.blob();
    
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve((reader.result as string).split(",")[1]);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  }

  async generatePDF() {

    const logoBase64 = "data:image/png;base64,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";

    const documentDefinition: any = {

      background: [
        {
          canvas: [
            {
              type: 'rect',
              x: 0,
              y: 0,
              w: 595.28, // Width for A4 in points
              h: 841.89, // Height for A4 in points
              color: 'white' // Light gray background
            }
          ]
        }
      ],

      content: [
        {
          color:'#14293f',
          stack: [
            {
              image: logoBase64,
              width: 65,
              alignment: 'left', // Center the logo
              margin: [0, 0, 0, 10] // Space between logo and text
            },
            { text: 'Kaushal Vidhyabhavan', style: 'header', alignment: 'center', margin: [0, -68, 0, 0] },
            { text: 'Patel Faliya, Nana Varachha,\n Surat-395010.', style: 'subheader', alignment: 'center' },
          ],
          margin: [0, 0, 0, 20] // Space after the header section
        },

        { text: ' ' }, // Spacer



        {
          layout: {
            paddingLeft: () => 5,
            paddingRight: () => 5,
            paddingTop: () => 5,
            paddingBottom: () => 5,
            hLineWidth: () => 1,
            vLineWidth: () => 1,
            hLineColor: () => '#cfd8dc',
            vLineColor: () => '#cfd8dc',
          },
          table: {
            headerRows: 1,
            widths: ['*', '*', '*', '*','*'],
            body: [
              [
                { text: 'Year', style: 'tableHeader1'},
                { text: 'Month', style: 'tableHeader1' },
                { text: 'Gr No.', style: 'tableHeader1' },
                { text: 'Roll No.', style: 'tableHeader1' },
                { text: 'Name', style: 'tableHeader1' }
              ],
              [
                { text: new Date().getFullYear() , style: 'tableCell1' },
                { text: 'July', style: 'tableCell1' },
                { text: this.student?.grNo, style: 'tableCell1' },
                { text: this.student?.rollNo, style: 'tableCell1' },
                { text: this.student?.name, style: 'tableCell1' }
              ]
            ],
          },
          fillColor: '#ffffff',
          border: [false, false, false, false],
          margin: [10, 10, 10, 10], // Space between the outer border and content
        },

        { text: ' ' }, // Another Spacer

        { color: '#14293f', text: 'Report Card', style: 'sectionHeader', bold: true, fontSize: 15 },
        {
          color: '#14293f',
          style: 'table',
          table: {
            headerRows: 1,
            widths: [180, 70, 80, 60, 60],
            body: [
              [{ text: 'Subject', bold: true, style: 'tableHeader'}, { text: 'Total Marks' , bold:true, style: 'tableHeader'}, { text: 'Obtained Marks', bold: true ,style: 'tableHeader'}, { text: 'Grade', bold: true , style: 'tableHeader'}, { text: 'Status', bold: true, style: 'tableHeader'}],
              [{text: this.student?.marksArray[0].subject, style: 'tableCell', border: [true, false, true, true]}, {text:this.student?.marksArray[0].totalMarks, style: 'tableCell'}, {text:this.student?.marksArray[0].marks, style: 'tableCell'}, 
              {text: this.student?.marksArray[0].grade, style: 'tableCell'},{text: this.student?.marksArray[0].status, style: 'tableCell'}
              ],
              [{text: this.student?.marksArray[1].subject, style: 'tableCell'}, {text:this.student?.marksArray[1].totalMarks, style: 'tableCell'}, {text:this.student?.marksArray[1].marks, style: 'tableCell'}, 
              {text: this.student?.marksArray[1].grade, style: 'tableCell'},{text: this.student?.marksArray[1].status, style: 'tableCell'}
              ],
              [{text: this.student?.marksArray[2].subject, style: 'tableCell'}, {text:this.student?.marksArray[2].totalMarks, style: 'tableCell'}, {text:this.student?.marksArray[2].marks, style: 'tableCell'}, 
              {text: this.student?.marksArray[2].grade, style: 'tableCell'},{text: this.student?.marksArray[2].status, style: 'tableCell'}
              ],
              [{text: this.student?.marksArray[3].subject, style: 'tableCell'}, {text:this.student?.marksArray[3].totalMarks, style: 'tableCell'}, {text:this.student?.marksArray[3].marks, style: 'tableCell'}, 
              {text: this.student?.marksArray[3].grade, style: 'tableCell'},{text: this.student?.marksArray[3].status, style: 'tableCell'}
              ],
              [{text: this.student?.marksArray[4].subject, style: 'tableCell'}, {text:this.student?.marksArray[4].totalMarks, style: 'tableCell'}, {text:this.student?.marksArray[4].marks, style: 'tableCell'}, 
              {text: this.student?.marksArray[4].grade, style: 'tableCell'},{text: this.student?.marksArray[4].status, style: 'tableCell'}
              ],
              [{text: this.student?.marksArray[5].subject, style: 'tableCell'}, {text:this.student?.marksArray[5].totalMarks, style: 'tableCell'}, {text:this.student?.marksArray[5].marks, style: 'tableCell'}, 
              {text: this.student?.marksArray[5].grade, style: 'tableCell'},{text: this.student?.marksArray[5].status, style: 'tableCell'}
              ],
              [{text: this.student?.marksArray[6].subject, style: 'tableCell'}, {text:this.student?.marksArray[6].totalMarks, style: 'tableCell'}, {text:this.student?.marksArray[6].marks, style: 'tableCell'}, 
              {text: this.student?.marksArray[6].grade, style: 'tableCell'},{text: this.student?.marksArray[6].status, style: 'tableCell'}
            ]
              // [Object.values(this.student!.marksArray[1])],
              // [Object.values(this.student!.marksArray[2])],
              // [Object.values(this.student!.marksArray[3])],
              // [Object.values(this.student!.marksArray[4])],
              // [Object.values(this.student!.marksArray[5])],
            ],
          },

          border: [true, true, true, true],
          layout: {
            fillColor: (rowIndex: number) => (rowIndex === 0 ? '#3a3b00' : (rowIndex % 2 === 0 ? '#e0f7fa' : null)),
            paddingLeft: () => 6,
            paddingRight: () => 6,
            paddingTop: () => 3,
            paddingBottom: () => 3,
            hLineWidth: () => 0,
            vLineWidth: () => 0.5,
            hLineColor: () => '#cfd8dc',
            vLineColor: () => '#cfd8dc',
          }
    
        },

        { color: '#14293f', text: 'overall result', style: 'sectionHeader' },
        { color: '#14293f', text: 'The report shows the performance of students in the recent exam.', style: 'text' },
      ],

      styles: {
        tableHeader: {
          bold: true,
          fontSize: 10,
          color: 'white',
          fillColor: '#2c3e50',
          alignment: 'center',
          margin: [0, 5, 0, 5],
        },
        tableCell: {
          fontSize: 8.6,
          margin: [0, 4, 0, 4],
          alignment: 'center'
        },
        tableHeader1: {
          bold: true,
          fontSize: 13,
          color: 'white',
          fillColor: '#14293f',
          alignment: 'center',
          margin: [0, 5, 0, 5]
        },
        tableCell1: {
          fontSize: 11,
          margin: [0, 4, 0, 4],
          alignment: 'center'
        },
        header: {
          fontSize: 20,
          bold: true,
        },
        subheader: {
          fontSize: 12,
        },
        details: {
          fontSize: 10,
          margin: [0, 5, 0, 5],
        },
        sectionHeader: {
          fontSize: 14,
          bold: true,
          margin: [0, 10, 0, 5],
        },
        table: {
          borderRadius: 20,
          margin: [0, 5, 0, 15],
        },
        text: {
          fontSize: 12,
          alignment: 'justify',
        },
      },
    };

    pdfMake.createPdf(documentDefinition).open();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
