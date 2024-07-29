export interface Application {
  id?: number;
  title: string;
  abbrevation: string;
  iconClass: string;
  defaultRoute: string;
  area?: string;
  description: string;
}

export interface ApplicationParams {
  pageIndex: number;
  pageSize: number;
  title?: string;
  abbrevation?: string;
  iconClass?: string;
  defaultRoute?: string;
  area?: string;
  description?: string;
  createdOn?: Date | null;
  modifiedOn?: Date | null;
  createdBy?: string;
  modifiedBy?: string;
}
