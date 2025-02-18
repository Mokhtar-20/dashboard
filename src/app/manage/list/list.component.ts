import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { GetService } from 'src/app/utilities/services/get.service';
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
  routeSubscription: Subscription = new Subscription();
  listSubscriptions: Subscription = new Subscription();
  constructor(private _activatedRoute: ActivatedRoute, private _router: Router, private _getService: GetService) {
    this._activatedRoute.params.subscribe(
      (param) => {
        this.type = param['type'];
        // console.log(this.type)
      }
    );

  }

  ngOnInit(): void {
    this.contentTablesData = tablesData;
    this.contentData = this.contentTablesData[this.type];
    this.tableTitles = this.contentData?.titles;
    this.tableColumn = this.contentData?.column;
    this.apiUrl = URLs;
    this.url = this.apiUrl[this.type];
    this.getListData();
    
    // Subscribe to router events to handle navigation changes
    this.routeSubscription = this._router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.routeSubscription.unsubscribe(); 
        this.ngOnInit(); 
      }
    })
  }

  getListData() {
    this.loading = true;
    this.listSubscriptions.add(this._getService.get(this.url).subscribe((data) => {
      console.log(data);
      this.listOfData = data;
      setTimeout(() => {
        this.loading = false;
      }, 500);
    }))
  }
}
