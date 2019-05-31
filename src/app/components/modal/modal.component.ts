import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { DataApiService } from 'src/app/services/data-api.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  constructor(public dataApi: DataApiService) { }
@ViewChild('btnClose') btnClose: ElementRef;
@Input() userUid: string;
  ngOnInit() {
  }

  onSaveChica(formChica: NgForm): void {
if (formChica.value.id == null) {
    // nuevo
formChica.value.userUid = this.userUid;
this.dataApi.addChica(formChica.value);
  } else {
    this.dataApi.updateChica(formChica.value);
  }
  formChica.resetForm();
this.btnClose.nativeElement.click();
  }
}
