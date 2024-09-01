import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Entreprise} from "../Modele/Entreprises.model";
import {environment} from "../../environments/environment.development";
import {Admin} from "../Modele/admins.model";
import {Quota} from "../Modele/quota.model";

@Injectable({
  providedIn: 'root'
})
export class EntrepriseService {
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http:HttpClient) { }

  public AddEntreprise(entrepriseData: any): Observable<Entreprise> {
    return this.http.post<Entreprise>(
      `${environment.backendHost}/entreprises/addEntreprise`,
      JSON.stringify(entrepriseData),
      { headers: this.headers }
    );
  }
  public ListeEntreprise():Observable<Array<Entreprise>>{
    return this.http.get<Array<Entreprise>>(`${environment.backendHost}/entreprises/listeEntreprise`);
  }
  public getEntreprise(idEntreprise:string):Observable<Entreprise>{
    return this.http.get<Entreprise>(
      `${environment.backendHost}/entreprises/entreprise/${idEntreprise}`,
      { headers: this.headers }
    );
  }

  deleteEntreprise(idEntreprise: string) {
    return this.http.delete(`${environment.backendHost}/entreprises/deleteEntreprise/${idEntreprise}`, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });
  }

  editEntreprise(id: string, EntrepriseData: any):Observable<Entreprise> {
    return this.http.put<Entreprise>(
      `${environment.backendHost}/entreprises/updateEntreprise/${id}`,
      JSON.stringify(EntrepriseData),
      { headers: this.headers }
    );
  }
  addQuotaToEntreprise(idEntreprise: string, quota: Quota): Observable<Entreprise> {
    // Convertir la valeur en Go (GB) en Mo (MB)
   // const quotaInMo = quota.valeur * 1024; // 1 Go = 1024 Mo
    const quotaInMo = quota.valeur
    // Préparer le quota avec la valeur en Mo
    const quotaInMoObject = {
      id: quota.idQuota,
      valeur: quotaInMo,
      type: quota.type
    };

    // Envoyer la requête HTTP POST
    return this.http.post<Entreprise>(
      `${environment.backendHost}/entreprises/${idEntreprise}/quota`,
      quotaInMoObject,
      { headers: this.headers }
    );
  }


}
