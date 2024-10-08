import { makeAutoObservable, runInAction } from 'mobx';
import { SelectControl } from '../../@types/common';
import agentMainAsset from '../../api/agent';
import {
  IDepositTo,
  IMainAsset,
  IMainAssetParams,
} from 'src/@types/foamCompanyTypes/systemTypes/MainAsset';
export default class MainAssetStore {
  openDialog = false;

  openDialogDeposit = false;

  openDialogCreateLoan = false;

  openDialogCreateTrade = false;

  openDialogPayBackLoan = false;

  openDialogWithdrawCash = false;

  openDialogDepositCash = false;

  MainAssetRegistry = new Map<string, IMainAsset>();

  openDetailDialog = false;

  editMode = false; //When click on edit button

  selectedMainAsset: IMainAsset | undefined;

  selectedDepositTo: IDepositTo | undefined;

  totalRecord: number = 0;

  MainAssetTypeOption: SelectControl[] = []; // for MainAsset Type Dropdown

  constructor() {
    makeAutoObservable(this);
  }

  get MainAssetList() {
    return Array.from(this.MainAssetRegistry.values());
  }

  setMainAssetList = (Cupboard: IMainAsset) => {
    this.MainAssetRegistry.set(Cupboard.id!, Cupboard);
  };

  //Pagination
  loadMainAsset = async (params: IMainAssetParams) => {
    try {
      const result = await agentMainAsset.MainAsset.getList(params);
      runInAction(() => {
        result.data.data.forEach((lst: any) => {
          this.setMainAssetList(lst);
        });
      });
    } catch (error) {
      console.log(error);
    }
  };

  // Search
  MainAssetearch = async (params: IMainAssetParams) => {
    this.MainAssetRegistry.clear();
    this.loadMainAsset(params);
  };

  getMainAssetFromRegistry = (id: string) => {
    let dep = this.MainAssetRegistry.get(id);

    if (dep) {
      this.editMode = true;
      this.selectedMainAsset = dep;
    }
  };

  clearSelectedMainAsset = () => {
    this.editMode = false;
    this.selectedMainAsset = undefined;
  };

  deleteMainAsset = async (id: string, remark?: string) => {
    try {
      await agentMainAsset.MainAsset.delete(id, remark!);
      runInAction(() => {
        this.MainAssetRegistry.delete(id);
        this.totalRecord--;
        this.setOpenCloseDialog();
      });
    } catch (error) {
      console.log(error);
    }
  };

  setOpenCloseDialog = () => (this.openDialog = !this.openDialog);

  setOpenCloseDialogDeposit = () => (this.openDialogDeposit = !this.openDialogDeposit);

  setDetailCloseDialog = () => (this.openDetailDialog = !this.openDetailDialog);

  setOpenCloseDialogCreateLoan = () => (this.openDialogCreateLoan = !this.openDialogCreateLoan);

  setOpenCloseDialogCreateTrade = () => (this.openDialogCreateTrade = !this.openDialogCreateTrade);

  setOpenCloseDialogPayBackLoan = () => (this.openDialogPayBackLoan = !this.openDialogPayBackLoan);

  setOpenCloseDialogWithdrawCash = () =>
    (this.openDialogWithdrawCash = !this.openDialogWithdrawCash);

  setOpenCloseDialogDepositCash = () => (this.openDialogDepositCash = !this.openDialogDepositCash);

  createMainAsset = async (MainAsset: IMainAsset) => {
    await agentMainAsset.MainAsset.create(MainAsset);
    runInAction(() => {
      this.loadMainAsset({ pageIndex: 0, pageSize: 5 });
    });
  };

  deposit = async (DepositAsset: IDepositTo) => {
    await agentMainAsset.MainAsset.deposit(DepositAsset);
    runInAction(() => {
      this.loadMainAsset({ pageIndex: 0, pageSize: 5 });
    });
  };

  updateMainAsset = async (MainAsset: IMainAsset) => {
    await agentMainAsset.MainAsset.update(MainAsset);
    runInAction(() => {
      this.loadMainAsset({ pageIndex: 0, pageSize: 5 });
      this.MainAssetRegistry.delete(MainAsset.id!);
      this.MainAssetRegistry.set(MainAsset.id!, MainAsset);
    });
  };

  // GetMainAssetTracking = async (MainAssetTrackingParam: IMainAssetTrackingParam) => {
  //   try {
  //     const result = agentMainAsset.MainAsset.Gettracking(MainAssetTrackingParam);
  //     console.log(result);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // loadMainAssetTypeDropdown = async () => {
  //   try {
  //     const result = await agentMainAsset.MainAssetTypes.MainAssetTypeDDL();
  //     this.setMainAssetTypeOptions(result.data.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // setMainAssetTypeOptions = (data: MainAssetTypeDDLDropdown[]) => {
  //   const op = data.map((op) => {
  //     const optRow = {
  //       text: op.name,
  //       value: op.id,
  //     };
  //     return optRow;
  //   });
  //   this.MainAssetTypeOption = op;
  // };
}
