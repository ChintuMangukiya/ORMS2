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
import { ActivatedRoute, Params } from "@angular/router";


export interface ICallRecord {
  subject: string;
  marks: number;
}


export interface convertedMarks{
  subject: string,
  totalMarks: number,
  marks: number,
  grade: string,
  status: string,
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
  selector: "app-class-result",
  templateUrl: `./class-result.component.html`,
  styleUrls: ['./class-result.component.css']
})

export class ClassResultComponent implements OnInit{


  private cla!:string;

  public stds: convertedStudentData[] = [];

  public columnDefs: ColDef[] = [
    // group cell renderer needed for expand / collapse icons
    { field: "grNo", cellRenderer: "agGroupCellRenderer" },
    { field: "std" },
    { field: "rollNo" },
    { field: "name"},
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
        <a href="delete/${params.data.id}" onclick="" style="background-color:rgb(228, 65, 65); border: none;padding: 8px; width: 60px !important; border-radius: 4px; margin-left: 2px; color: white; text-decoration: none;" >Delete</a>`
      }
    }
  ];

  public defaultColDef: ColDef = {
    flex: 1,
  };
  public detailCellRendererParams: any = {
    detailGridOptions: {
      columnDefs: [
        { field: "subject"},
        { field: "totalMarks" },
        { field: "marks", minWidth: 150 },
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

  constructor(private http: HttpClient,private route: ActivatedRoute) {}

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
        this.rowData = data.filter((data)=>data.std.trim().toLowerCase() == this.cla.trim().toLowerCase());

      });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params)=>{
      this.cla = params['id'];
      this.onGridReady();
    });
  }

}