import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Utilisateur} from "../Modele/utilisateur.model";
import {environment} from "../../environments/environment.development";
import {Admin} from "../Modele/admins.model";

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  constructor(private  httpClient:HttpClient) { }
 /* public listeUtilisateur():Observable<Array<Utilisateur>>{
    return this.httpClient.get<Array<Utilisateur>>(`${environment.backendHost}/api/utilisateurs`);
  }*/
  public listeUtilisateur(idAdmin: string):Observable<Array<Utilisateur>>{
    return this.httpClient.get<Array<Utilisateur>>(`${environment.backendHost}/api/utilisateurs/${idAdmin}`);
  }

  AddUtilisateur(utilisateurData: any):Observable<Utilisateur>{
    return this.httpClient.post<Utilisateur>(
      `${environment.backendHost}/api/createUser`,
      JSON.stringify(utilisateurData),
      { headers: this.headers }
    );

  }
  deleteUser(id: string) {
    return this.httpClient.delete(`${environment.backendHost}/api/deleteUtilisateur/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });
  }
  editUser(id:string,userData:Utilisateur):Observable<Utilisateur>{
    return this.httpClient.put<Utilisateur>(
      `${environment.backendHost}/api/updateUtilisateur/${id}`,
      JSON.stringify(userData),
      { headers: this.headers }
    );
  }
  getUser(id: string): Observable<Utilisateur> {
    return this.httpClient.get<Utilisateur>(
      `${environment.backendHost}/api/utilisateur/${id}`,
      { headers: this.headers }
    );
  }

}
