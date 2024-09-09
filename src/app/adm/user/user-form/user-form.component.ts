import {Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/core/services/user.service';

declare var $:any;

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  public id: Number;
  public formGroup: FormGroup

  constructor(
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private fb: FormBuilder,
    public route: ActivatedRoute,
    private service: UserService
  ) {       
    this.route.params.subscribe((params: Params) => {
      this.configRouteParams(params);
    });
  }

  async start(){
    try{
      this.startForm()
    }catch{
      this.toastr.error('Não foi possível carregar')
    }
  }

  ngOnInit(): void {
    this.start()
  }

  public configRouteParams(params) {
    this.findById(params['id']);
    this.id = params['id']
  }

  public findById(id: number) {
      if(id) {
          this.service.findById(id).subscribe(
              res => this.processSearchByIdResponse(res),
              err => this.processErrorResponse(err)
          );
      }
  }

  private processSearchByIdResponse(value) {
    this.updateFormControl(value);
    this.processResponseData(value);
  }

  private processErrorResponse(error) {
    this.toastr.error('Não foi possível encontrar o registro.Tente novamente');
  }

  private processResponseData(error) {
    this.toastr.success('Salvo com sucesso!');
  }

  private updateFormControl(value) {
    this.formGroup.setValue(value);
  }

  startForm(): FormGroup{
    return this.formGroup = this.fb.group({
      id: [''],
      nome: ['', Validators.required],
      email: ['', Validators.required],
      telefone: ['', Validators.required],
      nivel: ['', Validators.required],
      senha: ['', Validators.required],
      confirma_senha: ['', Validators.required]
    })
  }

  checkInvalidField(name) {
    return this.formGroup.get(name).invalid && this.formGroup.get(name).touched;
  }

  submit(){
    if(this.formGroup.valid){
      if(!this.id) {
        this.spinner.show()
        this.service.post(this.formGroup.value).subscribe(response =>{
          this.spinner.hide()
          this.toastr.success('Sucesso', 'Sucesso!')
          this.start()
        }, error=>{
          this.spinner.hide()
          this.toastr.error('Tente novamente mais tarde')
        })
      }else {
        this.spinner.show()
        this.service.put( this.id, this.formGroup.value).subscribe(response =>{
          this.spinner.hide()
          this.toastr.success('Sucesso', 'Sucesso!')
          this.start()
        }, error=>{
          this.spinner.hide()
          this.toastr.error('Tente novamente mais tarde')
        })
      }
    }else{
      this.formGroup.markAllAsTouched()
      this.toastr.error('Preencha os campos inválidos')
    }
  }

}
