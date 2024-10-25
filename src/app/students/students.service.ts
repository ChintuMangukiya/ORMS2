import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface Student {
  gender: string;
  grNo: number;
  name: string;
  rollNo: number;
  std: string;
  id: string;
  marksArray: marksArray[];
}

export interface marksArray {
  marks: number;
  subject: string
}

@Injectable({
  providedIn: 'root',
})

export class StudentService {
  constructor(private http: HttpClient) {}

  studentChanged = new Subject<Student[]>();

  students: Student[] = [];

  getStudents(): Student[] {
    return this.students.slice();
  }

  getStudent(id: string): Student | undefined {
    return this.students.slice().find((e) => e.id == id);
  }

  setStudents(students: Student[]) {
    this.students = students;
    this.studentChanged.next(this.students.slice());
  }

  addStudents(students: Student[]) {
    this.clearStudents();

    for (const student of Array.from(students)) {
      this.students.push(student);
    }
    this.studentChanged.next(this.students.slice());
  }

  clearStudents() {
    this.students.length = 0;
    this.studentChanged.next([]);
  }

  getAvailableGrNo(): number {
    let students = this.students.sort((a, b) => a.grNo - b.grNo);

    let i = 0;
    while (students[i] != null) {
      if (students[i].grNo != i + 1) {
        return i + 1;
      }
      i++;
    }

    return i + 1;
  }

  getAvailableRollNo(std: string): number {
    let students = this.students.filter((student) => student.std === std);

    let i = 0;

    while (students[i] != null) {
      if (students[i].rollNo != i + 1) {
        return i + 1;
      }
      i++;
    }

    return i + 1;
  }
}