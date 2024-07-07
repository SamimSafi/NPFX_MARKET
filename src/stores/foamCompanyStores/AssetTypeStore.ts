import { makeAutoObservable, runInAction } from 'mobx';
import { SelectControl } from '../../@types/common';
import agentAssetType from '../../api/agent';
import { IAssetType, IAssetTypeParams } from 'src/@types/foamCompanyTypes/looks/AssetType';
export default class AssetTypeStore {
  openDialog = false;

  AssetTypeRegistry = new Map<number, IAssetType>();

  openDetailDialog = false;

  editMode = false; //When click on edit button

  selectedAssetType: IAssetType | undefined;

  totalRecord: number = 0;

  AssetTypeTypeOption: SelectControl[] = []; // for AssetType Type Dropdown

  constructor() {
    makeAutoObservable(this);
  }

  get AssetTypeList() {
    return Array.from(this.AssetTypeRegistry.values());
  }

  setAssetTypeList = (Cupboard: IAssetType) => {
    this.AssetTypeRegistry.set(Cupboard.id!, Cupboard);
  };

  //Pagination
  loadAssetType = async (params: IAssetTypeParams) => {
    try {
      const result = await agentAssetType.AssetType.getList(params);
      runInAction(() => {
        this.totalRecord = result.data.totalRecord;
        result.data.data.forEach((lst: any) => {
          this.setAssetTypeList(lst);
        });
      });
    } catch (error) {
      console.log(error);
    }
  };

  // Search
  AssetTypeearch = async (params: IAssetTypeParams) => {
    this.AssetTypeRegistry.clear();
    this.loadAssetType(params);
  };

  getAssetTypeFromRegistry = (id: number) => {
    let dep = this.AssetTypeRegistry.get(id);

    if (dep) {
      this.editMode = true;
      this.selectedAssetType = dep;
    }
  };

  clearSelectedAssetType = () => {
    this.editMode = false;
    this.selectedAssetType = undefined;
  };

  deleteAssetType = async (id: number, remark?: string) => {
    try {
      await agentAssetType.AssetType.delete(id, remark!);
      runInAction(() => {
        this.AssetTypeRegistry.delete(id);
        this.totalRecord--;
        this.setOpenCloseDialog();
      });
    } catch (error) {
      console.log(error);
    }
  };

  setOpenCloseDialog = () => (this.openDialog = !this.openDialog);

  setDetailCloseDialog = () => (this.openDetailDialog = !this.openDetailDialog);

  createAssetType = async (AssetType: IAssetType) => {
    await agentAssetType.AssetType.create(AssetType);
    runInAction(() => {
      this.loadAssetType({ pageIndex: 0, pageSize: 5 });
    });
  };

  updateAssetType = async (AssetType: IAssetType) => {
    await agentAssetType.AssetType.update(AssetType);
    runInAction(() => {
      this.loadAssetType({ pageIndex: 0, pageSize: 5 });
      this.AssetTypeRegistry.delete(AssetType.id!);
      this.AssetTypeRegistry.set(AssetType.id!, AssetType);
    });
  };

  // loadAssetTypeTypeDropdown = async () => {
  //   try {
  //     const result = await agentAssetType.AssetTypeTypes.AssetTypeTypeDDL();
  //     this.setAssetTypeTypeOptions(result.data.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // setAssetTypeTypeOptions = (data: AssetTypeTypeDDLDropdown[]) => {
  //   const op = data.map((op) => {
  //     const optRow = {
  //       text: op.name,
  //       value: op.id,
  //     };
  //     return optRow;
  //   });
  //   this.AssetTypeTypeOption = op;
  // };
}
