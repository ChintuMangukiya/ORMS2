import { Component, OnInit } from '@angular/core';
import { StudentService } from '../students/students.service';
import { DataStorageSrevice } from '../data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private dataStorageService: DataStorageSrevice){
    this.dataStorageService.fetchStudents();
  }

  ngOnInit(): void {
  }

}
