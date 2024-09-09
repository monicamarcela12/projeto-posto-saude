import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PaginationInstance } from 'ngx-pagination';
import { HttpParams } from '@angular/common/http';
import { BaseService } from 'src/app/core/services/base-service.service';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {

  @Input('paginationConfig') paginationConfig: PaginationInstance;
  @Output() pageChange: EventEmitter<number> = new EventEmitter();
  @Output() paginationSearch: EventEmitter<number> = new EventEmitter();
  @Output() paginationResult: EventEmitter<Object> =  new EventEmitter<Object>();
  @Input() url: string;
  query: string
  search: string
  page: number
  @Input() setPage:number = 1

  constructor(
    private route: ActivatedRoute,
    private baseService: BaseService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.route.queryParams.subscribe(e=> {
      this.url = e.url
      this.query = e.query
      this.search = e.search
      this.page = e.page
    })
  }

  ngOnInit(): void {
    // if(!this.route.snapshot.queryParams.page){
    //   this.router.navigate([], {queryParams: {page: 1}})
    // };
  }

  result(event:number){
    this.page = event
    if(this.search){
      this.baseService.search(this.url, this.setFilter( this.page, this.search)).subscribe(data=>{
        this.paginationResult.emit(data)
        this.router.navigate([], {
          queryParams: {search: `${this.search}`, page: `${data.page}`, url: `${this.url}` ,query: `${this.query}`},
          relativeTo: this.route,
          queryParamsHandling: 'merge',
        });
      }, error=>{
        this.toastr.error('tente novamente mais tarde')
      })
    }else{
      // this.router.navigate([], {queryParams: {page: this.page}});
      this.paginationSearch.emit(event)
    }
  }


  setFilter(page?: number, filter?:any){
    let filtro
    if(!page) page = 1
    if(page>=1){
      filtro = new HttpParams().set('limit', '10').set(`${this.query}`, `${filter}`).set('page', `${page}`)
      return filtro
    }
  }
}
