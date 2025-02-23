import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SearchService } from 'src/app/utilities/services/search.service';
import { tablesData } from 'src/app/utilities/shared-data/list';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  type: any;
  contentTablesData: any;
  contentData:any;
  searchValue:string = '';
  routeSubscription: Subscription = new Subscription();
  constructor(private _searchService: SearchService, private _router: Router) {}
  ngOnInit(): void {
    this.routeSubscription = this._router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.searchValue = '';
      }
    })
  }

  search() {
    if(this.searchValue) {
      this._searchService.sendValueSelect(this.searchValue);
    } else {
      this._searchService.sendValueSelect(null);
    }
  }

  ngOnDestroy(): void {
    this.routeSubscription.unsubscribe();
  }
}
