import { Component, OnInit } from '@angular/core';
import { DataApiService } from '../../services/data-api.service';
import { ChicasInterface } from '../../models/chicas';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  constructor(private dataApi: DataApiService, private route: ActivatedRoute) { }
public chica: ChicasInterface = {};
  ngOnInit() {
    const idChica = this.route.snapshot.params['id'];
    this.getDetails(idChica);
  }
getDetails(idChica: string): void {
  this.dataApi.getOneChica(idChica).subscribe(chica => {
      this.chica = chica;
    });
}
}
