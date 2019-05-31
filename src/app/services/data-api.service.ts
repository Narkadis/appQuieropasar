import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { ChicasInterface } from '../models/chicas';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataApiService {

constructor(private afs: AngularFirestore) {}
private chicaCollection: AngularFirestoreCollection<ChicasInterface>;
private chicas: Observable<ChicasInterface[]>;
private chicasDoc: AngularFirestoreDocument<ChicasInterface>;
private chica: Observable<ChicasInterface>;
public selectedChica: ChicasInterface = {id: null};


getAllChicas() {
  this.chicaCollection = this.afs.collection<ChicasInterface>('chicas');
  return this.chicas = this.chicaCollection.snapshotChanges().pipe(map(changes =>{
    return changes.map(action => {
      const data = action.payload.doc.data() as ChicasInterface;
      data.id = action.payload.doc.id;
      return data;
    });
  }));
}
getOneChica(idChicas: string){
  this.chicasDoc = this.afs.doc<ChicasInterface>(`chicas/${idChicas}`);
  return this.chica = this.chicasDoc.snapshotChanges().pipe(map(action => {
    if (action.payload.exists === false){
      return null;
    } else{
      const data = action.payload.data() as ChicasInterface;
      data.id = action.payload.id;
      return data;
    }
  }));
}
addChica(chica: ChicasInterface): void {
this.chicaCollection.add(chica);
}
updateChica(chica: ChicasInterface): void {
let idChicas = chica.id;
this.chicasDoc = this.afs.doc<ChicasInterface>(`chicas/${idChicas}`);
this.chicasDoc.update(chica);
}
delateChica(idChicas: string): void {
  this.chicasDoc = this.afs.doc<ChicasInterface>(`chicas/${idChicas}`);
  this.chicasDoc.delete();
}

getAllChicasOffers() {
  this.chicaCollection = this.afs.collection('chicas', ref => ref.where('oferta', '==', '1'));
  return this.chicas = this.chicaCollection.snapshotChanges()
    .pipe(map(changes => {
      return changes.map(action => {
        const data = action.payload.doc.data() as ChicasInterface;
        data.id = action.payload.doc.id;
        return data;
      });
    }));
}

getSerchChicas() {
  this.chicaCollection = this.afs.collection('chicas', ref => ref.where('name', '==', ''));
  return this.chicas = this.chicaCollection.snapshotChanges()
    .pipe(map(changes => {
      return changes.map(action => {
        const data = action.payload.doc.data() as ChicasInterface;
        data.id = action.payload.doc.id;
        return data;
      });
    }));
}
}
