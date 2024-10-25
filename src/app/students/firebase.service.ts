import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Student, StudentService } from './students.service';
import { map } from 'rxjs';

export interface FirebaseDataResponse{
  [id : string] : Student;
}

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  private baseUrl = 'https://result-management-system-7b457-default-rtdb.firebaseio.com/students.json'; // Replace with your project ID

  constructor(private http: HttpClient, private studentsService: StudentService) {}

  // Fetch paginated data from a specific path
  getData(page: number, pageSize: number): Observable<Student[]> {
    return this.http.get<any>(`${this.baseUrl}?page=${page}&pageSize=${pageSize}`)
    .pipe(
        map((data) =>{
            const dataArray = Object.keys(data).map((key)=> ({
                id : key,
                ...data[key],
            }));

            console.log(dataArray);

            return dataArray
          }
        )
      );
  }


}
