import { makeAutoObservable } from 'mobx';
import {
  SelectControl,
  SelectControl6,
  EmpPositionDropdown,
  EmployeeDropdown,
} from 'src/@types/common';
import {
  roleDropdown,
  LanguageDropdown,
  UserDropdown,
  PermissionDropdown,
  ChildUserDropdown,
  OrganizationUserDropdown,
  EmployeeDropDown,
  IDDL,
  IGetActiveEmp,
  IGetParentEmp,
} from 'src/@types/commonDropdownTypes';

import agent from 'src/api/agent';
export default class commonDroptdown {
  BranchOption: SelectControl[] = []; // for Department Type dropdown

  LoanTypeOption: SelectControl[] = []; // for Department Type dropdown

  PayTypeOption: SelectControl[] = []; // for Department Type dropdown

  MainAssetOption: SelectControl[] = []; // for Department Type dropdown

  PartnersOption: SelectControl[] = []; // for Department Type dropdown

  AssetTypeOption: SelectControl[] = []; // for Department Type dropdown

  CurrencyTypeOption: SelectControl[] = []; // for Department Type dropdown

  ExpenseTypeOption: SelectControl[] = []; // For Child Department DropDown

  ContractTypeOption: SelectControl[] = [];

  ChildDepartmentOption: SelectControl[] = []; // For Child Department DropDown

  ProvinceOption: SelectControl[] = []; // For Child Province DropDown

  DistrictOption: SelectControl[] = []; // For Child Province DropDown

  LanguageOption: SelectControl[] = []; // for Language Type dropdown

  UserOption: SelectControl6[] = []; // for Create User dropdown

  OraganizationUserOption: SelectControl[] = []; // for Create User dropdown

  ChildUserOption: SelectControl[] = []; // for Create User dropdown

  RolesOption: SelectControl[] = []; // for Roles dropdown

  PermissionOption: SelectControl[] = []; // for Application Dropdown

  EmployeeOption: SelectControl[] = []; // for Employee DDl

  EmployeePositionOption: SelectControl[] = []; // for dropdown

  EducationTitleOption: SelectControl[] = []; // Activity Type

  PositionTitleOption: SelectControl[] = [];

  JobPositionOption: SelectControl[] = [];

  EmpHealthStatusOption: SelectControl[] = [];

  // Country Select Control
  CountryOption: SelectControl[] = [];

  // Get Active Employee
  GetActiveEmployeeOption: SelectControl[] = [];

