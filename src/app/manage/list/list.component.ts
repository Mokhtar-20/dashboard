import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { tablesData } from 'src/app/utilities/shared-data/list';

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
  constructor(private _activatedRoute: ActivatedRoute) {
    this._activatedRoute.params.subscribe(
      (param) => {
        this.type = param['type'];
        // console.log(this.type)
      }
    );

    this.contentTablesData = tablesData;
    this.contentData = this.contentTablesData[this.type];
    this.tableTitles = this.contentData?.titles;
    this.tableColumn = this.contentData?.column;
  }

  ngOnInit(): void {

  }
}
