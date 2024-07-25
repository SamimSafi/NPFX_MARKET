export interface IContractDetails {
  id?: number;
  employeeProfileId?: number;
  contractTypeId?: number;
  currencyTypeId?: number;
  positionTitleId?: number;
  branchId?: number;
  salaryAmount?: number;
  startDate?: Date;
  endDate?: Date;
  isCurrent?: boolean;
  remarks?: string;
  employeeName?: string;
  positionTitle?: string;
  contractType?: string;
  salaryPerHour?: string;
  branch?: string;
  afterSubmit?: string;
}

export interface IContractDetailsParams {
  pageIndex: number;
  pageSize: number;
  searchBy?: string;
}
