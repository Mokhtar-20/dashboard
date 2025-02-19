import { NgModule } from '@angular/core';
import { NzListModule } from 'ng-zorro-antd/list';
import { NZ_I18N ,en_US } from 'ng-zorro-antd/i18n';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzMessageModule } from 'ng-zorro-antd/message';

@NgModule({
  exports: [
    NzInputModule,
    NzListModule,
    NzTableModule,
    NzSwitchModule,
    NzModalModule,
    NzSelectModule,
    NzDatePickerModule,
    NzMessageModule 
  ],
  providers: [
    {
      provide: NZ_I18N, useValue: en_US
    }
  ]
})
export class ZorroModule { }
