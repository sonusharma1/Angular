import { Component, OnInit } from '@angular/core';
import { Customer } from '../model/Customer';
import { CustomerService } from '../service/customer.service';
import { Response } from '../model/Response';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent implements OnInit{
  selectedCustomer : any;
  response : Response;
  totalPage : number;
  selectedPageNo = 1;
  pageNoArr = [2,3,4]
  customers : Customer[];

  constructor (private customerService : CustomerService) {}
  ngOnInit(): void {
    this.refreshCustomerData();
    console.log('In Init() method')
  }

  refreshCustomerData() {
    this.customerService.getAllCustomer(this.selectedPageNo-1).subscribe(
      res => {
        this.response = res;
        this.totalPage = this.response.totalPage;
        this.customers = this.response.responseData;
      }
    );
  }

  getNumberArray() {
    return [1,2,3,4,5];
  }

  onPageNoClick(currentPage:number) {
    this.selectedPageNo = currentPage;
    this.refreshCustomerData();
    // console.log(this.selectedPageNo)
  }

  onPageNoClick2(currentPage:number) {
    this.selectedPageNo = currentPage;
    this.refreshCustomerData();
    // console.log(this.selectedPageNo)
    if (this.pageNoArr[2]===currentPage && currentPage < this.totalPage-1) {
      for(let i = 0; i < this.pageNoArr.length; i++) {
        this.pageNoArr[i] = this.pageNoArr[i]+1;
      }
      console.log('current page => ', currentPage)
    }
    else if (this.pageNoArr[0]===currentPage && currentPage > 2) {
      for(let i = 0; i < this.pageNoArr.length; i++) {
        this.pageNoArr[i] = this.pageNoArr[i]-1;
      }
      
    }

    if (currentPage===1) {
      this.pageNoArr = [2,3,4];
      console.log('current page => ', currentPage)
    }
    if (currentPage===this.totalPage) {
      this.pageNoArr = [this.totalPage-3,this.totalPage-2,this.totalPage-1];
    }
  }
}
