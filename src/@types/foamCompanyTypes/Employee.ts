export interface IEmployee {
  id?: number;
  name?: string;
  surName?: string;
  englishFirstName?: string;
  pashtoFirstName?: string;
  englishSurName?: string;
  pashtoSurName?: string;
  englishFatherName?: string;
  pashtoFatherName?: string;
  englishGrandFatherName?: string;
  pashtoGrandFatherName?: string;
  gender?: string;
  tazkiraTypeId?: number;
  tazkiraNo?: string;
  joldNo?: string;
  pageNo?: string;
  regNo?: string;
  dateOfBirth?: Date;
  temporaryAddress?: string;
  permenantAddress?: string;
  branchId?: number;
  bloodGroup?: string;
  joinDate?: Date;
  leaveDate?: string;
  email?: string;
  leaveRemark?: string;
  personalEmail?: string;
  phoneNumber?: string;
  emergencyPhoneNumber?: string;
  isActive?: boolean;
  profilePhoto: File | any;
  photoPath?: string;
  branchName?: string;
  afterSubmit?: string;
}

export interface IEmployeeForEdit {
  id?: number;
  name?: string;
  surName?: string;
  englishFirstName?: string;
  pashtoFirstName?: string;
  englishSurName?: string;
  pashtoSurName?: string;
  englishFatherName?: string;
  pashtoFatherName?: string;
  englishGrandFatherName?: string;
  pashtoGrandFatherName?: string;
  gender?: string;
  tazkiraTypeId?: number;
  tazkiraNo?: string;
  joldNo?: string;
  pageNo?: string;
  regNo?: string;
  dateOfBirth?: Date;
  temporaryAddress?: string;
  permenantAddress?: string;
  branchId?: number;
  bloodGroup?: string;
  joinDate?: Date;
  leaveDate?: string;
  leaveRemark?: string;
  personalEmail?: string;
  phoneNumber?: string;
  emergencyPhoneNumber?: string;
  isActive?: boolean;
  profilePhoto: File | any;
  photoPath?: string;
  afterSubmit?: string;
}

export interface IEmployeeParams {
  pageIndex: number;
  pageSize: number;
  searchBy?: string;
}

export interface IEmployeeDetails {
  id: number;
  englishFirstName: string;
  pashtoFirstName: string;
  englishSurName: string;
  pashtoSurName: string;
  englishFatherName: string;
  pashtoFatherName: string;
  englishGrandFatherName: string;
  pashtoGrandFatherName: string;
  tazkiraNo: string;
  dateOfBirth: string;
  temporaryAddress: string;
  permenantAddress: string;
  attendaceId: number;
  provence: {
    id: number;
    name: string;
    code: string;
  };
  district: {
    id: number;
    name: string;
    code: string;
  };
  department: {
    id: number;
    name: string;
    code: string;
  };
  employeeHealthState: {
    id: number;
    name: string;
    code: string;
  };
  gender: true;
  bloodGroup: string;
  joinDate: string;
  leaveDate: string;
  leaveRemark: string;
  personalEmail: string;
  officialEmail: string;
  attendanceId: number;
  phoneNumber: string;
  emergencyPhoneNumber: string;
  photoPath: string;
  rfidNumber: string;
  isCurrent: boolean;
}

// ================== Employee Report ==========================
export interface EmployeeAccountReport {
  departmentId?: number;
  provinceId?: number;
  healthStatusId?: number;
  hasAccount?: boolean;
  needReport?: boolean;
  generateReportType?: string;
}

export interface EmployeeAccountReportResult {
  id: number;
  firstName: string;
  surName: string;
  fullName: string;
  fatherName: string;
  grandFatherName: string;
  genderName: string;
  tazkiraNo: string;
  dateOfBirth: string;
  temporaryAddress: string;
  permenantAddress: string;
  departmentName: string;
  provinceName: string;
  employeeHealthState: string;
  attendanceId: number;
  bloodGroup: string;
  personalEmail: string;
  officialEmail: string;
  phoneNumber: string;
  photoPath: string;
  hasAccount: boolean;
  rfidNumber: number;
  isCurrent: boolean;
}

export interface Iuser {
  id?: string | undefined;
  userName: string;
  email?: string;
  password?: string;
  employeeId?: number;
}
