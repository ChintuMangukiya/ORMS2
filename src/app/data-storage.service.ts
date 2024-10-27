import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Student, StudentService } from './students/students.service';
import { map, Subscription, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataStorageSrevice{
  totalStudents!: Student[];


  stds: Student[] = [];
  subscription!: Subscription;

  constructor(
    private http: HttpClient,
    private studentService: StudentService
  ) {}

  fetchStudents() {

    
      this.http
        .get<Student[]>(
          'https://result-management-system-7b457-default-rtdb.firebaseio.com/students.json'
        )
        .pipe(
          take(1),
          map((students) => {

            for (const key in students) {
              this.stds.push({...students[key], id:key});
            }

            students = Array.from(this.stds);
            this.studentService.addStudents(students);
            return this.stds;

            // return students.map((student,i)=>{
            //   return {
            //     ...student,

            //   };
            // });
          })
        )
        .subscribe((students: Student[]) => {
          this.studentService.clearStudents();
          this.studentService.addStudents([...students]);
        });
    }

    fetchStudents1(){
      return this.http
        .get<Student[]>(
          'https://result-management-system-7b457-default-rtdb.firebaseio.com/students.json'
        )
        
    }
}
