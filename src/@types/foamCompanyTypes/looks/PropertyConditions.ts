import { ICommonFieldType } from './commonFieldsType';

export interface IPropertyConditions extends ICommonFieldType {
  afterSubmit?: string;
}

export interface IPropertyConditionsParams {
  pageIndex?: number;
  pageSize?: number;
  search?: string;
}
