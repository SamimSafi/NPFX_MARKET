export interface IPartners {
  id?: number;
  name: string;
  phone: string;
  afterSubmit?: string;
}

export interface IPartnersParams {
  pageIndex: number;
  pageSize: number;
  name?: string;
}
