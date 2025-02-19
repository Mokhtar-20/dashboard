import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { sidenavList } from 'src/app/utilities/shared-data/tools';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  sideNavData: any;
  constructor(private _modalService: NzModalService){}
  ngOnInit(): void {
    this.sideNavData = sidenavList.tabs;
  }

  logOut(){
    this._modalService.success({
      nzContent: ModalComponent,
      nzTitle: '',
      nzFooter: '',
      nzIconType: '',
      nzWidth: 450,
      nzClosable: false,
      nzCentered: true,
      nzComponentParams: {
        pathValue: 'logOut',
        title: 'Log Out',
        Description: 'Are you Sure you want to Log Out ??',
        action: 'Log Out'
      }
    })
  }
}
