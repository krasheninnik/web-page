//alert("Hello from MAIN witout promises!");
//import { promises as fsPromises } from "fs";
//alert("Hello from MAIN with promises!");

class DateTime {
    Day: number;
    Month: number;
    Year: number;

    constructor(day: number, month: number, year: number){
      this.Day = day;
      this.Month = month;
      this.Year = year;
    }
    
    toStr() : string {
      return `${this.Day}.${this.Month}.${this.Year}`;
    }
    
}

enum Post {
  Assistant,
  Lecturer,
  SeniorLecturer,
  AssistantProfessor,
  Professor
}

interface IPerson {
    Name: string;
    Patronymic: string ;
    Lastname: string ;
    BirthDate?: DateTime;
    Weight?: number;
}

class Student {
    Name: string;
    Patronymic: string ;  
    Lastname: string ;
    BirthDate: DateTime;
    Weight: number;
    Course: number;
    Group: number;
    AverageScore: number;

    constructor( name: string,  patronymic: string ,
      lastname: string , birthDate: DateTime,
      weight: number, course: number,
      group: number,  averageScore: number) {
        this.Name = name;
        this.Patronymic = patronymic;
        this.Lastname = lastname;
        this.BirthDate = birthDate;
        this.Weight = weight;
        this.Course = course;
        this.Group = group;
        this.AverageScore = averageScore;
      }
}

class Teacher { 
    Name: string;
    Patronymic: string;
    Lastname: string;
    BirthDate: DateTime;
    Weight: number;
    Department: string;
    Experience: number;
    Position:  Post;

    constructor(name: string, patronymic: string,
      lastname: string,  birthDate: DateTime,
      weight: number, department: string,
      experience: number, position: Post){
        this.Name = name;
        this.Patronymic = patronymic ;
        this.Lastname=  lastname;
        this.BirthDate = birthDate;
        this.Weight = weight;
        this.Department = department;
        this.Experience = experience; 
        this.Position = position;
      }
}

function CompareWeightDecrease(a: IPerson, b: IPerson) {
  // for set IPersons without .Weight in the end of list:
  if(a.Weight === undefined) return 1;
  if(b.Weight === undefined) return -1;

  // sort by decreasing weight:
  if (a.Weight  >  b.Weight) return -1;
  if (a!.Weight === b!.Weight) return  0;
  return 1; 
}


function ComparePositionIncrease(a: IPerson, b: IPerson) {
  const aa = <Teacher>a;
  const bb = <Teacher>b;

  // for set IPerson without .Position in the end of list:
  if(aa.Position === undefined) return -1;
  if(bb.Position === undefined) return 1; 

  // for sort by increasing position
  if (aa.Position  <  bb.Position) return -1;
  if (aa.Position === bb.Position) return  0;
  return 1;
}

class University {  // отсортировать в соответствии с вариантом 
    persons: IPerson[];             // 8. по убыванию веса
    
    FindByLastName(lastName:string):IPerson[] {
      let result: IPerson[] = [];

      for(const person of this.persons)
        if(person.Lastname === lastName) result.push(person);

      return result;
    }

    // Для четных вариантов. Выдать всех преподавателей, название кафедры которых содержит
    // заданный текст. Отсортировать по должности.
    
    FindByNameOfDepartment(department: string){
      let result: Teacher[] = [];

      for(const p of this.persons) {
          if (isTeacher(p) && p.Department.indexOf(department) >= 0) {
           result.push(p);
        }
      }

      result.sort(ComparePositionIncrease);      
      return result;
    }
 
    constructor() {
      this.persons = [];
    }

    GetPersons(){
      this.persons.sort(CompareWeightDecrease);
      for(const p of this.persons) console.log(p);     
      return this.persons; 
    }


    GetStudents(){
      let result: Student[] = [];
     
      for(const p of this.persons) 
        if (isStudent(p)) result.push(p);
     
      result.sort(CompareWeightDecrease);
      return result;
    }

