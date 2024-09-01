import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {AdminService} from "../services/admin.service";
import {MatTableDataSource} from "@angular/material/table";
import {ActivatedRoute, Router} from "@angular/router";
import {Admin} from "../Modele/admins.model";
import {DeleteUserComponent} from "../delete-user/delete-user.component";
import {MatDialog} from "@angular/material/dialog";
import {DeleteAdminComponent} from "../delete-admin/delete-admin.component";
import {EntrepriseService} from "../services/entreprise.service";
import {map, Observable} from "rxjs";
import {Entreprise} from "../Modele/Entreprises.model";
import {AddquotaEntrepriseComponent} from "../addquota-entreprise/addquota-entreprise.component";
import {AddquotaAdminComponent} from "../addquota-admin/addquota-admin.component";

@Component({
  selector: 'app-liste-admin-entreprise',
  templateUrl: './liste-admin-entreprise.component.html',
  styleUrl: './liste-admin-entreprise.component.css'
})
export class ListeAdminEntrepriseComponent implements OnInit{

  public admins:any;
  public dataSource:any;
  public displayedColumns:string[]=["nom","prenom","telephone","email","departement","quota","etat","actions"];
  idEntreprise!:string;
  entreprise!:any;
  nomEntreprise!: string;
  @ViewChild(MatPaginator) matPaginator!:MatPaginator;
  @ViewChild(MatSort) sort!:MatSort;

  constructor(private entrepriseService:EntrepriseService, private adminsService:AdminService,private activatedRoute:ActivatedRoute,private route:Router,public dialog:MatDialog) {
  }
  ngOnInit(): void {
    this.idEntreprise=this.activatedRoute.snapshot.params['idEntreprise'];
    this.getNomEntreprise().subscribe(nom => {
      this.nomEntreprise = nom;
    });
    this.adminsService.listeAdminEntreprise(this.idEntreprise)
      .subscribe({
        next:data => {
          this.admins=data;
          this.dataSource=new MatTableDataSource(this.admins);
          this.dataSource.paginator=this.matPaginator;
          this.dataSource.sort = this.sort;


        },
        error: err => {
          console.log(err)
        }
      })

  }

  detailsAdmin(admin:Admin) {
    this.route.navigateByUrl(`/superAdmin/detailAdmin/${admin.id}`);
  }

  editAdmin(id:string, admin:Admin) {
    this.route.navigateByUrl(`/superAdmin/editAdmin/${admin.id}`);
  }

  deleteAdmin(admin:Admin) {
    const dialogRef = this.dialog.open(DeleteAdminComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Logique de suppression de l'entreprise
        this.adminsService.deleteAdmin(admin.id).subscribe({
          next: () => {
            console.log('Admin supprimée');
            // Mettez à jour la table après suppression
            this.ngOnInit();
          },
          error: err => {
            console.log(err);
          }
        });
      } else {
        console.log('Suppression annulée');
      }
    });
  }
  getNomEntreprise(): Observable<string> {
    if (this.idEntreprise) {
      return this.entrepriseService.getEntreprise(this.idEntreprise).pipe(
        map(entreprise => entreprise.nom || '')
      );
    } else {
      console.log('idEntreprise is null or undefined');
      return new Observable<string>();
    }
  }
  openAddQuotaDialog(admin: Admin): void {
    console.log('Admin pour le dialog:', admin); // Vérifiez l'objet
    if (admin && admin.id) {
      const dialogRef = this.dialog.open(AddquotaAdminComponent, {
        width: '400px',
        data: { id: admin.id }
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
  detailQuotaAdmin(admin:Admin) {
    this.route.navigateByUrl(`/superAdmin/quotaAdmin/${admin.id}`)


  }
}
