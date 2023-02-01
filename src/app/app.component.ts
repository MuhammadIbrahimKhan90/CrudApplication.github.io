import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { timeout } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2'
import { FormControl, FormGroup, NgControlStatus, Validators } from '@angular/forms';
import { Action } from './titlename/action.enum';
import { mushmatch } from './mush-match-validator';
import { UserApiService } from './titlename/user-api.service';
import { user } from './titlename/user.interface';
import { Employee } from './employee';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  viewProviders:[Employee]
})
export class AppComponent implements OnInit {


  title = 'Crud_Operation';
  forms!: FormGroup;
  submitted: boolean = false;
  modelref: any;
  DynamicText: string = "";
  DynamicUser: string = "";
  dbops: Action | undefined;
  userData: user[] = [];
  

  @ViewChild('content') elcontent: any;

  constructor(private _tostr: ToastrService, private modalService: NgbModal, private userapiservice: UserApiService,private shhs:Employee) {
  shhs.show()
  }
  ngOnInit() {
    this.setFormState();
    this.getUsersapi();
  }

  setFormState() {
    this.DynamicText = "Save";
    this.DynamicUser = "Add User"
    this.dbops = Action.create;

    this.forms = new FormGroup({
      id: new FormControl(0),
      title: new FormControl('', Validators.required),
      firstname: new FormControl('', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(10)])),
      lastname: new FormControl('', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(10)])),
      email: new FormControl('', Validators.compose([Validators.required, Validators.email])),
      dob: new FormControl('', Validators.compose([Validators.required, Validators.pattern(/^(\d{4})-(\d{2})-(\d{2})$/)])),
      password: new FormControl('', Validators.compose([Validators.required, Validators.minLength(6)])),
      confirmpassword: new FormControl('', Validators.compose([Validators.required])),
      acceptTerms: new FormControl(false, Validators.requiredTrue)
    },
      mushmatch('password', 'confirmpassword'))
  }

  getUsersapi() {
    this.userapiservice.getUsers().subscribe((res: user[]) => {
      this.userData = res;
    });
  }
  get ctrl() {
    return this.forms.controls;
  }

  // save button 
  AdUsers() {
    this.submitted = true;
    
    if (this.forms.invalid) {
      return;
    }
    switch (this.dbops) {
      case Action.create:
        // Code here to save data in database
        this.userapiservice.addUser(this.forms.value).subscribe(res =>{
          this._tostr.success("User Added Successfully", "Add User");
          this.getUsersapi();
          this.cancelform();
        });
        break;
        case Action.update:
        // Code here to save data in database
        this.userapiservice.updateUser(this.forms.value).subscribe(res =>{
          this._tostr.success("User Added Successfully", "Add User");
          this.getUsersapi();
          this.cancelform();
        });
        break;
    }
  }

  // cancel button 
  cancelform() {
    this.DynamicText = "Save";
    this.DynamicUser = "Add User"
    this.submitted = false;
    this.dbops = Action.create;
    this.forms.reset({
      id: 0,
      title: '',
      firstname: '',
      lastname: '',
      email: '',
      dob: '',
      password: '',
      confirmpassword: '',
      acceptTerms: false
    });
    this.modelref.close();

  }

  // Add User Button 
  openXl(content: any) {
    this.modelref = this.modalService.open(content, { size: 'xl' });

  }

  // Edit Button 
  edit(userId: number) {
    this.DynamicText = "Update";
    this.DynamicUser = "Update User";
    this.dbops = Action.update;

    let data =this.userData.find((u: user) => u.id === userId); 
    this.forms.patchValue(data);

    this.forms.get('password').setValue('');
    this.forms.get('confirmpassword').setValue('');
    this.forms.get('acceptTerms').setValue(false);

    this.modelref = this.modalService.open(this.elcontent, { size: 'xl' });
  }

  // edit(content: any) {
  //   this.modalService.open(content, { size: 'xl' });
  // }

  // Delete Button 
  delete(id: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this record!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.userapiservice.deleteUser(id).subscribe(res=>{
          this.getUsersapi()
          Swal.fire(
            'Deleted!',
            'User Data has been deleted.',
            'success'
          )
        })
      } else {
        Swal.fire(
          'cancle!',
          'Your record has been not deleted.',
          'error'
        )
      }
    })
  }
}



