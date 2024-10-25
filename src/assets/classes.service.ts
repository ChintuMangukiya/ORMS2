import { Injectable } from "@angular/core";


@Injectable({
    providedIn: 'root'
})
export class classesService{

private classes = [
     [
      'English',
      'Gujarati',
      'Mathematics',
      'Environmental Studies',
      'General Knowledge',
      'Art and Craft',
      'Physical Education',
    ],
    [
      'English',
      'Gujarati',
      'Mathematics',
      'Environmental Studies',
      'General Knowledge',
      'Art and Craft',
      'Physical Education',
    ],
    [
      'English',
      'Gujarati',
      'Mathematics',
      'Environmental Studies',
      'General Knowledge',
      'Art and Craft',
      'Physical Education',
    ],
    [
      'English',
      'Gujarati',
      'Mathematics',
      'Environmental Studies',
      'General Knowledge',
      'Art and Craft',
      'Physical Education',
    ],
    [
      'English',
      'Gujarati',
      'Mathematics',
      'Environmental Studies',
      'General Knowledge',
      'Art and Craft',
      'Physical Education',
    ],
    [
      'English',
      'Gujarati',
      'Mathematics',
      'Science',
      'Social Science',
      'Computer Science',
      'Physical Education',
      'Art and Craft',
    ],
    [
      'English',
      'Gujarati',
      'Mathematics',
      'Science',
      'Social Science',
      'Computer Science',
      'Physical Education',
      'Art and Craft',
    ],
    [
      'English',
      'Gujarati',
      'Mathematics',
      'Science',
      'Social Science',
      'Computer Science',
      'Physical Education',
      'Art and Craft',
    ],
    [
      'English',
      'Gujarati',
      'Mathematics',
      'Science',
      'Social Science',
      'Computer Science',
      'Physical Education',
    ],
    [
      'English',
      'Gujarati',
      'Mathematics',
      'Science',
      'Social Science',
      'Computer Science',
      'Physical Education',
    ],
    [
      'English',
      'Physics',
      'Chemistry',
      'Mathematics',
      'Computer Science',
      'Physical Education',
    ],
    [
      'English',
      'Biology',
      'Physics',
      'Chemistry',
      'Sanskrit',
      'Physical Education',
    ],
    [
      'English',
      'Physics',
      'Chemistry',
      'Mathematics',
      'Computer Science',
      'Physical Education',
    ],
    [
      'English',
      'Biology',
      'Physics',
      'Chemistry',
      'Sanskrit',
      'Physical Education',
    ],
];
  
  getSubjects(cla:number){
    return this.classes[cla];
  }

  getClasses(){
    return this.classes;
  }
  
}