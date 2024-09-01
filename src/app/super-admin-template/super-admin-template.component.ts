import {Component, OnInit} from '@angular/core';
import {AuthService} from "../services/auth.service";
import {Admin} from "../Modele/admins.model";
import {Router} from "@angular/router";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-super-admin-template',
  templateUrl: './super-admin-template.component.html',
  styleUrl: './super-admin-template.component.css'
})
export class SuperAdminTemplateComponent implements OnInit{
   admin:any;
  constructor(public authService: AuthService, private route: Router) {
  }

  logout() {
    this.authService.logout();
  }



  ngOnInit(): void {
   this.admin=this.authService.getAuthenticatedUser();
  }
  addUtilisateur(admin: Admin) {
    this.route.navigateByUrl(`/superAdmin/addUtilisateur/${admin.id}`);
  }

}
