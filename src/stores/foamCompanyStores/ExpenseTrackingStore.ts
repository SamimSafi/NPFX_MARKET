import { makeAutoObservable, runInAction } from 'mobx';
import { SelectControl } from '../../@types/common';
import agentExpenseTracking from '../../api/agent';
import {
  IExpenseTracking,
  IExpenseTrackingParams,
} from 'src/@types/foamCompanyTypes/systemTypes/ExpenseTracking';
export default class ExpenseTrackingStore {
  openDialog = false;

  ExpenseTrackingRegistry = new Map<number, IExpenseTracking>();

  openDetailDialog = false;

  editMode = false; //When click on edit button

  selectedExpenseTracking: IExpenseTracking | undefined;

  totalRecord: number = 0;

  ExpenseTrackingTypeOption: SelectControl[] = []; // for ExpenseTracking Type Dropdown

  constructor() {
    makeAutoObservable(this);
  }

  get ExpenseTrackingList() {
    return Array.from(this.ExpenseTrackingRegistry.values());
  }

  setExpenseTrackingList = (Cupboard: IExpenseTracking) => {
    this.ExpenseTrackingRegistry.set(Cupboard.id!, Cupboard);
  };

  //Pagination
  loadExpenseTracking = async (params: IExpenseTrackingParams) => {
    try {
      const result = await agentExpenseTracking.ExpenseTracking.getList(params);
      runInAction(() => {
        this.totalRecord = result.data.totalRecord;
        result.data.data.forEach((lst: any) => {
          this.setExpenseTrackingList(lst);
        });
      });
    } catch (error) {
      console.log(error);
    }
  };

  // Search
  ExpenseTrackingearch = async (params: IExpenseTrackingParams) => {
    this.ExpenseTrackingRegistry.clear();
    this.loadExpenseTracking(params);
  };

  getExpenseTrackingFromRegistry = (id: number) => {
    let dep = this.ExpenseTrackingRegistry.get(id);

    if (dep) {
      this.editMode = true;
      this.selectedExpenseTracking = dep;
    }
  };

  clearSelectedExpenseTracking = () => {
    this.editMode = false;
    this.selectedExpenseTracking = undefined;
  };

  deleteExpenseTracking = async (id: number, remark?: string) => {
    try {
      await agentExpenseTracking.ExpenseTracking.delete(id, remark!);
      runInAction(() => {
        this.ExpenseTrackingRegistry.delete(id);
        this.totalRecord--;
        this.setOpenCloseDialog();
      });
    } catch (error) {
      console.log(error);
    }
  };

  setOpenCloseDialog = () => (this.openDialog = !this.openDialog);

  setDetailCloseDialog = () => (this.openDetailDialog = !this.openDetailDialog);

  createExpenseTracking = async (ExpenseTracking: IExpenseTracking) => {
    await agentExpenseTracking.ExpenseTracking.create(ExpenseTracking);
    runInAction(() => {
      this.loadExpenseTracking({ pageIndex: 0, pageSize: 5 });
    });
  };

  updateExpenseTracking = async (ExpenseTracking: IExpenseTracking) => {
    await agentExpenseTracking.ExpenseTracking.update(ExpenseTracking);
    runInAction(() => {
      this.loadExpenseTracking({ pageIndex: 0, pageSize: 5 });
      this.ExpenseTrackingRegistry.delete(ExpenseTracking.id!);
      this.ExpenseTrackingRegistry.set(ExpenseTracking.id!, ExpenseTracking);
    });
  };

  // loadExpenseTrackingTypeDropdown = async () => {
  //   try {
  //     const result = await agentExpenseTracking.ExpenseTrackingTypes.ExpenseTrackingTypeDDL();
  //     this.setExpenseTrackingTypeOptions(result.data.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // setExpenseTrackingTypeOptions = (data: ExpenseTrackingTypeDDLDropdown[]) => {
  //   const op = data.map((op) => {
  //     const optRow = {
  //       text: op.name,
  //       value: op.id,
  //     };
  //     return optRow;
  //   });
  //   this.ExpenseTrackingTypeOption = op;
  // };
}
