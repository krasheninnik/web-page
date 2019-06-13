<template>
  <div class="home">
     <div class="jumbotron jumbotron-fluid">
       <div class="container">
         <h1 class="display-10">The University</h1>


           <table class="table">
           <thead class="thead-dark">  
            <tr>
              <th scope="col"><button type="button"  class="btn btn-dark" v-on:click="setAppMode('home')"> home </button></th>
              <th scope="col"><button type="button"  class="btn btn-dark" v-on:click="setAppMode('show')"> show </button></th>
              <th scope="col"><button type="button"  class="btn btn-dark" v-on:click="setAppMode('add')"> add </button></th>
            </tr>
              <tr v-if="appMode=='show' || appMode=='add'">
               <th scope="col"> <button type="button"  class="btn btn-dark" v-on:click="setMode('person')"> person </button></th>
               <th scope="col"> <button type="button"  class="btn btn-dark" v-on:click="setMode('student')"> student </button></th>
               <th scope="col"> <button type="button"  class="btn btn-dark" v-on:click="setMode('teacher')"> teacher </button> </th>
              </tr>
           </thead>
         
          </table>
          <div>
        </div>
       </div>
    </div>

    <div v-if="appMode=='home'"> 
      <img  style=" display: block; margin: 0 auto" alt="Vue logo2" src="../assets/logo2.png">
    </div>

    <div v-else-if="appMode=='add'"> 

        <div v-if="mode=='person'"> 
          <div class="row">
                <div class="col">
                <label >First name</label>
                <input v-model="name" type="text" class="form-control" placeholder="First name">
              </div>
              <div class="col">
                <label >Patronymic</label>
                <input v-model="patronymic" type="text" class="form-control" placeholder="Patronymic">
              </div>
              <div class="col">
                <label>Last name</label>
                <input v-model="lastname" type="text" class="form-control" placeholder="Last name">
              </div>
          </div>

          <div class="row">
            <div class="col">
                <label>Birth Date</label>
                <input v-model="birthDate" type="text" class="form-control" placeholder="format: day.month.year">
              </div>
              <div class="col">
                <label>Weight</label>
                <input v-model="weight" type="text" class="form-control" placeholder="The number">
              </div>
          </div>

          <button type="button" class="btn btn-dark" v-on:click="addPerson()">Input</button>
        </div>

        <div v-else-if="mode=='teacher'"> 
              <div class="row">
                <div class="col">
                  <label >First name</label>
                  <input v-model="name" type="text" class="form-control" placeholder="First name">
                </div>
                <div class="col">
                  <label >Patronymic</label>
                  <input v-model="patronymic" type="text" class="form-control" placeholder="Patronymic">
                </div>
                <div class="col">
                  <label>Last name</label>
                  <input v-model="lastname" type="text" class="form-control" placeholder="Last name">
                </div>
              </div>

              <div class="row">
                <div class="col">
                  <label>Birth Date</label>
                  <input v-model="birthDate" type="text" class="form-control" placeholder="format: day.month.year">
                </div>
                <div class="col">
                  <label>Weight</label>
                  <input v-model="weight" type="text" class="form-control" placeholder="The number">
                </div>
                <div class="col">
                    <label>Department</label>
                    <input v-model="department" type="text" class="form-control" placeholder="Department">
                  </div>
                <div class="col">
                      <label>Experience </label>
                      <input v-model="experience" type="text" class="form-control" placeholder="The number">
                </div>
                <div class="col">
                    <label>Position</label>
                    <input v-model="position" type="text" class="form-control" placeholder="Position">
                </div>
              </div>
            
            <button type="button"  class="btn btn-dark" v-on:click="addTeacher()">Input</button>
        </div>

         <div v-else-if="mode=='student'"> 
              <div class="row">
              <div class="col">
                <label >First name</label>
                <input v-model="name" type="text" class="form-control" placeholder="First name">
              </div>
              <div class="col">
                <label >Patronymic</label>
                <input v-model="patronymic" type="text" class="form-control" placeholder="Patronymic">
              </div>
              <div class="col">
                <label>Last name</label>
                <input v-model="lastname" type="text" class="form-control" placeholder="Last name">
              </div>
            </div>

            <div class="row">
              <div class="col">
                <label>Birth Date</label>
                <input v-model="birthDate" type="text" class="form-control" placeholder="format: day.month.year">
              </div>
              <div class="col">
                <label>Weight</label>
                <input v-model="weight" type="text" class="form-control" placeholder="The number">
              </div>
              <div class="col">
                  <label>Course</label>
                  <input v-model="course" type="text" class="form-control" placeholder="The number">
                </div>
              <div class="col">
                    <label>Group </label>
                    <input v-model="group" type="text" class="form-control" placeholder="The number">
              </div>
              <div class="col">
                  <label>Average Score</label>
                  <input v-model="averageScore" type="text" class="form-control" placeholder="The number">
              </div>
            </div>
          
          <button type="button"  class="btn btn-dark" v-on:click="addStudent()">Input</button>
        </div>

    </div>
  

    <div v-else-if="appMode=='show'"> 
      <div v-if="mode=='person'" v-on:click="updatePersons()"> 
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
           <tbody>
          <tr v-for="p in persons" v-bind:key="p">
                <td> {{p.Name}} </td>
                <td> {{p.Patronymic}} </td>
                <td> {{p.Lastname}} </td>
                <td> {{p.BirthDate != undefined? p.BirthDate.toStr() : "---"}} </td>
                <td> {{p.Weight != undefined? p.Weight : "---"}} </td>
          </tr>
          </tbody>
         </table>
       </div>

       <div v-else-if="mode=='teacher'" v-on:click="updateTeachers()">
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
            <tbody>
              <tr v-for="p in teachers" v-bind:key="p">
              <td> {{p.Name}} </td>
              <td> {{p.Patronymic}} </td>
              <td> {{p.Lastname}} </td>
              <td> {{p.BirthDate != undefined? p.BirthDate.toStr() : "---"}} </td>
              <td> {{p.Weight != undefined? p.Weight : "---"}} </td>
              <td> {{p.Department}} </td>
              <td> {{p.Experience}} </td>
              <td> {{p.Position}} </td>
              </tr>
            </tbody>
            </table>
       </div>

       <div v-else-if="mode=='student'" v-on:click="updateStudents()">
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
        <tbody>

        <tr v-for="p in students" v-bind:key="p">
            <td> {{p.Name}} </td>
            <td> {{p.Patronymic}} </td>
            <td> {{p.Lastname}} </td>
            <td> {{p.BirthDate != undefined? p.BirthDate.toStr() : "---"}} </td>
            <td> {{p.Weight != undefined? p.Weight : "---"}} </td>
            <td> {{p.Course}} </td>
            <td> {{p.Group}} </td>
            <td> {{p.AverageScore}} </td>
        </tr>
        </tbody> 
        </table>
       </div>
    </div>
  </div>

  
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src
import { University, IPerson, Student, Teacher, DateTime, Post } from '../university';
import addInfo from '@/components/AddInfo.vue';
import showTable from '@/components/ShowTable.vue';

