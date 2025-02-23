import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../utilities/services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  toggleImgClick : boolean = false;
  toggleImg:string= "assets/images/hidepass.png";
  loginForm!: FormGroup;
  checkOnVAlidate: boolean = true;
  constructor(private _authService: AuthService){}

  ngOnInit(): void {
    this.initialForm();
  }

  initialForm(){
    this.loginForm  = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$')]),
      password: new FormControl('', [Validators.required,Validators.minLength(6)])
    })
  }

  TogglePassword(){
    this.toggleImgClick = !this.toggleImgClick;
    if(this.toggleImgClick == true){
      this.toggleImg = "assets/images/showpass.png";
    } else{
      this.toggleImg = "assets/images/hidepass.png";
    }
  }

  signIn(form: FormGroup) {
    let body = {
      email: form.value.email,
      password: form.value.password,
    };
    if(form.valid) {
      this.checkOnVAlidate = this._authService.login(body);
      // console.log(this.checkOnVAlidate)
    }
  }
}
