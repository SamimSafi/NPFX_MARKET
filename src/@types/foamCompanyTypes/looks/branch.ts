import { ICommonFieldType } from './commonFieldsType';
export interface IBranch extends ICommonFieldType {
  address?: string;
  afterSubmit?: string;
}

export interface IBranchParams {
  pageIndex?: number;
  pageSize?: number;
  search?: string;
}
