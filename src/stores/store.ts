/* eslint-disable import/no-duplicates */
import { createContext, useContext } from 'react';
import LoginStore from './Login/loginStore';
import CommonStore from './commonStore';
import PermissionStore from './permissionStore';
import LanguageStore from './languageStore';
import RoleStore from './roleStore/roleStore';
import UserStore from './userStore/userStore';

// Archive

import YearStore from './Year/YearStore';
import commonDropdown from './CommonDropdwon/commonDropdown';

import userPerformenceDashboardStore from './userPerformenceDashboard/userPerformenceDashboardStore';

import EmployeeStore from './Employee/EmployeeStore';

import userDashboardStore from './npfxDashboardStores/npfxDashboardStore';
import ProvinceStore from './Province/ProvinceStore';

import DistrictStore from './District/DistrictStore';
import ContractTypeStore from './ContractType/ContractTypeStore';

import ContractDetailsStore from './ContractDetails/ContractDetailsStore';

import PositionTitleStore from './PositionTitle/PositionTitleStore';
import JobPositionStore from './JobPosition/JobPositionStore';
import branchStore from './foamCompanyStores/branchStore';
import ExpenseTypeStore from './foamCompanyStores/ExpenseTypeStore';
import investorStore from './foamCompanyStores/investorStore';
import customerStore from './foamCompanyStores/customerStore';
import supplierStore from './foamCompanyStores/supplierStore';
import ProductOrderStore from './foamCompanyStores/productOrderStore';
import AssetTypeStore from './foamCompanyStores/AssetTypeStore';
import PaymentTypeStore from './foamCompanyStores/PaymentTypeStore';
import LoanTypeStore from './foamCompanyStores/LoanTypeStore';
import CurrencyTypeStore from './foamCompanyStores/CurrencyTypeStore';
import TradeTrackingStore from './foamCompanyStores/TradeTrackingStore';
import PartnersStore from './foamCompanyStores/PartnersStore';
import MainAssetStore from './foamCompanyStores/MainAssetStore';
import ExpenseTrackingStore from './foamCompanyStores/ExpenseTrackingStore';
import LoanTrackingStore from './foamCompanyStores/LoanTrackingStore';
import WithdrawalTrackingStore from './foamCompanyStores/WithdrawalTrackingStore';
import MainAssetDetailsStore from './foamCompanyStores/MainAssetDetailsStore';

import ApplicationStore from './applicationStore';

import npfxDashboardStore from './npfxDashboardStores/npfxDashboardStore';

import ExpenseReportsStore from './NPFXReports/ExpenseReportsStore';
import TradeReportsStore from './NPFXReports/TradeReportsStore';
import LoanReportsStore from './NPFXReports/LoanReportsStore';

import TrainingVideoStore from './foamCompanyStores/TrainingVideoStore';
import CategorysStore from './foamCompanyStores/CategorysStore';
import PropertyConditionsStore from './foamCompanyStores/PropertyConditionsStore';
import MainAssetReportsStore from './NPFXReports/MainAssetReportsStore';
import PropertyStore from './foamCompanyStores/PropertyStore';

interface Store {
  LoginStore: LoginStore;
  CommonStore: CommonStore;
  PermissionStore: PermissionStore;
  LanguageStore: LanguageStore;
  RoleStore: RoleStore;
  UserStore: UserStore;

  //Archive
  YearStore: YearStore;

  // Common Drop Down For All System
  commonDropdown: commonDropdown;

  // user Performence Dashboard and Report
  userPerformenceDashboardStore: userPerformenceDashboardStore;

  // Reception Reports

  // Employee
  EmployeeStore: EmployeeStore;

  ContractDetailsStore: ContractDetailsStore;

  // User Dashboard
  userDashboardStore: userDashboardStore;

  // Province
  ProvinceStore: ProvinceStore;
  // District
  DistrictStore: DistrictStore;

  //ContractType
  ContractTypeStore: ContractTypeStore;

  PositionTitleStore: PositionTitleStore;

  JobPositionStore: JobPositionStore;

