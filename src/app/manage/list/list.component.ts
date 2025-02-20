import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Subscription } from 'rxjs';
import { ModalComponent } from 'src/app/shared/modal/modal.component';
import { GetService } from 'src/app/utilities/services/get.service';
import { SearchService } from 'src/app/utilities/services/search.service';
import { tablesData } from 'src/app/utilities/shared-data/list';
import { URLs } from 'src/app/utilities/shared-data/urls';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  type: any;
  contentTablesData: any;
  contentData: any;
  tableTitles: any;
  tableColumn: any;
  apiUrl: any;
  url: any;
  listOfData!: any[];
  loading = false;
  valueSelect: any = '';
  pageIndex!: number;
  pageSize!: number;
  totalTableElms!: number;
  routeSubscription: Subscription = new Subscription();
  listSubscriptions: Subscription = new Subscription();
  totalTableSubscriptions: Subscription = new Subscription();
  navbarSub: Subscription = new Subscription();
  constructor(private _activatedRoute: ActivatedRoute, private _router: Router, private _getService: GetService, private _modalService : NzModalService, private _message: NzMessageService, private _searchService: SearchService) {
    this._activatedRoute.params.subscribe(
      (param) => {
        this.type = param['type'];
        // console.log(this.type)
      }
    );

    this.navbarSub = this._searchService.getValueSelect().subscribe(valueSelect => {
      this.valueSelect = valueSelect;
      if (this.valueSelect != null) {
        this.getListData(1,this.valueSelect);
      } else {
        this.getListData();
      }
    })
  }

  ngOnInit(): void {
    this.contentTablesData = tablesData;
    this.contentData = this.contentTablesData[this.type];
    this.tableTitles = this.contentData?.titles;
    this.tableColumn = this.contentData?.column;
    this.apiUrl = URLs;
    this.url = this.apiUrl[this.type];
    this.pageIndex = 1;
    this.pageSize = 10;
    this.getTotalTableElms();
    this.getListData();
    // Subscribe to router events to handle navigation changes
    this.routeSubscription = this._router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.routeSubscription.unsubscribe(); 
        this.ngOnInit(); 
      }
    })
  }

  getTotalTableElms() {
    this.totalTableSubscriptions.add(this._getService.get(this.url).subscribe((data) => {
      this.totalTableElms = data.length;
    }))
  }

  getListData(e?:any, search?: any) {
    this.loading = true;
    if (e) {
      this.pageIndex = e ;
    }
    if(search) {
      this.listSubscriptions.add(this._getService.get(this.url + `?page=${this.pageIndex}&limit=${this.pageSize}&search=${search}`).subscribe((data) => {
        console.log(data);
        this.listOfData = data;
        setTimeout(() => {
          this.loading = false;
        }, 500);
      }))
    } else {
      this.listSubscriptions.add(this._getService.get(this.url + `?page=${this.pageIndex}&limit=${this.pageSize}`).subscribe((data) => {
        console.log(data);
        this.listOfData = data;
        setTimeout(() => {
          this.loading = false;
        }, 500);
      }))
    }
  }

  deleteItem(id: any) { 
    const removeElement = this._modalService.success({
      nzContent: ModalComponent,
      nzTitle: '',
      nzFooter: '',
      nzIconType: '',
      nzWidth: 450,
      nzClosable: false,
      nzCentered: true,
      nzComponentParams: {
        pathValue: 'delete',
        title: 'Delete',
        id: id,
        EndPoint: this.url,
        Description: `Are you Sure you want to ${this.contentData?.delete_title} ?`,
        action: 'Delete'
      }
    })
    removeElement.afterClose.subscribe(
      res => {
        if(res) {
          this.getListData();
          this._message.create('success', `${this.contentData?.massage}`, { nzDuration: 2000 });
        }
      }
    )
  }
}
