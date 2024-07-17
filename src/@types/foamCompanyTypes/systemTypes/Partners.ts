export interface IPartners {
  id?: number;
  nameInEnglish: string;
  nameInPashto: string;
  name?: string;
  phone: string;
  email?: string;
  afterSubmit?: string;
}

export interface IPartnersParams {
  pageIndex: number;
  pageSize: number;
  name?: string;
}
