import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Student, StudentService } from '../students/students.service';
import { DataStorageSrevice } from '../data-storage.service';
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-report-card',
  templateUrl: './report-card.component.html',
  styleUrls: ['./report-card.component.css']
})

export class ReportCardComponent implements OnInit {

  failed = false;

  id: string = '';

  studentNotFound?: boolean;

  isLoading = true;

  total = 0;

  subLength = 0;

  Student: Student | undefined;

  studentSubscription!: Subscription;

  constructor(private http: HttpClient, private route: ActivatedRoute, private studentsService: StudentService, private dataStorageService: DataStorageSrevice) {

  }




  ngOnInit(): void {

    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
    });

    this.studentSubscription = this.studentsService.studentChanged.subscribe((e: Student[]) => {
      this.Student = this.studentsService.getStudent(this.id);

      if(!this.Student){
        this.studentNotFound = true;
      }
      else{
        this.studentNotFound = false;
      }

      this.isLoading= false;

      this.subLength = this.Student?.marksArray.length || 1;

      this.Student?.marksArray.every(e => {
        if (e.marks < 33) {
          this.failed = true;
        }

        this.total = this.total + e.marks;

      })
    }

    );
  }
}