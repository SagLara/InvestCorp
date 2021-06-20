import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  @Output() menuEmit = new EventEmitter<boolean>();
  menuBar:boolean;

  constructor() { }

  ngOnInit(): void {
    this.menuBar = environment.DROP_MENU;
  }

  changeMenu(){
    this.menuBar=!this.menuBar;
    environment.DROP_MENU=this.menuBar;
    this.menuEmit.emit(this.menuBar);
    console.log(environment.DROP_MENU);
  }

}
