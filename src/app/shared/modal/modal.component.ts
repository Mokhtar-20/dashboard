import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { AuthService } from 'src/app/utilities/services/auth.service';
import { DeleteService } from 'src/app/utilities/services/delete.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
  @Input() title!: string;
  @Input() pathValue!: string;
  @Input() Description!: string;
  @Input() action!: string;
  @Input() id!: any;
  @Input() EndPoint!: any;
  isSubmit: boolean = false;

  constructor(private _modalRef: NzModalRef, private _router: Router, private _deleteService: DeleteService,  private _authService: AuthService ){}
  close() {
    this._modalRef.close(false);
  }

  submit() {
    switch(this.pathValue) {
      case "logOut":
        this._authService.logout();
        this._modalRef.close(false);
        // this.router.navigate(['/'])
      break;
      case "delete":
        // console.log("delete"+this.id);
        this._deleteService.delete(this.EndPoint, this.id).subscribe((del) => { })
        this._modalRef.close(true);
        break;
        default:
          console.log('someThing went wrong')
    }
  }
}
