import { makeAutoObservable, runInAction } from 'mobx';
import { SelectControl } from '../../@types/common';
import agentWithdrawalTracking from '../../api/agent';
import {
  IWithdrawalTracking,
  IWithdrawalTrackingParams,
} from 'src/@types/foamCompanyTypes/systemTypes/WithdrawalTracking';
export default class WithdrawalTrackingStore {
  openDialog = false;

  WithdrawalTrackingRegistry = new Map<number, IWithdrawalTracking>();

  openDetailDialog = false;

  editMode = false; //When click on edit button

  selectedWithdrawalTracking: IWithdrawalTracking | undefined;

  totalRecord: number = 0;

  WithdrawalTrackingTypeOption: SelectControl[] = []; // for WithdrawalTracking Type Dropdown

  constructor() {
    makeAutoObservable(this);
  }

  get WithdrawalTrackingList() {
    return Array.from(this.WithdrawalTrackingRegistry.values());
  }

  setWithdrawalTrackingList = (Cupboard: IWithdrawalTracking) => {
    this.WithdrawalTrackingRegistry.set(Cupboard.id!, Cupboard);
  };

  //Pagination
  loadWithdrawalTracking = async (params: IWithdrawalTrackingParams) => {
    try {
      const result = await agentWithdrawalTracking.WithdrawalTracking.getList(params);
      runInAction(() => {
        this.totalRecord = result.data.totalRecord;
        result.data.data.forEach((lst: any) => {
          this.setWithdrawalTrackingList(lst);
        });
      });
    } catch (error) {
      console.log(error);
    }
  };

  // Search
  WithdrawalTrackingearch = async (params: IWithdrawalTrackingParams) => {
    this.WithdrawalTrackingRegistry.clear();
    this.loadWithdrawalTracking(params);
  };

  getWithdrawalTrackingFromRegistry = (id: number) => {
    let dep = this.WithdrawalTrackingRegistry.get(id);

    if (dep) {
      this.editMode = true;
      this.selectedWithdrawalTracking = dep;
    }
  };

  clearSelectedWithdrawalTracking = () => {
    this.editMode = false;
    this.selectedWithdrawalTracking = undefined;
  };

  deleteWithdrawalTracking = async (id: number, remark?: string) => {
    try {
      await agentWithdrawalTracking.WithdrawalTracking.delete(id, remark!);
      runInAction(() => {
        this.WithdrawalTrackingRegistry.delete(id);
        this.totalRecord--;
        this.setOpenCloseDialog();
      });
    } catch (error) {
      console.log(error);
    }
  };

  setOpenCloseDialog = () => (this.openDialog = !this.openDialog);

  setDetailCloseDialog = () => (this.openDetailDialog = !this.openDetailDialog);

  createWithdrawalTracking = async (WithdrawalTracking: IWithdrawalTracking) => {
    await agentWithdrawalTracking.WithdrawalTracking.create(WithdrawalTracking);
    runInAction(() => {
      this.loadWithdrawalTracking({ pageIndex: 0, pageSize: 5 });
    });
  };

  DepositToAccount = async (WithdrawalTracking: IWithdrawalTracking) => {
    await agentWithdrawalTracking.WithdrawalTracking.DepositToAccount(WithdrawalTracking);
    runInAction(() => {
      this.loadWithdrawalTracking({ pageIndex: 0, pageSize: 5 });
    });
  };

  updateWithdrawalTracking = async (WithdrawalTracking: IWithdrawalTracking) => {
    await agentWithdrawalTracking.WithdrawalTracking.update(WithdrawalTracking);
    runInAction(() => {
      this.loadWithdrawalTracking({ pageIndex: 0, pageSize: 5 });
      this.WithdrawalTrackingRegistry.delete(WithdrawalTracking.id!);
      this.WithdrawalTrackingRegistry.set(WithdrawalTracking.id!, WithdrawalTracking);
    });
  };

  // loadWithdrawalTrackingTypeDropdown = async () => {
  //   try {
  //     const result = await agentWithdrawalTracking.WithdrawalTrackingTypes.WithdrawalTrackingTypeDDL();
  //     this.setWithdrawalTrackingTypeOptions(result.data.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // setWithdrawalTrackingTypeOptions = (data: WithdrawalTrackingTypeDDLDropdown[]) => {
  //   const op = data.map((op) => {
  //     const optRow = {
  //       text: op.name,
  //       value: op.id,
  //     };
  //     return optRow;
  //   });
  //   this.WithdrawalTrackingTypeOption = op;
  // };
}
