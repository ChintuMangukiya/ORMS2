import { Component, OnInit } from "@angular/core";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import {
  ColDef,
  ColGroupDef,
  FirstDataRenderedEvent,
  GridApi,
  GridOptions,
  GridReadyEvent,
  IDetailCellRendererParams,
  createGrid,
} from "ag-grid-community";
import "ag-grid-charts-enterprise";
import { map } from "rxjs";


export interface ICallRecord {
  marks: number;
  subject: string
}


export interface convertedMarks{
  totalMarks: number,
  subject: string,
  marks: number,
  status: string,
  grade: string
}

export interface convertedStudentData{
  gender: string;
  grNo: number;
  name: string;
  rollNo: number;
  std: string;
  id: string;
  marksArray: convertedMarks[];
}

export interface IAccount {
  gender: string;
  grNo: number;
  name: string;
  rollNo: number;
  std: string;
  id: string;
  marksArray: ICallRecord[];
}


@Component({
  selector: 'students-table',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css'],
})
export class StudentsComponent{

  public stds: convertedStudentData[] = [];

  public columnDefs: ColDef[] = [
    // group cell renderer needed for expand / collapse icons
    { field: "grNo",cellRenderer: "agGroupCellRenderer" },
    { field: "std"},
    { field: "rollNo"},
    { field: "name", editable: true},
    { field: 'gender', sortable: true, filter: true, editable: false, 
      cellRenderer: (params: any) => {

        console.log(params);

        const maleChecked = params.value === 'male' ? 'checked' : '';
        const femaleChecked = params.value === 'female' ? 'checked' : '';

        return `
          <label>
            <input type="radio" name="gender-${params.node.id}" value="male" ${maleChecked} onclick="updateGender(${params.node.rowIndex}, 'male')"/>
            Male
          </label>
          <label>
            <input type="radio" name="gender-${params.node.id}" value="=female" ${femaleChecked} onclick="updateGender(${params.node.rowIndex}, 'female')"/>
            Female
          </label>
        `;

      }
    },
    {
      field: 'Operartions',
      sortable: false,
      cellRenderer: (params: any)=>{
        return `<a target="_blank" href="edit/${params.data.id}" style="background-color:rgb(51, 136, 51); padding: 8px; width: 100px !important; border: none; margin-right: 4px; border-radius: 4px; color: white; text-decoration: none;" >Update</a>
        <a href="delete/${params.data.id}" style="background-color:rgb(228, 65, 65); border: none;padding: 8px; width: 60px !important; border-radius: 4px; margin-left: 4px; color: white; text-decoration: none;" >Delete</a>
        <a href="report-print/${params.data.id}" style="background-color:rgb(68, 68, 212); border: none;padding: 8px;padding-left: 12px !important; padding-right: 12px !important;width: 60px !important; border-radius: 4px; margin-left: 8px; color: white; text-decoration: none;" >Print</a>
        `
      },
      flex: 1.6
    }
  ];
  public defaultColDef: ColDef = {
    flex: 1,
  };
  public detailCellRendererParams: any = {
    detailGridOptions: {
      columnDefs: [
        { field: "subject"},
        { field: "totalMarks"},
        { field: "marks", minWidth: 150 , editable: true},
        { field: "status"},
        { field: "grade" }
      ],
      defaultColDef: {
        flex: 1
      },
    },
    getDetailRowData: (params) => {
      params.successCallback(params.data.marksArray);
    },
  } as IDetailCellRendererParams<convertedStudentData, convertedMarks>;
  public rowData: convertedStudentData[] = [];
  public themeClass: string =
    "ag-theme-quartz";

  constructor(private http: HttpClient) {}

  onFirstDataRendered(params: FirstDataRenderedEvent) {
    // arbitrarily expand a row for presentational purposes
    setTimeout(() => {
      params.api.getDisplayedRowAtIndex(1)!.setExpanded(true);
    }, 0);
  }

  onGridReady() {
    this.http
      .get<
        IAccount[]
      >("https://result-management-system-7b457-default-rtdb.firebaseio.com/students.json")
      .pipe(
        map((data)=> {

          for (const key in data) {
            this.stds.push({
               ...data[key],
               id:key,
               marksArray: data[key].marksArray.map((data)=>({
                ...data,
                totalMarks: 100,
                status: data.marks > 33 ? 'Passed' : 'Failed',
                grade: data.marks > 90 ? 'AA' : data.marks > 80 ? 'AB' : data.marks > 70 ? 'BB' : data.marks > 60 ? 'BC' : data.marks > 50 ? 'CC' : data.marks > 40 ? 'CD' : data.marks > 33 ? 'DD' : 'EE'
            }))

              });
          }
          return this.stds;
        })).subscribe((data) => {
        console.log(data);
        this.rowData = data;
      });
  }

}