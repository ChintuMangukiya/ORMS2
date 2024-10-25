import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { Student, StudentService } from "../students/students.service";
import { HttpClient } from "@angular/common/http";
import { Subscription } from "rxjs";
import { DataStorageSrevice } from "../data-storage.service";

@Component({
  selector: 'app-delete-alert',
  templateUrl: './delete-alert.component.html',
  styleUrls: ['./delete-alert.component.css']
})
export class DeleteAlertComponent implements OnInit{

  id!: string;

  student?: Student;

  studentSubscription!: Subscription;

  constructor(private router: Router, private http: HttpClient,private route: ActivatedRoute, private studentService: StudentService, private datastorageService: DataStorageSrevice){}

  ngOnInit(): void {

    this.route.params.subscribe((params: Params)=>{
      this.id = params['id'];
      this.deleteStudent();
    }
  
  );

  this.studentSubscription = this.studentService.studentChanged.subscribe((e: Student[])=>{
    this.student = this.studentService.getStudent(this.id);
  });

   }
   
   private deleteStudent(){

      if(confirm("After the deletion of record"+this.student?.name+"'s gr no. and roll no. will be reused."))
        {
          
          this.http.delete(`https://result-management-system-7b457-default-rtdb.firebaseio.com/students/${this.id}.json`).subscribe(()=>{

            alert("All the data of "+ this.student?.name + " is deleted.");
            this.router.navigate(['/']);
          });
        }
        else{
          this.router.navigate(['/']);
        }
   }


}