    GetTeachers(){
      let result: Teacher[] = [];
      for(const p of this.persons)
          if (isTeacher(p)) result.push(p);
        

      result.sort(CompareWeightDecrease);
      return result;
    }
}

function isStudent(p: IPerson ): p is Student {
   return (<Teacher>p).Department == undefined && (<Student>p).Group != undefined;
} 

function isTeacher(p: IPerson): p is  Teacher{
  return (<Student>p).Group == undefined && (<Teacher>p).Department != undefined;
}


let u = new University();
u.persons.push({Name: "Hello", Patronymic: "From", Lastname: "TS" });
u.persons.push(<IPerson>{Name: "Teacher",  Patronymic:"1",  Lastname: "2",  Weight: 83,
  Department: "Math",  Experience: 13,  Position: 1});
u.persons.push(<IPerson>{Name:"Student", Patronymic:"1", Lastname: "12", Course:2, Group:12, AverageScore: 4.2});

// server == statical resorur
// lad json
// from form

function showTablePersons() {
  let a = document.getElementById("DisplayTableID");
  if(a == null) alert("Element by ID not found!");
  else {
  a.innerHTML = "<table> <caption> processing </caption> </table>";

  let persons = u.GetPersons();

  let table = `
  <table class="table">
  <thead class="thead-dark">  
    <tr>
      <th scope="col">Name</th>
      <th scope="col">Patronymic</th>
      <th scope="col">Lastname</th>
      <th scope="col">BirthDate</th>
      <th scope="col">Weight</th>
   </tr>
   </thead>
  `
  table += '<tbody>'

  for(const p of persons) {
   table += `<tr>`;
      table += `<td> ${p.Name} </td>`;
      table += `<td> ${p.Patronymic} </td>`;
      table += `<td> ${p.Lastname} </td>`;
      table += `<td> ${p.BirthDate != undefined? p.BirthDate.toStr() : "---"} </td>`;
      table += `<td> ${p.Weight != undefined? p.Weight : "---"} </td>`;
   table += `</tr>`;
  }

  table += `</tbody> </table>`;
  a.innerHTML = table;
 }
}

function showTableTeachers() {
  let a = document.getElementById("DisplayTableID");

  if(a == null) alert("Element by ID not found!")
  else {
  a.innerHTML = "<table> <caption> processing </caption> </table>";

  let teachers = u.GetTeachers();

  let table = `
  <table class="table">
  <thead class="thead-dark">  
    <tr>
      <th scope="col">Name</th>
      <th scope="col">Patronymic</th>
      <th scope="col">Lastname</th>
      <th scope="col">BirthDate</th>
      <th scope="col">Weight</th>
      <th scope="col">Department</th>
      <th scope="col">Experience</th>
      <th scope="col">Position</th>
   </tr>
   </thead>
  `

  table += '<tbody>'

  for(const p of teachers) {
   table += `<tr>`;
      table += `<td> ${p.Name} </td>`;
      table += `<td> ${p.Patronymic} </td>`;
      table += `<td> ${p.Lastname} </td>`;
      table += `<td> ${p.BirthDate != undefined? p.BirthDate.toStr() : "---"} </td>`;
      table += `<td> ${p.Weight != undefined? p.Weight : "---"} </td>`;
      table += `<td> ${p.Department} </td>`;
      table += `<td> ${p.Experience} </td>`;
      table += `<td> ${p.Position} </td>`;
   table += `</tr>`;
  }

  table += `</tbody> </table>`; 
  a.innerHTML = table;
 }
}


