import { Component, OnInit } from '@angular/core';

import { DataApiService } from 'src/app/services/data-api.service';
import { ChicasInterface } from '../../models/chicas';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.css']
})
export class OffersComponent implements OnInit {

  constructor(private dataApi: DataApiService) { }
  private chicas: ChicasInterface[];
  ngOnInit() {
    this.getOffers();
  }

  getOffers() {
    this.dataApi.getAllChicasOffers().subscribe(offers => this.chicas = offers);
  }
}
