import { Component, OnInit } from '@angular/core';
import { sidenavList } from 'src/app/utilities/shared-data/tools';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  sideNavData: any;
  ngOnInit(): void {
    this.sideNavData = sidenavList.tabs;
  }
}
