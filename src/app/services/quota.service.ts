import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment.development";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Quota} from "../Modele/quota.model";
import {Observable} from "rxjs";
import {Utilisateur} from "../Modele/utilisateur.model";

@Injectable({
  providedIn: 'root'
})
export class QuotaService {
  private apiUrl = `${environment.backendHost}/quota`; // URL de base de l'API
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  constructor(private http: HttpClient) { }

  // Méthode pour créer un quota
  createQuota(quotaDTO: Quota): Observable<Quota> {
    return this.http.post<Quota>(`${this.apiUrl}/addQuota`, quotaDTO);
  }

  // Méthode pour mettre à jour un quota
  updateQuota(idQuota: string, quotaData: any): Observable<Quota> {
    return this.http.put<Quota>(`${this.apiUrl}/updateQuota/${idQuota}`, JSON.stringify(quotaData),
      { headers: this.headers });
  }

  // Méthode pour supprimer un quota
  deleteQuota(idQuota: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/deleteQuota/${idQuota}`);
  }

  // Méthode pour obtenir un quota par ID
  getQuota(idQuota: string): Observable<Quota> {
    return this.http.get<Quota>(`${this.apiUrl}/entreprise/${idQuota}`,
      { headers: this.headers });

  }

  // Méthode pour obtenir tous les quotas
  getAllQuotas(): Observable<Quota[]> {
    return this.http.get<Quota[]>(`${this.apiUrl}/listeQuota`);
  }
}
