export interface Utilisateur{
  id : string;
  nom : string;
  prenom : string;
  telephone : number;
  email : string;
  departement : string;
  quotaUser : number;
  username : string
  password : string
  etat:Etat;

}
export enum Etat {
  Active,Desactive
}
