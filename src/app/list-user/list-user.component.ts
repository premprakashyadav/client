import { Component, OnInit} from '@angular/core';
import { Userdata } from '../models/user';
import { RestapiService } from '../services/core/restapi.service';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss']
})
export class ListUserComponent implements OnInit {
  displayedColumns: string[] = ['_id', 'name', 'gender', 'mobile', 'amount', 'balance', 'updatedAt', 'action'];
  data: Userdata[] = [];
  isLoadingResults = true;
 
constructor(public rest: RestapiService) { }

  ngOnInit() {
    this.rest.getProducts()
    .subscribe(res => {
      this.data = res;
      console.log(this.data);
      this.isLoadingResults = false;
    }, err => {
      console.log(err);
      this.isLoadingResults = false;
    });
  }



  deleteProduct(id) {
    this.rest.deleteProduct(id)
      .subscribe(res => {
        console.log(res);
        this.rest.getProducts()
        .subscribe(response => {
          this.data = response;
          console.log(this.data);
          this.isLoadingResults = false;
        }, err => {
          console.log(err);
          this.isLoadingResults = false;
        });
        }, (err) => {
          console.log(err);
        }
      );
  }
}

