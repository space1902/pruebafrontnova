import { Component  } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { UserService } from './services/user.service';
import { NgModule } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  
  contactForm!: FormGroup;
  //myField = new FormControl();
  title = 'prueba_nova';

  constructor(private userService : UserService,
    private fb:FormBuilder){

      this.contactForm = fb.group({
        name: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', Validators.required],
        cargo: ['', Validators.required]
      });

  }

  ngOnInit(): void {
  }

  displayedColumns: string[] = ['name', 'lastName', 'email', 'cargo'];
  dataSource = new MatTableDataSource<PqrElement>();



  getUser(){
    this.userService.getUsers().subscribe((data: any) => {
      console.log("data ", data);
      this.procesoData(data);
    })

  }

  procesoData(resp: any){

    const data: PqrElement [] = [];

    if(resp.metadata[0].code == "00"){
      let listPqr = resp.userResponse.user;

      listPqr.forEach((element: PqrElement) => {
        data.push(element)
        console.log("se ven los elementos")
        console.log(element)
      });

      this.dataSource = new MatTableDataSource<PqrElement>(data);
    }

  }

  createUser(){
    let data = {
      name: this.contactForm.get('name')?.value,
      lastName: this.contactForm.get('lastName')?.value,
      email: this.contactForm.get('email')?.value,
      cargo: this.contactForm.get('cargo')?.value
    }


    this.userService.createUsers(data).subscribe((data:any) => {

    })

  }


}
export interface PqrElement{
  id: number;
  name: string;
  lastName: string;
  email: string;
  cargo: string;

}
