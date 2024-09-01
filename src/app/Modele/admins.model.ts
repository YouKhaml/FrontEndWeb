import {Quota} from "./quota.model";

export interface Admin{
  id : string;
  nom : string;
  prenom : string;
  telephone : number;
  email : string;
  departement : string;
  quota : Quota;
  username : string
  password : string
  etat:Etat;
  idEntreprise:string;

}
export enum Etat {
  Active,Desactive
}
