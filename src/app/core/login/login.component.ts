import { Router } from '@angular/router';
import { LoginService } from './../services/login.service';
import {Component, OnInit, ViewEncapsulation } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { patterns } from 'src/app/shared/helpers/patterns.helper';
import { StorageService } from '../services/localsorage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  
  public hide = true;
  public loginForm: FormGroup;
  public value
  public submitted:  boolean = false;
  public email:      any = AbstractControl;
  public senha:      any = AbstractControl;

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private spinner: NgxSpinnerService,
    private localstorageService: StorageService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.loginForm = this.formBuilder.group({});
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: [null, Validators.compose([Validators.required, Validators.pattern(patterns.email)])],
      senha: [null, [Validators.required]],
    });
  }

  submit(){
    this.submitted = true;
    if(this.loginForm.valid){
      this.spinner.show()

      this.loginService.login(this.loginForm.value).subscribe(response => {
        this.spinner.hide();
        this.localstorageService.setLocalStorage("user_asc", this.loginForm.value)
        this.router.navigate(['/admin']);
      }, error=>{
        this.spinner.hide();
        this.toastr.error(`Senha ou Login incorreto`)
        this.loginForm.reset()
      })
    }else{
      this.toastr.error('Preencha os campos inválidos')
    }
  }
}
