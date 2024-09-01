import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment.development";
import {Observable} from "rxjs";
import {Admin} from "../Modele/admins.model";
import {Utilisateur} from "../Modele/utilisateur.model";
import {Quota} from "../Modele/quota.model";
import {Entreprise} from "../Modele/Entreprises.model";

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  constructor(private http:HttpClient) { }
  public listeAdmin():Observable<Array<Admin>>{
    return this.http.get<Array<Admin>>(`${environment.backendHost}/api/admins`);
  }
  public listeAdminEntreprise(idEntreprise: string):Observable<Array<Admin>>{
    return this.http.get<Array<Admin>>(`${environment.backendHost}/api/admins/${idEntreprise}`);
  }
  public AddAdmin(adminData: any): Observable<Admin> {
    return this.http.post<Admin>(
      `${environment.backendHost}/api/createAdmin`,
      JSON.stringify(adminData),
      { headers: this.headers }
    );
  }
  deleteAdmin(id: string) {
    return this.http.delete(`${environment.backendHost}/api/deleteAdmin/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });
  }

  getAdmin(id: string): Observable<Admin> {
    return this.http.get<Admin>(
      `${environment.backendHost}/api/admin/${id}`,
      { headers: this.headers }
    );
  }

  editAdmin(id:string,AdminData:Admin):Observable<Admin>{
    return this.http.put<Admin>(
      `${environment.backendHost}/api/updateAdmin/${id}`,
      JSON.stringify(AdminData),
      { headers: this.headers }
    );
  }
  addQuotaToAdmin(id: string, quota: Quota): Observable<Admin> {
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
    return this.http.post<Admin>(
      `${environment.backendHost}/api/${id}/quota`,
      quotaInMoObject,
      { headers: this.headers }
    );
  }
}
