import { LoginService } from './../../../core/services/login.service';
import {AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, AfterViewInit, AfterViewChecked {
  hideSidebar = false;
  isSmartphone = false;
  collapseLinks = false;
  collapseLinks1 = false;
  collapseLinks2 = false;
  optionFinanceiro = false;
  optionServico =  false;
  optionProduto = false;
  expression = false;
  constructor(
    private route: Router,
    private cdk: ChangeDetectorRef,
    private loginService: LoginService
  ) {
  }

  ngOnInit(): void {
    this.checkWindowSize();
  }

  ngAfterViewInit(): void {
  }

  ngAfterViewChecked(): void {
    this.cdk.detectChanges();
  }

  checkWindowSize(): void {
    const screenWidth = document.documentElement.clientWidth;
    this.hideSidebar = screenWidth < 1080;
    this.isSmartphone = screenWidth < 1080;
  }

  isFinanceiro() {
    this.optionFinanceiro = true;
    this.optionServico = false;
    this.optionProduto = false;
    this.collapseLinks = !this.collapseLinks;
  }

  isServico() {
    this.optionServico = true;
    this.optionFinanceiro = false;
    this.optionProduto = false;
    this.collapseLinks = !this.collapseLinks;
  }

  isProduto() {
    this.optionProduto    = true;
    this.optionServico    = false;
    this.optionFinanceiro = false;
    this.collapseLinks    = !this.collapseLinks;
  }

  checkCollapse(): void {
    this.collapseLinks = false;
    this.optionProduto    = false;
    this.optionServico    = false;
    this.optionFinanceiro = false;
  }

  logout(): void {
    this.loginService.logout()
  }
}
