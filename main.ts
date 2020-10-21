import { Course } from './course.js';

import { dataCourses } from './dataCourses.js';

import {Student } from './student.js';

import {dataStudent } from './dataStudent.js';

let studentTbody: HTMLElement = document.getElementById('students')!;
let coursesTbody: HTMLElement = document.getElementById('courses')!;

const btnfilterByName: HTMLElement = document.getElementById("button-filterByName")!;
const btnfilterByCreditos: HTMLElement = document.getElementById("button-filterByCreditos")!;


const inputSearchBox: HTMLInputElement = <HTMLInputElement> document.getElementById("search-box")!;

const inputSearchBoxC1: HTMLInputElement = <HTMLInputElement> document.getElementById("search-box1")!;
const inputSearchBoxC2: HTMLInputElement = <HTMLInputElement> document.getElementById("search-box2")!;


const totalCreditElm: HTMLElement = document.getElementById("total-credits")!;


btnfilterByName.onclick = () => applyFilterByName();
btnfilterByCreditos.onclick= ()=> applyFilterByCreditos();

renderStudentInTable(dataStudent);
renderCoursesInTable(dataCourses);


totalCreditElm.innerHTML = `${getTotalCredits(dataCourses)}`

function renderCoursesInTable(courses: Course[]): void {
  console.log('Desplegando cursos');
  courses.forEach((course) => {
    let trElement = document.createElement("tr");
    trElement.innerHTML = `<td>${course.name}</td>
                           <td>${course.professor}</td>
                           <td>${course.credits}</td>`;
    coursesTbody.appendChild(trElement);
  });
}
function renderStudentInTable(student: Student[]): void {
  console.log('Desplegando cursos');
  student.forEach((student) => {
    let trElement = document.createElement("tr");
    trElement.innerHTML = `<td>${student.type}</td>
                           <td>${student.info}</td>`;
    studentTbody.appendChild(trElement);
  });
}
 

function applyFilterByName() { 
  let text = inputSearchBox.value;
  text = (text == null) ? '' : text;
  clearCoursesInTable();
  let coursesFiltered: Course[] = searchCourseByName(text, dataCourses);
  renderCoursesInTable(coursesFiltered);
}

function searchCourseByName(nameKey: string, courses: Course[]) {
  return nameKey === '' ? dataCourses : courses.filter( c => 
    c.name.match(nameKey));
}

function applyFilterByCreditos() { 
  let mayor = +inputSearchBoxC1.value;
  let menor = +inputSearchBoxC2.value;
  clearCoursesInTable();
  let coursesFiltered: Course[] = searchCourseByCredits(mayor, menor, dataCourses);
  renderCoursesInTable(coursesFiltered);
}

function searchCourseByCredits(mayor: number, menor: number, courses: Course[]){
  let cursos : Course[] = courses.filter(c=>c.credits>=mayor && c.credits<=menor);
  return cursos; 
}

function getTotalCredits(courses: Course[]): number {
  let totalCredits: number = 0;
  courses.forEach((course) => totalCredits = totalCredits + course.credits);
  return totalCredits;
}

function clearCoursesInTable() {
  while (coursesTbody.hasChildNodes()) {
    if (coursesTbody.firstChild != null) {
      coursesTbody.removeChild(coursesTbody.firstChild);
     
    }
  }
}