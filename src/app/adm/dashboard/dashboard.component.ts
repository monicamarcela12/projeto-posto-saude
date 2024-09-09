import {Component, OnInit, ViewChild} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ChartEvent, ChartType, ChartData } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { PatientService } from 'src/app/core/services/patient.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public doughnutChartLabels1: string[] = ['Fuma', 'Cancer','Remedio Controlado','Precisa visita Medica','Alguma Patologia' ];
  public doughnutChartData1: ChartData<'doughnut'>;

  public doughnutChartLabels: string[] = ['Masculino', 'Feminino'];
  public doughnutChartData: ChartData<'doughnut'>;
  public doughnutChartType: ChartType = 'doughnut';
  
  lineChartType: ChartType = 'line';

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  constructor(
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private fb: FormBuilder,
    public route: ActivatedRoute,
    private service: PatientService
  ) { 
    this.findBy();
  }

  ngOnInit(): void {}

  public chartClicked({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    console.log(event, active);
  }

  public findBy() {
    this.spinner.show();
      this.service.findPatient('paciente').subscribe(
          res => this.processResponse(res),
          err => this.processErrorResponse(err)
      );
  }

private processResponse(value) {
  this.spinner.hide()
  this.graficoSexo(value);
  this.graficoPatologia(value);

}

graficoSexo(value) {
  let feminino  = 0
  let masculino = 0

  for(let i = 0; i <= value.length;i++) {
  
   if(value[i]?.rg == "Feminino") {
      feminino += 1
    }else if(value[i]?.rg == "Masculino") {
      masculino += 1
    }
  }

  this.doughnutChartData = {
    labels: this.doughnutChartLabels,
    datasets: [
      { data: [ masculino, feminino ], 
        backgroundColor: ['blue', 'red'] ,
        hoverBackgroundColor: ['blue', 'red'],
        hoverBorderColor: ['blue', 'red'],
        borderWidth: 5}
    ]
  };
}

graficoPatologia(value) {


  let cancer  = 0
  let fumo = 0
  let patologia = 0
  let visita = 0
  let remedio = 0

  for(let i = 0; i <= value.length;i++) {
  
    if(value[i]?.temPatologia == "sim") {
      patologia += 1
    }
    if(value[i]?.necessitaVisitaMedica == "sim") {
      visita += 1
    }
    if(value[i]?.tomaRemedioControlado == "sim") {
      remedio += 1
    }
    if(value[i]?.cancer == "sim") {
      cancer += 1
    }
    if(value[i]?.fuma == "sim") {
      fumo += 1
    }
  }
  this.doughnutChartData1 = 
  {
    labels: this.doughnutChartLabels1,
    datasets: [
      { data: [ fumo, remedio, cancer, visita, patologia ], 
        backgroundColor: ['#969696', '#0580FF','#F0AD4A','red','pink'] ,
        hoverBackgroundColor: ['#969696', '#0580FF','#F0AD4A','red','pink'],
        hoverBorderColor: ['#969696', '#0580FF','#F0AD4A','red','pink'],
        borderWidth: 5}
    ]
  };
}

private processErrorResponse(error) {
  this.spinner.hide()
  this.toastr.error('Não foi possível encontrar o registro.Tente novamente');
}
}