import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { StorageService } from 'src/app/core/services/localsorage.service';
import { MessageService } from 'src/app/core/services/message.service';

@Component({
  selector: 'app-message-form',
  templateUrl: './message-form.component.html',
  styleUrls: ['./message-form.component.scss']
})
export class MessageFormComponent implements OnInit {
 
  public id: Number;
  public formGroup: FormGroup
  public asc
  public user

  constructor(
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private localstorageService: StorageService,
    private fb: FormBuilder,
    public route: ActivatedRoute,
    private service: MessageService
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
    this.findASC();
  }

  public configRouteParams(params) {
    this.findById(params['id']);
    this.id = params['id']
  }

  public findById(id: number) {
      if(id) {
        this.spinner.show();

          this.service.findById(id).subscribe(
              res => this.processSearchByIdResponse(res),
              err => this.processErrorResponse(err)
          );
      }
  }

  private processSearchByIdResponse(value) {
    this.spinner.hide();
    this.updateFormControl(value);
  }

  private processErrorResponse(error) {
    this.spinner.hide();
    this.toastr.error('Não foi possível encontrar o registro.Tente novamente');
  }

  private updateFormControl(value) {
    this.formGroup.patchValue(value);
  }

  startForm(): FormGroup{
    return this.formGroup = this.fb.group({
      id: [''],
      nome: ['', Validators.required],
      sus: ['', Validators.required],
      endereco: ['', Validators.required],
      dataNascimento: ['', Validators.required],
      recado: ['', Validators.required],
      numero: ['', Validators.required],
      bairro: ['', Validators.required]
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
          this.formGroup.reset();
        }, error=>{
          this.spinner.hide()
          if(error.status == 200 )  {    
            this.toastr.success("Cadastro realizado com sucesso....");
          }else this.toastr.error("Erro... Tente novamente");
        })
      }else {
        this.spinner.show()
        this.service.put( this.id, this.formGroup.value).subscribe(response =>{
          this.spinner.hide()
          this.toastr.success('Sucesso', 'Sucesso!')
          this.start()
        }, error=>{
          this.spinner.hide()
          if(error.status == 200 )  {    
            this.toastr.success("Cadastro realizado com sucesso....");
          }else this.toastr.error("Erro... Tente novamente");
        })
      }
    }else{
      this.formGroup.markAllAsTouched()
      this.toastr.error('Preencha os campos inválidos')
    }
  }

  findASC() {
    this.service.findASC().subscribe(res => {
      this.asc = res
    });
  }

}
