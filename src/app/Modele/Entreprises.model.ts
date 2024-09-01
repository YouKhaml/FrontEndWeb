import {Quota} from "./quota.model";

export interface Entreprise{
  idEntreprise : string ;
  nom : string ;
  email : string ;
  telephone : number ;
  adresse : string ;
  rs : string ;
  rc:string
  icf : string ;
  //quota : number ;
  quota:Quota;
  //idQuota : string;

}
