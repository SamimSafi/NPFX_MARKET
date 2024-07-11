import { makeAutoObservable, runInAction } from 'mobx';
import { SelectControl } from '../../@types/common';
import agentLoanTracking from '../../api/agent';
import {
  ILoanTracking,
  ILoanTrackingParams,
} from 'src/@types/foamCompanyTypes/systemTypes/LoanTracking';
export default class LoanTrackingStore {
  openDialog = false;

  LoanTrackingRegistry = new Map<number, ILoanTracking>();

  openDetailDialog = false;

  editMode = false; //When click on edit button

  selectedLoanTracking: ILoanTracking | undefined;

  totalRecord: number = 0;

  LoanTrackingTypeOption: SelectControl[] = []; // for LoanTracking Type Dropdown

  constructor() {
    makeAutoObservable(this);
  }

  get LoanTrackingList() {
    return Array.from(this.LoanTrackingRegistry.values());
  }

  setLoanTrackingList = (Cupboard: ILoanTracking) => {
    this.LoanTrackingRegistry.set(Cupboard.id!, Cupboard);
  };

  //Pagination
  loadLoanTracking = async (params: ILoanTrackingParams) => {
    try {
      const result = await agentLoanTracking.LoanTracking.getList(params);
      runInAction(() => {
        this.totalRecord = result.data.totalRecord;
        result.data.data.forEach((lst: any) => {
          this.setLoanTrackingList(lst);
        });
      });
    } catch (error) {
      console.log(error);
    }
  };

  // Search
  LoanTrackingearch = async (params: ILoanTrackingParams) => {
    this.LoanTrackingRegistry.clear();
    this.loadLoanTracking(params);
  };

  getLoanTrackingFromRegistry = (id: number) => {
    let dep = this.LoanTrackingRegistry.get(id);

    if (dep) {
      this.editMode = true;
      this.selectedLoanTracking = dep;
    }
  };

  clearSelectedLoanTracking = () => {
    this.editMode = false;
    this.selectedLoanTracking = undefined;
  };

  deleteLoanTracking = async (id: number, remark?: string) => {
    try {
      await agentLoanTracking.LoanTracking.delete(id, remark!);
      runInAction(() => {
        this.LoanTrackingRegistry.delete(id);
        this.totalRecord--;
        this.setOpenCloseDialog();
      });
    } catch (error) {
      console.log(error);
    }
  };

  setOpenCloseDialog = () => (this.openDialog = !this.openDialog);

  setDetailCloseDialog = () => (this.openDetailDialog = !this.openDetailDialog);

  createLoanTracking = async (LoanTracking: ILoanTracking) => {
    await agentLoanTracking.LoanTracking.create(LoanTracking);
    runInAction(() => {
      this.loadLoanTracking({ pageIndex: 0, pageSize: 5 });
    });
  };

  updateLoanTracking = async (LoanTracking: ILoanTracking) => {
    await agentLoanTracking.LoanTracking.update(LoanTracking);
    runInAction(() => {
      this.loadLoanTracking({ pageIndex: 0, pageSize: 5 });
      this.LoanTrackingRegistry.delete(LoanTracking.id!);
      this.LoanTrackingRegistry.set(LoanTracking.id!, LoanTracking);
    });
  };

  // loadLoanTrackingTypeDropdown = async () => {
  //   try {
  //     const result = await agentLoanTracking.LoanTrackingTypes.LoanTrackingTypeDDL();
  //     this.setLoanTrackingTypeOptions(result.data.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // setLoanTrackingTypeOptions = (data: LoanTrackingTypeDDLDropdown[]) => {
  //   const op = data.map((op) => {
  //     const optRow = {
  //       text: op.name,
  //       value: op.id,
  //     };
  //     return optRow;
  //   });
  //   this.LoanTrackingTypeOption = op;
  // };
}
