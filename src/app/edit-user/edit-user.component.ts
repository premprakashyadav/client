import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Userdata } from '../models/user';
import { RestapiService } from '../services/core/restapi.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
  productForm: FormGroup;
  _id = '';
  name = '';
  gender = '';
  mobile: number = null;
  amount: number = null;
  balance: number = null;
  constructor(public rest: RestapiService, private route: ActivatedRoute, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit() {debugger;
    this.getProduct(this.route.snapshot.params['id']);
    this.productForm = this.formBuilder.group({
      name : [null, Validators.required],
      gender : [null, Validators.required],
      mobile : [null, Validators.required],
      amount : [null, Validators.required],
      balance : [null, Validators.required]
    });
  }

  getProduct(id) {
    this.rest.getProduct(id).subscribe(data => {
      this._id = data._id;
      this.productForm.setValue({
        name: data.name,
        gender: data.gender,
        mobile: data.mobile,
        amount: data.amount,
        balance: data.balance
      });
    });
  }

  onFormSubmit(form:NgForm) {
    this.rest.updateProduct(this._id, form)
      .subscribe(res => {
          this.router.navigate(['/list']);
        }, (err) => {
          console.log(err);
        }
      );
  }

  // productDetails() {
  //   this.router.navigate(['/product-details', this._id]);
  // }

}
