import {Component, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {EntrepriseService} from "../services/entreprise.service";
import {QuotaService} from "../services/quota.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {MatTableDataSource} from "@angular/material/table";
import {catchError, map, Observable, of} from "rxjs";
import {Quota} from "../Modele/quota.model";
import {EditQuotaComponent} from "../edit-quota/edit-quota.component";
import {Entreprise} from "../Modele/Entreprises.model";
import {AddquotaEntrepriseComponent} from "../addquota-entreprise/addquota-entreprise.component";
import {AdminService} from "../services/admin.service";
import {EditQuotaAdminComponent} from "../edit-quota-admin/edit-quota-admin.component";

@Component({
  selector: 'app-details-quota-admin',
  templateUrl: './details-quota-admin.component.html',
  styleUrls: ['./details-quota-admin.component.css'] // Corrigé ici
})

export class DetailsQuotaAdminComponent {
  public quota:any;
  public dataSource:any;
  public displayedColumns:string[]=["valeur","type","actions"];
  id!:string;
  admin!:any;
  nomAdmin!: string;
  quotaId!:string;
  @ViewChild(MatPaginator) matPaginator!:MatPaginator;
  @ViewChild(MatSort) sort!:MatSort;

  constructor(private adminService:AdminService, private quotaService:QuotaService,private activatedRoute:ActivatedRoute,private route:Router,public dialog:MatDialog) {
  }
  ngOnInit(): void {
    // D'abord, obtenir l'idEntreprise
    this.id = this.activatedRoute.snapshot.params['id'];
    console.log('idAdmin:', this.id);

    // Vérifiez que idEntreprise est défini avant de continuer
    if (this.id) {
      // Obtenez d'abord le quota
      this.getQuota().subscribe({
        next: quota => {
          this.quotaId = quota.idQuota;
          console.log('idQuota:', this.quotaId);

          // Vérifiez que quotaId est défini avant de faire la demande à quotaService
          if (this.quotaId) {
            this.quotaService.getQuota(this.quotaId).subscribe({
              next: data => {
                this.quota = data;
                this.dataSource = new MatTableDataSource([this.quota]); // Utilisez un tableau pour MatTableDataSource
                this.dataSource.paginator = this.matPaginator;
                this.dataSource.sort = this.sort;
              },
              error: err => {
                console.log('Error fetching quota details:', err);
              }
            });
          } else {
            console.log('Quota ID is null or undefined.');
          }
        },
        error: err => {
          console.log('Error fetching quota ID:', err);
        }
      });

      // Obtenez le nom de l'entreprise
      this.getNomAdmin().subscribe({
        next: nom => {
          this.nomAdmin = nom;
        },
        error: err => {
          console.log('Error fetching enterprise name:', err);
        }
      });
    } else {
      console.log('idEntreprise is null or undefined.');
    }
  }



  getNomAdmin(): Observable<string> {
    if (this.id) {
      return this.adminService.getAdmin(this.id).pipe(
        map(admin => admin.nom || '')
      );
    } else {
      console.log('idEntreprise is null or undefined');
      return new Observable<string>();
    }
  }
  getQuota(): Observable<Quota> {
    if (this.id) {
      return this.adminService.getAdmin(this.id).pipe(
        map(admin => {
          // Assurez-vous que 'quota' est bien défini et correspond à Quota
          if (admin.quota) {
            return admin.quota;
          } else {
              console.log('Quota is undefined in admin:', admin);
            return {} as Quota; // Retourner un objet Quota vide en cas de données manquantes
          }
        }),
        catchError(err => {
          console.error('Error fetching quota:', err);
          return of({} as Quota); // Retourner un objet Quota vide en cas d'erreur
        })
      );
    } else {
      console.log('idEntreprise is null or undefined');
      return of({} as Quota); // Retourner un objet Quota vide si idEntreprise est nul ou indéfini
    }
  }


  editQuota(idQuota:string, quota:Quota) {
    this.route.navigateByUrl(`/superAdmin/editQuota/${quota.idQuota}`);
  }
  openEditQuotaDialog(quota: Quota): void {
    const dialogRef = this.dialog.open(EditQuotaAdminComponent, {
      width: '400px',
      data: {
        idQuota: quota.idQuota, // Passer l'ID du quota
        quota: quota  // Passer l'objet quota entier
      }
    });

    // Action après la fermeture du dialogue
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Le quota a été modifié', result);
        // Mettre à jour le dataSource avec le quota mis à jour
        this.quota.valeur = result.valeur; // Met à jour la valeur dans l'objet quota actuel
        this.dataSource.data = [this.quota]; // Réinitialiser les données de la table
      }
    });
  }

  openAddQuotaDialog(entreprise: Entreprise): void {
    console.log('Entreprise pour le dialog:', entreprise); // Vérifiez l'objet
    if (entreprise && entreprise.idEntreprise) {
      const dialogRef = this.dialog.open(AddquotaEntrepriseComponent, {
        width: '400px',
        data: { entrepriseId: entreprise.idEntreprise }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          // Optionnel: Effectuer des actions après la fermeture du dialog si nécessaire
        }
      });
    } else {
      console.error('L\'entreprise ou l\'idEntreprise est undefined.');
    }
  }
}
