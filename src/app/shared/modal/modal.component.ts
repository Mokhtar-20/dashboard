import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NzModalRef } from 'ng-zorro-antd/modal';
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

  constructor(private modalRef: NzModalRef, private router: Router, private deleteService: DeleteService ){}
  close() {
    this.modalRef.close(false);
  }

  submit() {
    switch(this.pathValue) {
      case "logOut":
        // this.auth.logout();
        this.modalRef.close(false);
        // this.router.navigate(['/'])
      break;
      case "delete":
        // console.log("delete"+this.id);
        this.deleteService.delete(this.EndPoint, this.id).subscribe((del) => { })
        this.modalRef.close(true);
        break;
        default:
          console.log('someThing went wrong')
    }
  }
}
