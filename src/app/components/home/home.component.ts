import { Component, OnInit } from '@angular/core';
import { DataApiService } from 'src/app/services/data-api.service';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private dataApi: DataApiService, private af: AngularFireDatabase) { }
public chicas = [];
public chica = '';

  ngOnInit() {

    this.dataApi.getAllChicas().subscribe(chicas => {
      console.log('CHICAS', chicas);
      this.chicas = chicas;
    });

  }
  
 
}
