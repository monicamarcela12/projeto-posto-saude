import {Component, OnInit,} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { FamilyService } from 'src/app/core/services/family.service';

@Component({
  selector: 'app-family-form',
  templateUrl: './family-form.component.html',
  styleUrls: ['./family-form.component.scss']
})
export class FamilyFormComponent implements OnInit {
  public id: Number;
  public formGroup: FormGroup
  public membroFamilia: any = [{}]
  public nomeResponsavel

  constructor(
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private fb: FormBuilder,
    public route: ActivatedRoute,
    private service: FamilyService
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
    this.findNomeResponsavel();
  }

  findNomeResponsavel() {
    this.service.findNomeResponsavel().subscribe(res => {
      this.nomeResponsavel = res
    });
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
    this.updateFormControl(value);
    this.spinner.hide();
  }

  private processErrorResponse(error) {
    this.spinner.hide();
    this.toastr.error('Não foi possível encontrar o registro.Tente novamente');
  }


  private updateFormControl(value) {
    this.formGroup.setValue(value);
    this.membroFamilia = this.formGroup.value.membroFamilia
  }

  startForm(): FormGroup{
    return this.formGroup = this.fb.group({
      id: [''],
      nomeResponsavel: ['', Validators.required],
      sus: ['', Validators.required],
      cpf: ['', Validators.required],
      endereco: ['', Validators.required],
      numero: ['', Validators.required],
      bairro: ['', Validators.required],
      membroFamilia: [this.membroFamilia]
    })
  }

  checkInvalidField(name) {
    return this.formGroup.get(name).invalid && this.formGroup.get(name).touched;
  }

  submit(){
    this.formGroup.value.membroFamilia = this.membroFamilia
    if(this.formGroup.valid){
      if(!this.id) {
        this.spinner.show()
        this.service.post(this.formGroup.value).subscribe(response =>{
          this.spinner.hide()
          this.toastr.success('Sucesso', 'Sucesso!')
          this.start()
        }, error=>{
          this.spinner.hide()
          if(error.status == 200 )  {    
            this.toastr.success("Cadastro realizado com sucesso....");
          }else this.toastr.error("Erro... Tente novamente");
        })
      }else {
        this.salvarAutomatico();
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

  adiocionarVazio() {
    this.membroFamilia.push({
      nome: null, 
      dataNascimento: null,
      sus: null
    })
  }

  public salvarAutomatico() {
    for(let i = 0;i < this.membroFamilia.length;i++ ) {
      this.service.postFamilia(this.membroFamilia[i], this.id).subscribe(err =>{
        console.log("Salvo")
      })
    }
  }

  adiocionar(event, index, item) {
    if (item == 1) this.membroFamilia[index].nome = event.target.value;
    if (item == 2) this.membroFamilia[index].dataNascimento =  event.target.value;
    if (item == 3) this.membroFamilia[index].sus =  event.target.value;
  }

  close(model: any) {
    this.membroFamilia.splice(this.membroFamilia.indexOf(model), 1);
    this.service.deleteMembroFamilia(model.id).subscribe(err =>{
      console.log("Salvo")
    })
  }

}
