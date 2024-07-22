import { ICommonFieldType } from './commonFieldsType';
export interface IBranch extends ICommonFieldType {
  address?: string;
  modifiedOn?: string;
  parentBranchName?: string;
  parentId?: number;
}

export interface IBranchParams {
  pageIndex?: number;
  pageSize?: number;
  search?: string;
}
