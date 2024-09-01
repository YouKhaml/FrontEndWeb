/*
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {ListeEntrepriseComponent} from "./liste-entreprise/liste-entreprise.component";
import {AddEntrepriseComponent} from "./add-entreprise/add-entreprise.component";
import {AddAdminComponent} from "./add-admin/add-admin.component";
import {ListeAdminComponent} from "./liste-admin/liste-admin.component";
import {LoginComponent} from "./login/login.component";
import {SuperAdminTemplateComponent} from "./super-admin-template/super-admin-template.component";
import {AuthGuard} from "./guards/auth.guard";
import {AuthorizationGuard} from "./guards/authorization.guard";
import {DeleteEntrepriseComponent} from "./delete-entreprise/delete-entreprise.component";
import {ListeAdminEntrepriseComponent} from "./liste-admin-entreprise/liste-admin-entreprise.component";
import {ListeUtilisateurComponent} from "./liste-utilisateur/liste-utilisateur.component";
import {AdminTemplateComponent} from "./admin-template/admin-template.component";

const routes: Routes = [
  {path:"",component:LoginComponent},
  {path:"login",component:LoginComponent},
  {path:"superAdmin",component:SuperAdminTemplateComponent,
    canActivate : [AuthGuard],
    children :[
      {path:"home",component:HomeComponent},
      {path:"addEntreprise",component:AddEntrepriseComponent,canActivate : [AuthorizationGuard] , data :{role:["SuperAdmin"]}},
      {path:"listeEntreprise",component:ListeEntrepriseComponent,canActivate : [AuthorizationGuard] , data :{role:["SuperAdmin"]}},
      {path:"addAdmin/:idEntreprise",component:AddAdminComponent,canActivate : [AuthorizationGuard] , data :{role:["SuperAdmin"]}},
      {path:"deleteEntreprise/:idEntreprise",component:DeleteEntrepriseComponent,canActivate : [AuthorizationGuard] , data :{role:["SuperAdmin"]}},
      {path:"listeAdmin/:idEntreprise",component:ListeAdminEntrepriseComponent,canActivate : [AuthorizationGuard] , data :{role:["SuperAdmin"]}},
      {
        path:"listeAdmin",component:ListeAdminComponent,
        canActivate : [AuthorizationGuard] , data :{role:["SuperAdmin"]}
      },
      {path:"listeUtilisateur",component:ListeUtilisateurComponent},

    ]},

 /!* {path:"Admin",component:AdminTemplateComponent,
    canActivate : [AuthGuard],
    children :[
      {path:"home",component:HomeComponent},
      {path:"listeUtilisateur",component:ListeUtilisateurComponent},

    ]},*!/



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
*/
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from "./home/home.component";
import { ListeEntrepriseComponent } from "./liste-entreprise/liste-entreprise.component";
import { AddEntrepriseComponent } from "./add-entreprise/add-entreprise.component";
import { AddAdminComponent } from "./add-admin/add-admin.component";
import { ListeAdminComponent } from "./liste-admin/liste-admin.component";
import { LoginComponent } from "./login/login.component";
import { SuperAdminTemplateComponent } from "./super-admin-template/super-admin-template.component";
import { AuthGuard } from "./guards/auth.guard";
import { AuthorizationGuard } from "./guards/authorization.guard";
import { DeleteEntrepriseComponent } from "./delete-entreprise/delete-entreprise.component";
import { ListeAdminEntrepriseComponent } from "./liste-admin-entreprise/liste-admin-entreprise.component";
import { ListeUtilisateurComponent } from "./liste-utilisateur/liste-utilisateur.component";
import { AdminTemplateComponent } from "./admin-template/admin-template.component";
import { AccessDeniedComponent } from './access-denied/access-denied.component';
import {AddUtilisateurComponent} from "./add-utilisateur/add-utilisateur.component";
import {EditUtilisateurComponent} from "./edit-utilisateur/edit-utilisateur.component";
import {DetailUtilisateurComponent} from "./detail-utilisateur/detail-utilisateur.component";
import {DetailAdminComponent} from "./detail-admin/detail-admin.component";
import {EditAdminComponent} from "./edit-admin/edit-admin.component";
import {EditEntrepriseComponent} from "./edit-entreprise/edit-entreprise.component";
import {AddquotaEntrepriseComponent} from "./addquota-entreprise/addquota-entreprise.component";
import {DetailsQuotaComponent} from "./details-quota/details-quota.component";
import {EditQuotaComponent} from "./edit-quota/edit-quota.component";
import {DetailsQuotaAdminComponent} from "./details-quota-admin/details-quota-admin.component";



const routes: Routes = [
  { path: "", component: LoginComponent },
  { path: "login", component: LoginComponent },
  { path: "access-denied", component: AccessDeniedComponent },
  { path: "superAdmin", component: SuperAdminTemplateComponent, canActivate: [AuthGuard], children: [
      { path: "home", component: HomeComponent },
      { path: "addEntreprise", component: AddEntrepriseComponent, canActivate: [AuthorizationGuard], data: { role: ["SuperAdmin"] } },
      { path: "listeEntreprise", component: ListeEntrepriseComponent, canActivate: [AuthorizationGuard], data: { role: ["SuperAdmin"] } },
      { path: "addAdmin/:idEntreprise", component: AddAdminComponent, canActivate: [AuthorizationGuard], data: { role: ["SuperAdmin"] } },
      { path: "deleteEntreprise/:idEntreprise", component: DeleteEntrepriseComponent, canActivate: [AuthorizationGuard], data: { role: ["SuperAdmin"] } },
      { path: "listeAdmin/:idEntreprise", component: ListeAdminEntrepriseComponent, canActivate: [AuthorizationGuard], data: { role: ["SuperAdmin"] } },
      { path: "listeAdmin", component: ListeAdminComponent, canActivate: [AuthorizationGuard], data: { role: ["SuperAdmin"] } },
      { path: "listeUtilisateur", component: ListeUtilisateurComponent , canActivate: [AuthorizationGuard], data: { role: ["Admin","SuperAdmin"] } },
      { path: "addUtilisateur/:idAdmin", component: AddUtilisateurComponent },
      {path: "editUtilisateur/:id",component:EditUtilisateurComponent},
      {path: "detailUtilisateur/:id",component:DetailUtilisateurComponent},
      {path: "detailAdmin/:id",component:DetailAdminComponent},
      {path: "editAdmin/:id",component:EditAdminComponent},
      {path: "editEntreprise/:id",component:EditEntrepriseComponent},
      {path: 'addQuota/:idEntreprise', component: AddquotaEntrepriseComponent },
      {path: 'quota/:idEntreprise', component: DetailsQuotaComponent },
      {path: "editQuota/:id",component:EditQuotaComponent},
      {path: 'quotaAdmin/:id', component: DetailsQuotaAdminComponent },








    ]},
  // Route de secours pour les chemins non définis
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
