import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';
import { GetService } from 'src/app/utilities/services/get.service';
import { PostService } from 'src/app/utilities/services/post.service';
import { EditFormFields } from 'src/app/utilities/shared-data/editFormData';
import { tablesData } from 'src/app/utilities/shared-data/list';
import { URLs } from 'src/app/utilities/shared-data/urls';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit, OnDestroy {
  type: any;
  id: any;
  contentTablesData: any;
  contentData: any;
  formFields: any;
  edit_form: any;
  apiUrl: any;
  url: any;
  recordData: any;
  formData: FormData;
  mainForm: FormGroup;
  fieldsCtrls: any = {};
  imageSrc: any = new Map();
  imageSizeError: any = new Map();
  dataSubscriptions : Subscription = new Subscription();
  editSubscriptions : Subscription = new Subscription();
  constructor(private _activatedRoute: ActivatedRoute, private _getService: GetService, private _postService: PostService, private _router: Router, private _spinner: NgxSpinnerService) {
    this._activatedRoute.params.subscribe(
      (param) => {
        this.type = param['type'];
        this.id = param['id'];
      }
    );
    this.apiUrl = URLs;
    this.url = this.apiUrl[this.type]
    this.contentTablesData = tablesData;
    this.contentData = this.contentTablesData[this.type];
    this.formFields = EditFormFields;
    this.edit_form = this.formFields[this.type];
    this.createForm(this.edit_form);
    
    this.formData = new FormData();
    this.mainForm = new FormGroup(this.fieldsCtrls);
  }

  ngOnInit(): void {
    this._spinner.show();
    setTimeout(() => {
      this.getRecordData();
    }, 500);
  }

  getRecordData() {
    this.dataSubscriptions.add(this._getService.getSingle(this.url, this.id).subscribe((data) => {
      this.recordData = data;
      this.mainForm.patchValue(this.recordData);
      this.renderingSectionImages();
      // console.log(this.recordData)
      this._spinner.hide();
    }))
  }

  createForm(fields: any) {
    let is_required;
    for (let f of fields) {
      if(f.required){
        is_required = Validators.required;
      } else {
        is_required = null
      }
      this.fieldsCtrls[f.name] = new FormControl(f.value || '', is_required);
      if (f.type == 'file') {
        this.imageSrc[f.name] = f.value;
        this.imageSizeError[f.name] = false;
      }
      if (f.name == 'email' ) {
        this.fieldsCtrls[f.name] = new FormControl(f.value || '',[Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$')])
      }
    }
  }

  triggerClick(fieldID: any) {
    document.getElementById(fieldID)!.click();
  }

  renderingSectionImages() {
    if(this.recordData.avatar != null) {
      for (let fieldName in this.imageSrc) {
        this.imageSrc[fieldName] = this.recordData.avatar;
      }
    } else if(this.recordData.image != null) {
      for (let fieldName in this.imageSrc) {
        this.imageSrc[fieldName] = this.recordData.image;
      }
    } else {
      return;
    }
  }

  upload(event: any, fieldName: any) {
    let fileSize;
    const file: File = event.target.files[0];
    fileSize = Math.round(file.size / 1024);
    let vaildSize = fileSize <= 9216;

    const reader = new FileReader();

    if (event.target.files.length && vaildSize) {
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imageSrc[fieldName] = reader.result as string;
      };
    } else {
      this.imageSizeError[fieldName] = true;
    }
  }

  submit(form: any) { 
    if(form.valid) {
      let fields: any = [];
      fields = fields.concat(this.edit_form);
      let value: any;
      for (let f of fields) {
        switch (f.type) {
          case 'file':
            if(this.imageSrc != '') {
              this.formData.set(f.name, this.imageSrc[f.name]);
            }
          break;
          default:
            value = form.value[f.name];
            if(value != '' && value != null && value != undefined) {
              this.formData.set(f.name, value);
            }
          break;
        }
      }
      this.editSubscriptions = this._postService.put(this.url, this.id,this.formData).subscribe((res) => { 
        // console.log(res);
        this._router.navigate([this.contentData.backLink]); 
      },
      (err) => {
        console.log(err);
      })
    }
  }

  ngOnDestroy(): void {
    this.dataSubscriptions.unsubscribe();
    this.editSubscriptions.unsubscribe();
  }
}
