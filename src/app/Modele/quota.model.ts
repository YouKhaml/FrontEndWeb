export interface Quota{
  idQuota : string;
  valeur : number;
  type : QuotaType;




}
export enum QuotaType {
  ENTREPRISE,
  ADMIN,
  UTILISATEUR
}
