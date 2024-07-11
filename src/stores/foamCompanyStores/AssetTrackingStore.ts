import { makeAutoObservable, runInAction } from 'mobx';
import { SelectControl } from '../../@types/common';
import agentAssetTracking from '../../api/agent';
import {
  IAssetTracking,
  IAssetTrackingParams,
} from 'src/@types/foamCompanyTypes/systemTypes/AssetTracking';
export default class AssetTrackingStore {
  openDialog = false;

  AssetTrackingRegistry = new Map<number, IAssetTracking>();

  openDetailDialog = false;

  editMode = false; //When click on edit button

  selectedAssetTracking: IAssetTracking | undefined;

  totalRecord: number = 0;

  AssetTrackingTypeOption: SelectControl[] = []; // for AssetTracking Type Dropdown

  constructor() {
    makeAutoObservable(this);
  }

  get AssetTrackingList() {
    return Array.from(this.AssetTrackingRegistry.values());
  }

  setAssetTrackingList = (Cupboard: IAssetTracking) => {
    this.AssetTrackingRegistry.set(Cupboard.id!, Cupboard);
  };

  //Pagination
  loadAssetTracking = async (params: IAssetTrackingParams) => {
    try {
      const result = await agentAssetTracking.AssetTracking.getList(params);
      runInAction(() => {
        this.totalRecord = result.data.totalRecord;
        result.data.data.forEach((lst: any) => {
          this.setAssetTrackingList(lst);
        });
      });
    } catch (error) {
      console.log(error);
    }
  };

  // Search
  AssetTrackingearch = async (params: IAssetTrackingParams) => {
    this.AssetTrackingRegistry.clear();
    this.loadAssetTracking(params);
  };

  getAssetTrackingFromRegistry = (id: number) => {
    let dep = this.AssetTrackingRegistry.get(id);

    if (dep) {
      this.editMode = true;
      this.selectedAssetTracking = dep;
    }
  };

  clearSelectedAssetTracking = () => {
    this.editMode = false;
    this.selectedAssetTracking = undefined;
  };

  deleteAssetTracking = async (id: number, remark?: string) => {
    try {
      await agentAssetTracking.AssetTracking.delete(id, remark!);
      runInAction(() => {
        this.AssetTrackingRegistry.delete(id);
        this.totalRecord--;
        this.setOpenCloseDialog();
      });
    } catch (error) {
      console.log(error);
    }
  };

  setOpenCloseDialog = () => (this.openDialog = !this.openDialog);

  setDetailCloseDialog = () => (this.openDetailDialog = !this.openDetailDialog);

  createAssetTracking = async (AssetTracking: IAssetTracking) => {
    await agentAssetTracking.AssetTracking.create(AssetTracking);
    runInAction(() => {
      this.loadAssetTracking({ pageIndex: 0, pageSize: 5 });
    });
  };

  updateAssetTracking = async (AssetTracking: IAssetTracking) => {
    await agentAssetTracking.AssetTracking.update(AssetTracking);
    runInAction(() => {
      this.loadAssetTracking({ pageIndex: 0, pageSize: 5 });
      this.AssetTrackingRegistry.delete(AssetTracking.id!);
      this.AssetTrackingRegistry.set(AssetTracking.id!, AssetTracking);
    });
  };

  // loadAssetTrackingTypeDropdown = async () => {
  //   try {
  //     const result = await agentAssetTracking.AssetTrackingTypes.AssetTrackingTypeDDL();
  //     this.setAssetTrackingTypeOptions(result.data.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // setAssetTrackingTypeOptions = (data: AssetTrackingTypeDDLDropdown[]) => {
  //   const op = data.map((op) => {
  //     const optRow = {
  //       text: op.name,
  //       value: op.id,
  //     };
  //     return optRow;
  //   });
  //   this.AssetTrackingTypeOption = op;
  // };
}
