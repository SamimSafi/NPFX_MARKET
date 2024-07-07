import { makeAutoObservable, runInAction } from 'mobx';
import { SelectControl } from '../../@types/common';
import agentLoanType from '../../api/agent';
import { ILoanType, ILoanTypeParams } from 'src/@types/foamCompanyTypes/looks/LoanType';
export default class LoanTypeStore {
  openDialog = false;

  LoanTypeRegistry = new Map<number, ILoanType>();

  openDetailDialog = false;

  editMode = false; //When click on edit button

  selectedLoanType: ILoanType | undefined;

  totalRecord: number = 0;

  LoanTypeTypeOption: SelectControl[] = []; // for LoanType Type Dropdown

  constructor() {
    makeAutoObservable(this);
  }

  get LoanTypeList() {
    return Array.from(this.LoanTypeRegistry.values());
  }

  setLoanTypeList = (Cupboard: ILoanType) => {
    this.LoanTypeRegistry.set(Cupboard.id!, Cupboard);
  };

  //Pagination
  loadLoanType = async (params: ILoanTypeParams) => {
    try {
      const result = await agentLoanType.LoanType.getList(params);
      runInAction(() => {
        this.totalRecord = result.data.totalRecord;
        result.data.data.forEach((lst: any) => {
          this.setLoanTypeList(lst);
        });
      });
    } catch (error) {
      console.log(error);
    }
  };

  // Search
  LoanTypeearch = async (params: ILoanTypeParams) => {
    this.LoanTypeRegistry.clear();
    this.loadLoanType(params);
  };

  getLoanTypeFromRegistry = (id: number) => {
    let dep = this.LoanTypeRegistry.get(id);

    if (dep) {
      this.editMode = true;
      this.selectedLoanType = dep;
    }
  };

  clearSelectedLoanType = () => {
    this.editMode = false;
    this.selectedLoanType = undefined;
  };

  deleteLoanType = async (id: number, remark?: string) => {
    try {
      await agentLoanType.LoanType.delete(id, remark!);
      runInAction(() => {
        this.LoanTypeRegistry.delete(id);
        this.totalRecord--;
        this.setOpenCloseDialog();
      });
    } catch (error) {
      console.log(error);
    }
  };

  setOpenCloseDialog = () => (this.openDialog = !this.openDialog);

  setDetailCloseDialog = () => (this.openDetailDialog = !this.openDetailDialog);

  createLoanType = async (LoanType: ILoanType) => {
    await agentLoanType.LoanType.create(LoanType);
    runInAction(() => {
      this.loadLoanType({ pageIndex: 0, pageSize: 5 });
    });
  };

  updateLoanType = async (LoanType: ILoanType) => {
    await agentLoanType.LoanType.update(LoanType);
    runInAction(() => {
      this.loadLoanType({ pageIndex: 0, pageSize: 5 });
      this.LoanTypeRegistry.delete(LoanType.id!);
      this.LoanTypeRegistry.set(LoanType.id!, LoanType);
    });
  };

  // loadLoanTypeTypeDropdown = async () => {
  //   try {
  //     const result = await agentLoanType.LoanTypeTypes.LoanTypeTypeDDL();
  //     this.setLoanTypeTypeOptions(result.data.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // setLoanTypeTypeOptions = (data: LoanTypeTypeDDLDropdown[]) => {
  //   const op = data.map((op) => {
  //     const optRow = {
  //       text: op.name,
  //       value: op.id,
  //     };
  //     return optRow;
  //   });
  //   this.LoanTypeTypeOption = op;
  // };
}
