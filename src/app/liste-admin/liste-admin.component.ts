import {Component, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator, MatPaginatorModule} from "@angular/material/paginator";
import {MatSort, MatSortModule} from "@angular/material/sort";
import {AdminService} from "../services/admin.service";

@Component({
  selector: 'app-liste-admin',
  templateUrl: './liste-admin.component.html',
  styleUrl: './liste-admin.component.css'
})
export class ListeAdminComponent implements OnInit{
  public admins:any;
  public dataSource:any;
  public displayedColumns:string[]=["id","nom","prenom","telephone","email","departement","quota","etat"];

  @ViewChild(MatPaginator) matPaginator!:MatPaginator;
  @ViewChild(MatSort) sort!:MatSort;

  constructor(private adminsService:AdminService) {
  }
  ngOnInit(): void {
    this.adminsService.listeAdmin()
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

}
