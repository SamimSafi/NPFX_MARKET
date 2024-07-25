export interface ICategoryType {
  id?: number;
  name?: string;
  description?: string;
}
export interface IContractType {
  id?: number;
  name?: string;
  englishName?: string;
  dariName?: string;
  pashtoName?: string;
  code?: string;
}

export interface IContractTypeParams {
  pageIndex: number;
  pageSize: number;
  name?: string;
}