function showTableStudents() {
  let a = document.getElementById("DisplayTableID");

  if(a == null) alert("Element by ID not found!")
  else {
  a.innerHTML = "<table> <caption> processing </caption> </table>";

  let students = u.GetStudents();

  let table = `
  <table class="table">
  <thead class="thead-dark">  
    <tr>
      <th scope="col">Name</th>
      <th scope="col">Patronymic</th>
      <th scope="col">Lastname</th>
      <th scope="col">BirthDate</th>
      <th scope="col">Weight</th>
      <th scope="col">Course</th>
      <th scope="col">Group</th>
      <th scope="col">AverageScore</th>
    </tr>
   </thead>
  `
  table += '<tbody>'

  for(const p of students) {
   table += `<tr>`;
      table += `<td> ${p.Name} </td>`;
      table += `<td> ${p.Patronymic} </td>`;
      table += `<td> ${p.Lastname} </td>`;
      table += `<td> ${p.BirthDate != undefined? p.BirthDate.toStr() : "---"} </td>`;
      table += `<td> ${p.Weight != undefined? p.Weight : "---"} </td>`;
      table += `<td> ${p.Course} </td>`;
      table += `<td> ${p.Group} </td>`;
      table += `<td> ${p.AverageScore} </td>`;
   table += `</tr>`;
  }

  table += `</tbody> </table>`;
  a.innerHTML = table;
 }
}


function hideTable() {
  let a = document.getElementById("DisplayTableID");

  if(a == null) alert("Element by ID not found!")
  else a.innerHTML = "";
}

function hideForm() {
  let a = document.getElementById("addFormID");
  if(a == null) alert("Element by ID not found!");
  else a.innerHTML = ``;
}

//<input type='button' value='Add person' onclick='addPerson()' /> 
//<input type='button' value='Add teacher' onclick='addTeacher()' /> 
//<input type='button' value='Add student' onclick='addStudent()' /> 

function addPersonForm() {
  let a = document.getElementById("addFormID");
  if(a == null) alert("Element by ID not found!");
  else {

  a.innerHTML = `       <form id="form">
  <div class="row">
    <div class="col">
      <label >First name</label>
      <input type="text" class="form-control" placeholder="First name">
    </div>
    <div class="col">
      <label >Patronymic</label>
      <input type="text" class="form-control" placeholder="Patronymic">
    </div>
    <div class="col">
      <label>Last name</label>
      <input type="text" class="form-control" placeholder="Last name">
    </div>
  </div>

  <div class="row">
    <div class="col">
      <label>Birth Date</label>
      <input type="text" class="form-control" placeholder="format: day.month.year">
    </div>
    <div class="col">
      <label>Weight</label>
      <input type="text" class="form-control" placeholder="The number">
    </div>
  </div>
  <div class="row"></div>
 </div>

 <button type="button"  class="btn btn-dark" onclick="addPerson()">Input</button>
</form>`

   }
}

function addPerson() {
  let form = document.forms.namedItem("form");;
  
  if( form != null){
    let name = (<any>form[0]).value;
    let patronymic = (<any>form[1]).value;
    let lastname = (<any>form[2]).value;
    let tempBirthdate = (<any>form[3]).value.split(".");
    let weight = (<any>form[4]).value;

    let day = parseInt(tempBirthdate[0]);
    let month = parseInt(tempBirthdate[1]);
    let year = parseInt(tempBirthdate[2]);

    let birthdate = new DateTime(day, month, year);
    
    u.persons.push({Name: name, Patronymic: patronymic, Lastname: lastname,
       BirthDate: birthdate, Weight: weight });
  }
}


function addTeacherForm() {
  let a = document.getElementById("addFormID");
  if(a == null) alert("Element by ID not found!");
  else {

  a.innerHTML = `<form id="form">
  <div class="row">
    <div class="col">
      <label >First name</label>
      <input type="text" class="form-control" placeholder="First name">
    </div>
    <div class="col">
      <label >Patronymic</label>
      <input type="text" class="form-control" placeholder="Patronymic">
    </div>
    <div class="col">
      <label>Last name</label>
      <input type="text" class="form-control" placeholder="Last name">
    </div>
  </div>

  <div class="row">
    <div class="col">
      <label>Birth Date</label>
      <input type="text" class="form-control" placeholder="format: day.month.year">
    </div>
    <div class="col">
      <label>Weight</label>
      <input type="text" class="form-control" placeholder="The number">
    </div>
    <div class="col">
        <label>Department</label>
        <input type="text" class="form-control" placeholder="Department">
      </div>
    <div class="col">
          <label>Experience </label>
          <input type="text" class="form-control" placeholder="The number">
    </div>
    <div class="col">
        <label>Position</label>
        <input type="text" class="form-control" placeholder="Position">
    </div>
  </div>
 
 <button type="button"  class="btn btn-dark" onclick="addTeacher()">Input</button>
 
</form>`

   }
}