@Component({
  components: {
    HelloWorld,
    addInfo,
    showTable,
  },
})

export default class Home extends Vue {
  private university: University;

  private appMode = 'home';
  private mode = 'person';
a
  // arrays for tables:
  persons: IPerson[] = [];
  students: Student[] = [];
  teachers: Teacher[] = [];

  // variables for input:
  private name: string = "asd";
  patronymic: string;  
  lastname: string;
  birthDate: string;
  weight: number;

  course: number;
  group: number;
  averageScore: number;
  department: string;
  experience: number;
  position:  Post;

  // methods to manipulate view
  private setAppMode(_mode: string) {
      this.appMode = _mode;
  }

  private setMode(_mode: string) {
    this.mode = _mode;
  }

  constructor() {
    super();
    this.university = new University();
    this.university.persons.push({Name: "Hello", Patronymic: "From", Lastname: "TS" });
    this.university.persons.push(<IPerson>{Name: "Teacher",  Patronymic:"1",  Lastname: "2",  Weight: 83, Department: "Math",  Experience: 13,  Position: 1});
    this.university.persons.push(<IPerson>{Name:"Student", Patronymic:"1", Lastname: "12", Course:2, Group:12, AverageScore: 4.2});

    this.name = "";
    this.patronymic = "";  
    this.lastname= "";
    this.birthDate = "";
    this.weight = 0;

    this.course = 0;
    this.group = 0;
    this.averageScore = 0;
    this.department = " ";
    this.experience = 0;
    this.position = 0;
 }

 // methods to update tables
 updatePersons() {
   this.persons = this.university.GetPersons();
   this.students = [];
   this.teachers = [];
 }

 updateStudents() {
   this.students = this.university.GetStudents();
   this.teachers = [];
   this.persons = [];
 }

updateTeachers() {
   this.teachers = this.university.GetTeachers();
   this.students = [];
   this.persons = [];
 }
 
 // methods to add information
 resetInput() {
    this.name = "";
    this.patronymic = "";  
    this.lastname= "";
    this.birthDate = "";
    this.weight = 0;

    this.course = 0;
    this.group = 0;
    this.averageScore = 0;
    this.department = " ";
    this.experience = 0;
    this.position = 0;
 }

 getDateTimeByString() {
   let tempBirthdate = this.birthDate.split(".");
    let day = parseInt(tempBirthdate[0]);
    let month = parseInt(tempBirthdate[1]);
    let year = parseInt(tempBirthdate[2]);
    let birthdate = new DateTime(day, month, year);
    return birthdate;
 }

 addPerson() {
    let birthdate = this.getDateTimeByString();
    this.university.persons.push({Name: this.name, Patronymic: this.patronymic, Lastname: this.lastname,
       BirthDate: birthdate, Weight: this.weight });
    this.resetInput();
 }

 addStudent() {
    let birthdate = this.getDateTimeByString();
    this.university.persons.push(<Student>{Name: this.name, Patronymic: this.patronymic, Lastname: this.lastname,
       BirthDate: birthdate, Weight: this.weight, Course: this.course,
      Group: this.group, AverageScore: this.averageScore });
    this.resetInput();
 }

addTeacher() {
    let birthdate = this.getDateTimeByString();
    this.university.persons.push(<Teacher>{Name: this.name, Patronymic: this.patronymic, Lastname: this.lastname,
       BirthDate: birthdate, Weight: this.weight, Department: this.department,
      Experience: this.experience, Position: this.position });
    this.resetInput();
}

}
</script>
 
  <style>
            h1 {
                text-align: center;
            }

            table, td, th {
              border: 1px solid black;
              text-align: center
            }
            
            table {
              border-collapse: collapse;
              width: 100%;
            }
            
            th {
              height: 50px;
            }

            caption {
                font-size: large;
                font-weight: bold;
            }

            </style>