  // Get Parent Employee
  GetParentEmployeeOption: SelectControl[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  loadRoleDropdown = async () => {
    //console.log(agent.Permissions.getList({pageIndex:0,pageSize:10}));
    try {
      const result = await agent.RolesAgent.getRoleDDl();
      this.setRoleDropdown(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  setRoleDropdown = (data: roleDropdown[]) => {
    const op = data.map((op) => {
      const optRow = {
        text: op.name,
        value: op.id,
      };
      return optRow;
    });
    this.RolesOption = op;
  };

  loadLanguageDropdown = async () => {
    //console.log(agent.Permissions.getList({pageIndex:0,pageSize:10}));
    try {
      const result = await agent.Lanugages.getLanguageDDL();
      this.setLanguageDropdown(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  setLanguageDropdown = (data: LanguageDropdown[]) => {
    const op = data.map((op) => {
      const optRow = {
        text: op.name,
        value: op.id,
      };
      return optRow;
    });
    this.LanguageOption = op;
  };

  // User  Dropdown
  loadUserDropdown = async (depId: any, isLoggedUser?: boolean) => {
    if (!isLoggedUser) {
      isLoggedUser = false;
    }
    try {
      const result = await agent.createUser.userDropDownbyDepartment(depId, isLoggedUser);
      console.log(result);
      this.setUserOptions(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  setUserOptions = (data: UserDropdown[]) => {
    const op = data.map((op) => {
      const optRow = {
        text: op.userName,
        value: op.id,
        dep: op.departmentId,
      };
      return optRow;
    });
    this.UserOption = op;
  };

  // User  Dropdown
  loadRelatedUserByDepartmentDDL = async () => {
    try {
      const result = await agent.Employees.getEmpRelatedDepartmentDDL();
      this.setRelatedUserByDepartmentDDL(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  setRelatedUserByDepartmentDDL = (data: EmployeeDropdown[]) => {
    const op = data.map((op) => {
      const optRow = {
        text: op.name,
        value: op.id,
      };
      return optRow;
    });
    this.EmployeeOption = op;
  };

  loadOrganizationUserDropdown = async (orgId: any) => {
    try {
      const result = await agent.createUser.UserDDlByOrganization(orgId);
      // console.log(result);
      this.setUserOptions(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  setOrganizationUserOptions = (data: OrganizationUserDropdown[]) => {
    const op = data.map((op) => {
      const optRow = {
        text: op.userName,
        value: op.id,
      };
      return optRow;
    });
    this.OraganizationUserOption = op;
  };

  // User  Dropdown
  loadChildUserDropdown = async () => {
    try {
      const result = await agent.createUser.childUserDDl();
      this.setChildUserOptions(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  setChildUserOptions = (data: ChildUserDropdown[]) => {
    const op = data.map((op) => {
      const optRow = {
        text: op.userName,
        value: op.id,
      };
      return optRow;
    });
    this.ChildUserOption = op;
  };

  // Shelf Dropdown
  loadPermissionDropdown = async (id: number) => {
    try {
      const result = await agent.Permissions.getPermissionDDL(id);
      this.setPermissionDropdown(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  setPermissionDropdown = (data: PermissionDropdown[]) => {
    const op = data.map((op) => {
      const optRow = {
        text: op.name,
        value: op.id,
      };
      return optRow;
    });
    this.PermissionOption = op;
  };

  loadEmployeePositionDropdown = async () => {
    // try {
    //  // const result = await agent.EmployeesPosition.EmpPositionDDL();
    //   this.setEmployeePositionOptions(result.data);
    // } catch (error) {
    //   console.log(error);
    // }
  };

  setEmployeePositionOptions = (data: EmpPositionDropdown[]) => {
    const op = data.map((op) => {
      const optRow = {
        text: op.name,
        value: op.id,
      };
      return optRow;
    });
    this.EmployeePositionOption = op;
  };

  // Employee Dropdown
  loadEmployeeDropdown = async (EmpStatus: any) => {
    try {
      const result = await agent.Employees.EmpDDL(EmpStatus);

      this.setEmployeeOptions(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  setEmployeeOptions = (data: EmployeeDropDown[]) => {
    const op = data.map((op) => {
      const optRow = {
        text: op.name + ('(' + op.fatherName + ')'),
        value: op.id,
        hasAccount: op.hasAccount,
      };
      return optRow;
    });
    this.EmployeeOption = op;
  };

  // Employee Dropdown
  loadEmployeeDropdownByDepartment = async (EmpStatus: number): Promise<SelectControl[]> => {
    try {
      const result = await agent.Employees.EmpDDLByDepartment(EmpStatus);
      const employeeOptions = this.setEmployeeOptionsByDepartment(result.data);
      return employeeOptions;
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  setEmployeeOptionsByDepartment = (data: EmployeeDropDown[]): SelectControl[] =>
    data.map((op) => ({
      text: op.name + ('(' + op.fatherName + ')'),
      value: op.id,
    }));

  // Province Dropdown
  loadProvinceDropdown = async () => {
    try {
      const result = await agent.province.provinceDDL();
      this.setProvinceOptions(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  setProvinceOptions = (data: LanguageDropdown[]) => {
    const op = data.map((op) => {
      const optRow = {
        text: op.name,
        value: op.id,
      };
      return optRow;
    });
    this.ProvinceOption = op;
  };

  // District Dropdown
  loadDistrictDropdown = async (provinceId: any) => {
    try {
      const result = await agent.district.districtDDL(provinceId);
      this.setDistrictOptions(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  setDistrictOptions = (data: IDDL[]) => {
    const op = data.map((op) => {
      const optRow = {
        text: op.name,
        value: op.id,
      };
      return optRow;
    });
    this.DistrictOption = op;
  };

  // loadPositionTitleDDL
  loadPositionTitleDDL = async (departmentId: any) => {
    try {
      const result = await agent.PositionTitle.DDl(departmentId);

      this.setPositionTitleDDL(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  setPositionTitleDDL = (data: IDDL[]) => {
    const op = data.map((op) => {
      const optRow = {
        text: op.name,
        value: op.id,
        isActive: op.isActive,
      };
      return optRow;
    });
    this.PositionTitleOption = op;
  };

  // loadJobPositionDDL
  loadJobPositionDDL = async () => {
    try {
      const result = await agent.JobPosition.DDl();

      this.setJobPositionDDL(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  setJobPositionDDL = (data: IDDL[]) => {
    const op = data.map((op) => {
      const optRow = {
        text: op.name,
        value: op.id,
      };
      return optRow;
    });
    this.JobPositionOption = op;
  };

  // Country Dropdown
  loadCountryDropdown = async () => {
    try {
      const result = await agent.Country.DDl();
      this.setCountryDDL(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  setCountryDDL = (data: IDDL[]) => {
    const op = data.map((op) => {
      const optRow = {
        text: op.name,
        value: op.id,
      };
      return optRow;
    });
    this.CountryOption = op;
  };

  // Get Active Employee
  loadGetActiveEmployeeDropdown = async (id: number) => {
    try {
      const result = await agent.GetActiveEmp.DDl(id);
      this.setGetActiveEmployeeDDL(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  setGetActiveEmployeeDDL = (data: IGetActiveEmp[]) => {
    const op = data.map((op) => {
      const optRow = {
        text: op.employeeFullName,
        value: op.contractId,
      };
      return optRow;
    });
    this.GetActiveEmployeeOption = op;
  };

  // Get Parent Employee
  loadGetParentEmployeeDropdown = async (id: number) => {
    try {
      const result = await agent.GetParentEmp.DDl(id);
      this.setGetParentEmployeeDDL(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  setGetParentEmployeeDDL = (data: IGetParentEmp[]) => {
    const op = data.map((op) => {
      const optRow = {
        text: op.name,
        value: op.id,
      };
      return optRow;
    });
    this.GetParentEmployeeOption = op;
  };

  // ================  start of NPFX DDLS  ========================

  // ExpenseType Dropdown
  loadExpenseTypeDropdown = async () => {
    try {
      const result = await agent.ExpenseType.DDl();
      this.setExpenseTypeDDL(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  setExpenseTypeDDL = (data: IDDL[]) => {
    const op = data.map((op) => {
      const optRow = {
        text: op.name,
        value: op.id,
      };
      return optRow;
    });
    this.ExpenseTypeOption = op;
  };

  // Branch DDL
  loadBranchDDL = async () => {
    try {
      const result = await agent.Branch.DDl();

      this.setBranchDDL(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  setBranchDDL = (data: IDDL[]) => {
    const op = data.map((op) => {
      const optRow = {
        text: op.name,
        value: op.id,
      };
      return optRow;
    });
    this.BranchOption = op;
  };

  // loadContractTypeDDL
  loadContractTypeDDL = async () => {
    try {
      const result = await agent.ContractType.DDl();

      this.setContractTypeDDL(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  setContractTypeDDL = (data: IDDL[]) => {
    const op = data.map((op) => {
      const optRow = {
        text: op.name,
        value: op.id,
      };
      return optRow;
    });
    this.ContractTypeOption = op;
  };

  // loadPartnersDDL
  loadPartnersDDL = async () => {
    try {
      const result = await agent.Partners.DDl();

      this.setPartnersDDL(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  setPartnersDDL = (data: IDDL[]) => {
    const op = data.map((op) => {
      const optRow = {
        text: op.name,
        value: op.id,
      };
      return optRow;
    });
    this.PartnersOption = op;
  };

  // loadAssetTypeDDL
  loadAssetTypeDDL = async () => {
    try {
      const result = await agent.AssetType.DDl();

      this.setAssetTypeDDL(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  setAssetTypeDDL = (data: IDDL[]) => {
    const op = data.map((op) => {
      const optRow = {
        text: op.name,
        value: op.id,
      };
      return optRow;
    });
    this.AssetTypeOption = op;
  };

  // loadCurrencyTypeDDL
  loadCurrencyTypeDDL = async () => {
    try {
      const result = await agent.CurrencyType.DDl();

      this.setCurrencyTypeDDL(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  setCurrencyTypeDDL = (data: IDDL[]) => {
    const op = data.map((op) => {
      const optRow = {
        text: op.name,
        value: op.id,
      };
      return optRow;
    });
    this.CurrencyTypeOption = op;
  };

  // loadLoanTypeDDL
  loadLoanTypeDDL = async () => {
    try {
      const result = await agent.LoanType.DDl();

      this.setLoanTypeDDL(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  setLoanTypeDDL = (data: IDDL[]) => {
    const op = data.map((op) => {
      const optRow = {
        text: op.name,
        value: op.id,
      };
      return optRow;
    });
    this.LoanTypeOption = op;
  };

  // loadPayTypeDDL
  loadPayTypeDDL = async () => {
    try {
      const result = await agent.PaymentType.DDl();

      this.setPayTypeDDL(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  setPayTypeDDL = (data: IDDL[]) => {
    const op = data.map((op) => {
      const optRow = {
        text: op.name,
        value: op.id,
      };
      return optRow;
    });
    this.PayTypeOption = op;
  };

  // loadMainAssetDDL
  loadMainAssetDDL = async () => {
    try {
      const result = await agent.MainAsset.DDl();

      this.setMainAssetDDL(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  setMainAssetDDL = (data: IDDL[]) => {
    const op = data.map((op) => {
      const optRow = {
        text: op.name,
        value: op.id,
      };
      return optRow;
    });
    this.MainAssetOption = op;
  };
}
