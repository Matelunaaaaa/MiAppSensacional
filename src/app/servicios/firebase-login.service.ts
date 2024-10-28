import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { User } from 'firebase/auth';
import { Observable, of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class FirebaseLoginService {
  constructor(
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private router: Router
  ) {}

  login(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  logout() {
    return this.afAuth.signOut().then(() => this.router.navigate(['/login']));
  }

  async create_user(email: string, password: string, nombre: string) {
    const userCredential = await this.afAuth.createUserWithEmailAndPassword(
      email,
      password
    );
    const uid = userCredential.user?.uid;
    await this.firestore.doc(`users/${uid}`).set({
      email: email,
      nombre: nombre,
      uid: uid,
    });
    return userCredential;
  }

  getCurrentUserName(): Observable<string | null> {
    return this.afAuth.authState.pipe(
      switchMap((user) => {
        if (user && user.uid) {
          console.log('UID del usuario autenticado:', user.uid);
          return this.firestore.doc(`users/${user.uid}`).valueChanges().pipe(
            map((userData: any) => {
              console.log('Datos del usuario desde Firestore:', userData); 
              return userData?.nombre || null;
            }),
            catchError((error) => {
              console.error('Error al obtener los datos de Firestore:', error);
              return of(null);
            })
          );
        }
        return of(null);
      })
    );
  }  

  getCurrentUserIdioma(): Observable<string | null> {
    return this.afAuth.authState.pipe(
      switchMap((user) => {
        if (user && user.uid) {
          return this.firestore.doc(`users/${user.uid}`).valueChanges().pipe(
            map((userData: any) => {
              return userData?.idioma || null;
            }),
            catchError((error) => {
              console.error('Error al obtener los datos de Firestore:', error);
              return of(null);
            })
          );
        }
        return of(null);
      })
    );
  }  
}