  // Foam Company Stores
  branchStore: branchStore;
  ExpenseTypeStore: ExpenseTypeStore;
  investorStore: investorStore;
  customerStore: customerStore;
  supplierStore: supplierStore;
  AssetTypeStore: AssetTypeStore;
  ProductOrderStore: ProductOrderStore;
  PaymentTypeStore: PaymentTypeStore;
  LoanTypeStore: LoanTypeStore;
  CurrencyTypeStore: CurrencyTypeStore;
  TradeTrackingStore: TradeTrackingStore;
  PartnersStore: PartnersStore;
  MainAssetStore: MainAssetStore;
  MainAssetDetailsStore: MainAssetDetailsStore;
  ExpenseTrackingStore: ExpenseTrackingStore;
  LoanTrackingStore: LoanTrackingStore;
  WithdrawalTrackingStore: WithdrawalTrackingStore;

  ApplicationStore: ApplicationStore;

  npfxDashboardStore: npfxDashboardStore;

  ExpenseReportsStore: ExpenseReportsStore;
  TradeReportsStore: TradeReportsStore;
  LoanReportsStore: LoanReportsStore;
  CategorysStore: CategorysStore;
  PropertyConditionsStore: PropertyConditionsStore;
  MainAssetReportsStore: MainAssetReportsStore;

  TrainingVideoStore: TrainingVideoStore;
  PropertyStore: PropertyStore;
}
//Include All store below
export const store: Store = {
  LoginStore: new LoginStore(),
  CommonStore: new CommonStore(),
  commonDropdown: new commonDropdown(),
  PermissionStore: new PermissionStore(),
  LanguageStore: new LanguageStore(),
  RoleStore: new RoleStore(),
  UserStore: new UserStore(),
  //Archive
  YearStore: new YearStore(),
  userPerformenceDashboardStore: new userPerformenceDashboardStore(),

  //Employee
  EmployeeStore: new EmployeeStore(),
  ContractDetailsStore: new ContractDetailsStore(),

  // User Dashboardstore
  userDashboardStore: new userDashboardStore(),

  // PMIS
  ProvinceStore: new ProvinceStore(),
  DistrictStore: new DistrictStore(),

  //ContractType
  ContractTypeStore: new ContractTypeStore(),

  PositionTitleStore: new PositionTitleStore(),

  JobPositionStore: new JobPositionStore(),
  // Foam Company Stores
  branchStore: new branchStore(),
  ExpenseTypeStore: new ExpenseTypeStore(),
  investorStore: new investorStore(),
  customerStore: new customerStore(),
  supplierStore: new supplierStore(),
  AssetTypeStore: new AssetTypeStore(),
  ProductOrderStore: new ProductOrderStore(),
  PaymentTypeStore: new PaymentTypeStore(),
  LoanTypeStore: new LoanTypeStore(),
  CurrencyTypeStore: new CurrencyTypeStore(),
  TradeTrackingStore: new TradeTrackingStore(),
  PartnersStore: new PartnersStore(),
  MainAssetStore: new MainAssetStore(),
  MainAssetDetailsStore: new MainAssetDetailsStore(),
  ExpenseTrackingStore: new ExpenseTrackingStore(),
  LoanTrackingStore: new LoanTrackingStore(),
  WithdrawalTrackingStore: new WithdrawalTrackingStore(),

  ApplicationStore: new ApplicationStore(),

  npfxDashboardStore: new npfxDashboardStore(),

  ExpenseReportsStore: new ExpenseReportsStore(),
  TradeReportsStore: new TradeReportsStore(),
  LoanReportsStore: new LoanReportsStore(),
  CategorysStore: new CategorysStore(),
  PropertyConditionsStore: new PropertyConditionsStore(),
  MainAssetReportsStore: new MainAssetReportsStore(),

  TrainingVideoStore: new TrainingVideoStore(),
  PropertyStore: new PropertyStore(),
};

export const StoreContext = createContext(store);
export function useStore() {
  return useContext(StoreContext);
}
