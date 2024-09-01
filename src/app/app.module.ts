import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { SuperAdminTemplateComponent } from './super-admin-template/super-admin-template.component';
import {MatToolbar, MatToolbarModule} from "@angular/material/toolbar";
import {MatButton, MatButtonModule} from "@angular/material/button";
import {MatIcon, MatIconModule} from "@angular/material/icon";
import {MatMenu, MatMenuModule} from "@angular/material/menu";
import {MatSidenav, MatSidenavModule} from "@angular/material/sidenav";
import {MatListItem, MatListModule} from "@angular/material/list";
import { AddEntrepriseComponent } from './add-entreprise/add-entreprise.component';
import { ListeEntrepriseComponent } from './liste-entreprise/liste-entreprise.component';
import { HomeComponent } from './home/home.component';
import { AddAdminComponent } from './add-admin/add-admin.component';
import { ListeAdminComponent } from './liste-admin/liste-admin.component';
import {MatCard, MatCardModule} from "@angular/material/card";
import { LoginComponent } from './login/login.component';
import {MatFormField, MatFormFieldModule} from "@angular/material/form-field";
import {MatInput, MatInputModule} from "@angular/material/input";
import {ReactiveFormsModule} from "@angular/forms";
import {AuthGuard} from "./guards/auth.guard";
import {AuthorizationGuard} from "./guards/authorization.guard";
import {MatTable, MatTableModule} from "@angular/material/table";
import {MatSort, MatSortModule} from "@angular/material/sort";
import {HttpClientModule, provideHttpClient, withFetch} from "@angular/common/http";
import {MatPaginator, MatPaginatorModule} from "@angular/material/paginator";
import { DeleteEntrepriseComponent } from './delete-entreprise/delete-entreprise.component';
import {MatDialogActions, MatDialogContent, MatDialogModule} from "@angular/material/dialog";
import { ListeAdminEntrepriseComponent } from './liste-admin-entreprise/liste-admin-entreprise.component';
import {MatTooltip, MatTooltipModule} from "@angular/material/tooltip";
import { ListeUtilisateurComponent } from './liste-utilisateur/liste-utilisateur.component';
import { AdminTemplateComponent } from './admin-template/admin-template.component';
import { AccessDeniedComponent } from './access-denied/access-denied.component';
import { AddUtilisateurComponent } from './add-utilisateur/add-utilisateur.component';
import { DeleteUserComponent } from './delete-user/delete-user.component';
import { EditUtilisateurComponent } from './edit-utilisateur/edit-utilisateur.component';
import { DetailUtilisateurComponent } from './detail-utilisateur/detail-utilisateur.component';
import { DetailAdminComponent } from './detail-admin/detail-admin.component';
import { EditAdminComponent } from './edit-admin/edit-admin.component';
import { DeleteAdminComponent } from './delete-admin/delete-admin.component';
import {MatStepper, MatStepperModule} from "@angular/material/stepper";
import { EditEntrepriseComponent } from './edit-entreprise/edit-entreprise.component';
import { AddquotaEntrepriseComponent } from './addquota-entreprise/addquota-entreprise.component';
import { DetailsQuotaComponent } from './details-quota/details-quota.component';
import { EditQuotaComponent } from './edit-quota/edit-quota.component';
import { AddquotaAdminComponent } from './addquota-admin/addquota-admin.component';
import { DetailsQuotaAdminComponent } from './details-quota-admin/details-quota-admin.component';
import { EditQuotaAdminComponent } from './edit-quota-admin/edit-quota-admin.component';



@NgModule({
  declarations: [
    AppComponent,
    SuperAdminTemplateComponent,
    AddEntrepriseComponent,
    ListeEntrepriseComponent,
    HomeComponent,
    AddAdminComponent,
    ListeAdminComponent,
    LoginComponent,
    DeleteEntrepriseComponent,
    ListeAdminEntrepriseComponent,
    ListeUtilisateurComponent,
    AdminTemplateComponent,
    AccessDeniedComponent,
    AddUtilisateurComponent,
    DeleteUserComponent,
    EditUtilisateurComponent,
    DetailUtilisateurComponent,
    DetailAdminComponent,
    EditAdminComponent,
    DeleteAdminComponent,
    EditEntrepriseComponent,
    AddquotaEntrepriseComponent,
    DetailsQuotaComponent,
    EditQuotaComponent,
    AddquotaAdminComponent,
    DetailsQuotaAdminComponent,
    EditQuotaAdminComponent,


  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        MatToolbarModule,
        MatButtonModule,
        MatIconModule,
        MatMenuModule,
        MatSidenavModule,
        MatListModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        HttpClientModule,
        MatTableModule,
        MatSortModule,
        MatPaginatorModule,
        MatDialogModule,
        MatTooltipModule,
        MatStepperModule,


    ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync(),
    provideHttpClient(withFetch()), // Ajoutez ceci pour activer fetch
    AuthGuard,
    AuthorizationGuard,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
