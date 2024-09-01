import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {AdminService} from "../services/admin.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MatTableDataSource} from "@angular/material/table";
import {UtilisateurService} from "../services/utilisateur.service";
import {Utilisateur} from "../Modele/utilisateur.model";
import {DeleteEntrepriseComponent} from "../delete-entreprise/delete-entreprise.component";
import {DeleteUserComponent} from "../delete-user/delete-user.component";
import {MatDialog} from "@angular/material/dialog";
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-liste-utilisateur',
  templateUrl: './liste-utilisateur.component.html',
  styleUrl: './liste-utilisateur.component.css'
})
export class ListeUtilisateurComponent implements OnInit{
  public utilisateur:any;
  public dataSource:any;
  public displayedColumns:string[]=["nom","prenom","telephone","email","departement","quotaUser","etat","actions"];
  admin:any;
  idAdmin!:string;


  @ViewChild(MatPaginator) matPaginator!:MatPaginator;
  @ViewChild(MatSort) sort!:MatSort;
  constructor(private utilisateurService:UtilisateurService,private authervice:AuthService,private route:Router,public dialog:MatDialog) {
  }
  ngOnInit(): void {
    this.admin=this.authervice.getAuthenticatedUser();
    this.idAdmin=this.admin.id;

    this.utilisateurService.listeUtilisateur(this.idAdmin)
      .subscribe({
        next:data => {
          this.utilisateur=data;
          this.dataSource=new MatTableDataSource(this.utilisateur);
          this.dataSource.paginator=this.matPaginator;
          this.dataSource.sort = this.sort;


        },
        error: err => {
          console.log(err)
        }
      })

  }

  editUser(id:string , utilisateur:Utilisateur) {
    this.route.navigateByUrl(`/superAdmin/editUtilisateur/${utilisateur.id}`);
  }

  detailsUser(utilisateur:Utilisateur) {
    this.route.navigateByUrl(`/superAdmin/detailUtilisateur/${utilisateur.id}`);
  }

  deleteUser(utilisateur:Utilisateur) {
    const dialogRef = this.dialog.open(DeleteUserComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Logique de suppression de l'entreprise
        this.utilisateurService.deleteUser(utilisateur.id).subscribe({
          next: () => {
            console.log('Utilisateur supprimée');
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
}
