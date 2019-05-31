import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private router: Router, private authservice: AuthService, private storage: AngularFireStorage) { }
@ViewChild('imageUser') inputImageUser: ElementRef;
  public email = '';
public password = '';

uploadPercent: Observable<number>;
urlImage: Observable<string>;

  ngOnInit() {
  }
onUpload(e){
 // console.log('subir', e.target.files[0]);
 const id = Math.random().toString(36).substring(2);
 const file = e.target.files[0];
 const filePath = `uploads/perfil_${id}`;
 const ref = this.storage.ref(filePath);
 const task = this.storage.upload(filePath, file);
this.uploadPercent = task.percentageChanges();
task.snapshotChanges().pipe( finalize(() => this.urlImage = ref.getDownloadURL())).subscribe();
}

onAddUser(){
  this.authservice.registerUser(this.email, this.password)
  .then((res)=>{
    this.authservice.isAuth().subscribe(user =>{
      if(user){
        console.log('userActual', user);
        user.updateProfile({
          displayName: '',
          photoURL: this.inputImageUser.nativeElement.value
        }).then (()=> {this.router.navigate(['admin/list']);
        }).catch((error)=>{
          console.log('error', error);
        });
      }
    });
  }).catch(err => console.log('err', err.message));
}
onLoginGoogle(): void {
  this.authservice.loginGoogleUser().then((res) => {
    console.log('resUser, res');
    this.onLoginRedirect();
  }).catch(err => console.log('err', err.message));
}
onLoginFacebook(): void {
  this.authservice.loginFacebookUser().then((res) => {
this.onLoginRedirect();
  }).catch(err => console.log('err', err.message));
}

onLoginRedirect(): void {
this.router.navigate(['admin/list']);
}
}
