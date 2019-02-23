import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Userdata } from '../models/user';
import { RestapiService } from '../services/core/restapi.service';


@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
productForm: FormGroup;
name = '';
gender = '';
mobile: number = null;
amount: number = null;
balance: number = null;

  constructor(public rest: RestapiService, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.productForm = this.formBuilder.group({
      name : [null, Validators.required],
      gender : [null, Validators.required],
      mobile : [null, Validators.required],
      amount : [null, Validators.required],
      balance : [null, Validators.required]
    });
  }


  onFormSubmit(form: NgForm) {
    this.rest.addProduct(form).subscribe(res => {
          this.router.navigate(['/list']);
        }, (err) => {
          console.log(err);
        });
  }


}
