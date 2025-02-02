import { isPlatformBrowser } from '@angular/common';
import { DataService } from './../data.service';
import {  Component, HostListener, inject, Input, OnInit, PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit  {
 @Input() isShow!:boolean ;
 isMediumScreen = false;
  public readonly dataService= inject(DataService);
  private readonly pLATFORM_ID = inject(PLATFORM_ID);

  ngOnInit(): void {
    this.checkScreenSize(); 

  }
  @HostListener('window:resize') 
  onResize() {
    this.checkScreenSize();
  }
checkScreenSize() {

  if(isPlatformBrowser(this.pLATFORM_ID)){
    this.isMediumScreen = window.innerWidth >= 768;

  }
}


}
