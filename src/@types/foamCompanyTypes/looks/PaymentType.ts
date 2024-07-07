import { ICommonFieldType } from './commonFieldsType';

export interface IPaymentType extends ICommonFieldType {
  afterSubmit?: string;
}

export interface IPaymentTypeParams {
  pageIndex: number;
  pageSize: number;
  name?: string;
}
