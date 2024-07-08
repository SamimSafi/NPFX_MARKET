export interface ICategoryType {
  id?: number;
  name?: string;
  description?: string;
}
export interface IContractType {
  id?: number;
  name?: string;
  description?: string;
}

export interface IContractTypeParams {
  pageIndex: number;
  pageSize: number;
  name?: string;
}
