import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {EntrepriseService} from "../services/entreprise.service";
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";
import {Entreprise} from "../Modele/Entreprises.model";
import {Router, RouterModule} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {DeleteEntrepriseComponent} from "../delete-entreprise/delete-entreprise.component";
import {Admin} from "../Modele/admins.model";
import {AddquotaEntrepriseComponent} from "../addquota-entreprise/addquota-entreprise.component";

@Component({
  selector: 'app-liste-entreprise',
  templateUrl: './liste-entreprise.component.html',
  styleUrl: './liste-entreprise.component.css'
})
export class ListeEntrepriseComponent implements OnInit{
  public entreprises : any;
  public dataSourceEntreprise : any;
  public displayedColumns : string []=["nom","email","telephone","adresse","rs","rc","icf","quota","Admin"];

  @ViewChild(MatPaginator) matPaginator!:MatPaginator;
  @ViewChild(MatSort) sort!:MatSort;

  constructor(private entrepriseService:EntrepriseService,private route:Router,public dialog:MatDialog) {
  }
  ngOnInit(): void {
    this.entrepriseService.ListeEntreprise()
      .subscribe({
        next : data => {
          this.entreprises=data ;
          this.dataSourceEntreprise=new MatTableDataSource(this.entreprises);
          this.dataSourceEntreprise.paginator=this.matPaginator;
          this.dataSourceEntreprise.sort = this.sort;

        },
        error : err => {
          console.log(err)
        }
      });
    console.log('Entreprises:', this.entreprises);
  }

  addAdmin(entreprise:Entreprise) {
    this.route.navigateByUrl(`/superAdmin/addAdmin/${entreprise.idEntreprise}`);
  }

  deleteEntreprise(entreprise: Entreprise) {
    const dialogRef = this.dialog.open(DeleteEntrepriseComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Logique de suppression de l'entreprise
        this.entrepriseService.deleteEntreprise(entreprise.idEntreprise).subscribe({
          next: () => {
            console.log('Entreprise supprimée');
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

  listAdminEntreprise(entreprise:Entreprise) {
   this.route.navigateByUrl(`/superAdmin/listeAdmin/${entreprise.idEntreprise}`)


  }

  editEntreprise(id:string, entreprise:Entreprise) {
    this.route.navigateByUrl(`/superAdmin/editEntreprise/${entreprise.idEntreprise}`);
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
  detailQuota(entreprise:Entreprise) {
    this.route.navigateByUrl(`/superAdmin/quota/${entreprise.idEntreprise}`)


  }

}
