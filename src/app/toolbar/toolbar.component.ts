import { Component } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { modal1Component } from '../modal1/modal1.component'
@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent {
  modalRef: MdbModalRef<modal1Component> | null = null;

  constructor(private modalService: modal1Component) {}

  openModal1Component() {
   // this.modalRef = this.modalService.open(modal1Component)
  }
}