function addTeacher() {
  let form = document.forms.namedItem("form");;
  
  if( form != null){
    let name = (<any>form[0]).value;
    let patronymic = (<any>form[1]).value;
    let lastname = (<any>form[2]).value;
    let tempBirthdate = (<any>form[3]).value.split(".");
    let weight = (<any>form[4]).value;
    let department = (<any>form[5]).value;
    let experience = (<any>form[6]).value;
    let position = (<any>form[7]).value;

    let day = parseInt(tempBirthdate[0]);
    let month = parseInt(tempBirthdate[1]);
    let year = parseInt(tempBirthdate[2]);

    let birthdate = new DateTime(day, month, year);
    //u.persons.push({Name: name, Patronymic: patronymic, Lastname: lastname});
    u.persons.push(<Teacher>{Name: name, Patronymic: patronymic, Lastname: lastname,
       BirthDate: birthdate, Weight: weight, Department: department,
      Experience: experience, Position: position });
  }
}

function addStudentForm() {
  let a = document.getElementById("addFormID");
  if(a == null) alert("Element by ID not found!");
  else {

  a.innerHTML = `<form id="form">
  <div class="row">
    <div class="col">
      <label >First name</label>
      <input type="text" class="form-control" placeholder="First name">
    </div>
    <div class="col">
      <label >Patronymic</label>
      <input type="text" class="form-control" placeholder="Patronymic">
    </div>
    <div class="col">
      <label>Last name</label>
      <input type="text" class="form-control" placeholder="Last name">
    </div>
  </div>

  <div class="row">
    <div class="col">
      <label>Birth Date</label>
      <input type="text" class="form-control" placeholder="format: day.month.year">
    </div>
    <div class="col">
      <label>Weight</label>
      <input type="text" class="form-control" placeholder="The number">
    </div>
    <div class="col">
        <label>Course</label>
        <input type="text" class="form-control" placeholder="The number">
      </div>
    <div class="col">
          <label>Group </label>
          <input type="text" class="form-control" placeholder="The number">
    </div>
    <div class="col">
        <label>Average Score</label>
        <input type="text" class="form-control" placeholder="The number">
    </div>
  </div>
 
 <button type="button"  class="btn btn-dark" onclick="addStudent()">Input</button>
 
</form>`

   }
}

function addStudent() {
  let form = document.forms.namedItem("form");
  
  if( form != null){
    let name = (<any>form[0]).value;
    let patronymic = (<any>form[1]).value;
    let lastname = (<any>form[2]).value;
    let tempBirthdate = (<any>form[3]).value.split(".");
    let weight = (<any>form[4]).value;
    let course = (<any>form[5]).value;
    let group = (<any>form[6]).value;
    let averageScore = (<any>form[7]).value;

    let day = parseInt(tempBirthdate[0]);
    let month = parseInt(tempBirthdate[1]);
    let year = parseInt(tempBirthdate[2]);

    let birthdate = new DateTime(day, month, year);
    //u.persons.push({Name: name, Patronymic: patronymic, Lastname: lastname});
    u.persons.push(<Student>{Name: name, Patronymic: patronymic, Lastname: lastname,
       BirthDate: birthdate, Weight: weight, Course: course,
      Group: group, AverageScore: averageScore });
  }
}