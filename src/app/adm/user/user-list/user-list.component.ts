import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {PaginationInstance} from "ngx-pagination";
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
 
  public user
  public name:string = ''
  public dataSet = 10;
  public formGroup: FormGroup

  paginateConfig: PaginationInstance = {
    id: 'user',
    currentPage: 1,
    itemsPerPage: 5
  };

  constructor(
    private toastr: ToastrService,
    private fb: FormBuilder,
    private service: UserService
  ) { }

  ngOnInit(): void {
    this.start() 
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
      nome: [''],
      sus: [''],
      patologia: [''],
      endereco: [''],
      numero: [''],
      sexo:[''],
      agente: ['']

    })
  }

  get(page?:any): Promise<any>{
    return new Promise((resolve, reject)=>{
      if(!page) page = 1
      this.service.findUser(page, this.name).subscribe(response =>{
        this.user = response
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
      this.toastr.success('Notícia Excluída', 'Sucesso!')
      this.start()
    }, error=>{
      this.toastr.error('Tente novamente mais tarde')
    })
  }

}
