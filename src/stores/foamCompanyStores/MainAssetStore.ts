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

  MainAssetRegistry = new Map<number, IMainAsset>();

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
        this.totalRecord = result.data.totalRecord;
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

  getMainAssetFromRegistry = (id: number) => {
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

  deleteMainAsset = async (id: number, remark?: string) => {
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
