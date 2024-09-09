import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {PaginationInstance} from "ngx-pagination";
import { ToastrService } from 'ngx-toastr';
import { PathologyService } from 'src/app/core/services/pathology.service';

@Component({
  selector: 'app-pathology-list',
  templateUrl: './pathology-list.component.html',
  styleUrls: ['./pathology-list.component.scss']
})
export class PathologyListComponent implements OnInit {

  public idExcluir
  public patologia
  public name:string = ''
  public dataSet = 10;
  public formGroup: FormGroup

  paginateConfig: PaginationInstance = {
    id: 'patologia',
    currentPage: 1,
    itemsPerPage: 5
  };

  constructor(
    private toastr: ToastrService,
    private fb: FormBuilder,
    private service: PathologyService
  ) { }

  ngOnInit(): void {
    this.start() 
    this.findPathology();
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

  imprimir() {
    var divToPrint = document.getElementById('areaToPrint');
        const newWin = window.open("");
        newWin.document.write(divToPrint.outerHTML);
        newWin.print();
        newWin.close();
  }

  get(page?:any): Promise<any>{
    return new Promise((resolve, reject)=>{
      if(!page) page = 1
      this.service.findPatologia(page, this.name).subscribe(response =>{
        this.patologia = response
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
    this.service.findPatologia('patologia').subscribe(res => {
      this.patologia = res
    });
  }

  searchPathology() {
    this.service.findPatologia('patologia',this.formGroup.value).subscribe(res => {
      this.patologia = res
    });
  }

}
