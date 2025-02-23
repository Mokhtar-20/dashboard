import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PostService } from 'src/app/utilities/services/post.service';
import { addFormFields } from 'src/app/utilities/shared-data/addFormData';
import { tablesData } from 'src/app/utilities/shared-data/list';
import { URLs } from 'src/app/utilities/shared-data/urls';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnDestroy {
  type: any;
  contentTablesData: any;
  contentData: any;
  formFields: any;
  add_form: any;
  apiUrl: any;
  url: any;
  formData: FormData;
  mainForm: FormGroup;
  fieldsCtrls: any = {};
  imageSrc: any = new Map();
  imageSizeError: any = new Map();
  imgToUpload: any = null;
  addSubscriptions : Subscription = new Subscription();
  constructor(private _activatedRoute : ActivatedRoute, private _postService: PostService, private _router: Router) {
    this._activatedRoute.params.subscribe(
      (param) => {
        this.type = param['type'];
      }
    );
    this.contentTablesData = tablesData;
    this.contentData = this.contentTablesData[this.type];
    this.formFields = addFormFields;
    this.add_form = this.formFields[this.type];
    this.apiUrl = URLs;
    this.url = this.apiUrl[this.type];

    this.createForm(this.add_form);
    this.formData = new FormData();
    this.mainForm = new FormGroup(this.fieldsCtrls);
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

  upload(event: any, fieldName: any) { 
    let fileSize;
    const file: File = event.target.files[0];
    fileSize = Math.round(file.size / 1024);
    let vaildSize = fileSize <= 50;

    const reader = new FileReader();

    if (event.target.files.length && vaildSize) {
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imageSrc[fieldName] = reader.result as string;
      };
      // console.log(file);
      // console.log(fileSize);
    } else {
      this.imageSizeError[fieldName] = true;
    }
  }

  submit(form:any) {
    if(form.valid) {
      let fields: any = [];
      fields = fields.concat(this.add_form);
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
      this.addSubscriptions = this._postService.submit(this.url, this.formData).subscribe((res)=> {
        // console.log(res);
        // this.spinner.hide();
        this._router.navigate([this.contentData.backLink]); 
      }, 
      (err) => {
        // this.spinner.hide();
        console.log(err);
        // this.backEndError = err.error.errors
      })
    }
  }

  ngOnDestroy(): void {
    this.addSubscriptions.unsubscribe();
  }
}
