import { Component, OnInit } from '@angular/core';
import { DataApiService } from '../../../services/data-api.service';
import { ChicasInterface } from '../../../models/chicas';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserInterface } from '../../../models/user';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  constructor(private dataApi: DataApiService, private authService: AuthService) { }
public chicas: ChicasInterface[];
public isAdmin: any = null;
public userUid: string = null;
  ngOnInit() {
    this.getListChicas();
    this.getCurrentUser();
  }
  getCurrentUser(){
this.authService.isAuth().subscribe(auth => {
  if(auth){
    this.userUid = auth.uid;
    this.authService.isUserAdmin(this.userUid).subscribe(userRole =>{
      this.isAdmin = Object.assign({}, userRole.roles).hasOwnProperty('admin');
    // this.isAdmin='false';
    });
  }
});
  }
getListChicas() {
  this.dataApi.getAllChicas().subscribe(chicas => {
    this.chicas = chicas;
  });

}
onDeleteChicas(idChica: string): void {
const confirmacion = confirm('¿Estas seguro?');
if(confirmacion){
  this.dataApi.delateChica(idChica);
}
}
onPreUpdateChica(chica: ChicasInterface){
  console.log('Chica', chica);
  this.dataApi.selectedChica = Object.assign({}, chica);
  }
}
