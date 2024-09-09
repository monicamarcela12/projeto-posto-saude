import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {patterns} from '../../shared/helpers/patterns.helper';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit {

  public hide            = true;
  public loginForm:  any = FormGroup;
  public email:      any = AbstractControl;
  public senha:      any = AbstractControl;
  public nome:       any = AbstractControl;
  public telefone:   any = AbstractControl;
  public submitted:  boolean = false;
  public closeModal: any
  
  constructor(
    private toastr: ToastrService,
    private fb: FormBuilder,
    private router: Router,
    private loginService: LoginService
  ) { 
    this.configFormGroup();
  }
  ngOnInit(): void {
  }

  submit() {
      this.submitted = true;
      if (this.loginForm.valid) {
        this.loginService.registro(this.loginForm.value).subscribe(
          res => this.responseAuthenticatedSuccess(res),
          err => this.processResponse(err)
        );
      }
      else {
        this.toastr.error("Campos obrigatórios inválidos");
      }
    }

    private responseAuthenticatedSuccess(res: any) {
      this.toastr.success(res.text);
    }

    private processResponse(res: any) {
      if(res.status == 200 )  {    
        this.toastr.success("Cadastro realizado com sucesso....");
        this.router.navigate(["../"])
      }else this.toastr.error("Erro... Tente novamente");
    }

    private configFormGroup() {
      this.loginForm = this.fb.group({
        'email':    [ null, Validators.compose([Validators.required, Validators.email])],
        'senha':    [ null, Validators.required],
        'nome':     [ null, Validators.required],
        'telefone': [ null, Validators.required],
      });
        
      this.email    = this.loginForm.get('email');
      this.senha    = this.loginForm.get('senha');
      this.nome     = this.loginForm.get('nome');
      this.telefone = this.loginForm.get('telefone');
    }

}

