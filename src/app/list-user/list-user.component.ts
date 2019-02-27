import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Userdata } from '../models/user';
import { RestapiService } from '../services/core/restapi.service';
import { MatSort, MatTableDataSource, MatPaginator } from '@angular/material';
import { HttpClient} from '@angular/common/http';
import {MatSnackBar} from '@angular/material';
@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss']
})
export class ListUserComponent implements OnInit {
  displayedColumns: string[] = ['_id', 'name', 'gender', 'mobile', 'comment', 'balance', 'updatedAt', 'action'];
  data: Userdata[] = [];
  isLoadingResults = true;
  dataSource = new MatTableDataSource(this.data);
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
 constructor(public rest: RestapiService, private http: HttpClient, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.rest.getProducts()
    .subscribe(res => {
      this.data = res;
      this.dataSource = new MatTableDataSource(this.data);
      this.isLoadingResults = false;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, err => {
      console.log(err);
      this.isLoadingResults = false;
    });
  }

 

sendSms(callnumber, balance) {

   const pattern = /[0-9\+\-\ ]/;
   var inputChar;
   if (callnumber != null) {
   inputChar = String.fromCharCode(callnumber.charCode);
   }

 

   if (!pattern.test(inputChar) && pattern.test(callnumber) && callnumber.toString().length === 10) {
    const bodycontent = '';
  // tslint:disable-next-line:max-line-length
    const apiUrl = 'https://www.smsgatewayhub.com/api/mt/SendSMS?APIKey=veJdwhbYB0mWoM7TfEZdGA&senderid=SURGIC&channel=2&DCS=0&flashsms=0&number=' + callnumber + '&text=You have not paid Rs: ' + balance + ' .' + 'Please paid as soon as possible.&route=1';
    this.snackBar.open('SMS has been sent to patient', '', {duration: 2000, verticalPosition: 'top', panelClass: 'activecolor'});
    return this.http.post(apiUrl, bodycontent).subscribe(res => {
    console.log(res);
   
   });

 
  } else {
    this.snackBar.open('Error:Mobile Number is not proper', '', {duration: 2000, verticalPosition: 'top', panelClass: 'activecolor'});
  }



}


  deleteProduct(id) {
    this.rest.deleteProduct(id)
      .subscribe(res => {
        console.log(res);
        this.rest.getProducts()
        .subscribe(response => {
          this.data = response;
          this.dataSource = new MatTableDataSource(this.data);
          this.isLoadingResults = false;
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }, err => {
          console.log(err);
          this.isLoadingResults = false;
        });
        }, (err) => {
          console.log(err);
        }
      );
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}

