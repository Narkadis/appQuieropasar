import { Component, OnInit } from '@angular/core';
import { DataApiService } from 'src/app/services/data-api.service';
import { ChicasInterface } from '../../models/chicas';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: []
})
export class SearchComponent implements OnInit {

  constructor(private dataApi: DataApiService) { }
  public chicas: ChicasInterface[];
  error = false;
mensajeError = "";
  ngOnInit() {
    this.getname();  }

  getname() {
    this.dataApi.getAllChicasOffers().subscribe(termino => this.chicas = termino);
  }
}
