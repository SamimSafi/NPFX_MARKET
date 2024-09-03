import { ICommonFieldType } from './commonFieldsType';

export interface ICategorys extends ICommonFieldType {
  afterSubmit?: string;
}

export interface ICategorysParams {
  pageIndex?: number;
  pageSize?: number;
  search?: string;
}
