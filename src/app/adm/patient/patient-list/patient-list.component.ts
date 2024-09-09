import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {PaginationInstance} from "ngx-pagination";
import { ToastrService } from 'ngx-toastr';
import { PatientService } from 'src/app/core/services/patient.service';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.scss']
})
export class PatientListComponent implements OnInit {
  public patient
  public idExcluir;
  public name:string = ''
  public dataSet = 10;
  public formGroup: FormGroup
  public patologia
  public asc

  paginateConfig: PaginationInstance = {
    id: 'patient',
    currentPage: 1,
    itemsPerPage: 5
  };

  constructor(
    private toastr: ToastrService,
    private fb: FormBuilder,
    private service: PatientService
  ) { }

  ngOnInit(): void {
    this.start() 
    this.findPathology();
    this.findPatologia();
  }

  async start(){
    try{
      this.startForm()
    }catch{
      this.toastr.error('Não foi possível carregar')
    }
  }

  startForm(): FormGroup{
    return this.formGroup = this.fb.group({
      nome: ['']
    })
  }

  findAsc() {
    this.service.findASC().subscribe(res => {
      this.asc = res
    });
  }

  findPatologia() {
    this.service.findPatologia().subscribe(res => {
      this.asc = res
    });
  }

  get(page?:any): Promise<any>{
    return new Promise((resolve, reject)=>{
      if(!page) page = 1
      this.service.findPatient(page, this.name).subscribe(response =>{
        this.patient = response
        this.paginateConfig.totalItems = response.count
        this.paginateConfig.currentPage = page
        resolve(response)
      }, error=>{
        reject(error)
      })
    })
  }

  deleteNew(idNumber:Number){
    this.service.delete(idNumber).subscribe(response =>{
      this.toastr.success('Deletado com sucesso....', 'Sucesso!')
      this.findPathology()
    }, error=>{
      if(error.status == 200 )  {    
        this.toastr.success("Deletado com sucesso....");
          this.findPathology()
      }else this.toastr.error("Erro... Tente novamente");
    })
  }
  
  findPathology() {
    this.service.findPatient('patologia').subscribe(res => {
      this.patient = res
    });
  }

  search() {
    this.service.findPatient('patologia',this.formGroup.value).subscribe(res => {
      this.patient = res
    });
  }

}
