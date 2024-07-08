import { makeAutoObservable, runInAction } from 'mobx';
import { SelectControl } from '../../@types/common';
import agentCurrencyType from '../../api/agent';
import {
  ICurrencyType,
  ICurrencyTypeParams,
} from '../../@types/foamCompanyTypes/looks/CurrencyType';

export default class CurrencyTypeStore {
  openDialog = false;

  CurrencyTypeRegistry = new Map<number, ICurrencyType>();

  openDetailDialog = false;

  editMode = false; //When click on edit button

  selectedCurrencyType: ICurrencyType | undefined;

  totalRecord: number = 0;

  CurrencyTypeTypeOption: SelectControl[] = []; // for CurrencyType Type Dropdown

  constructor() {
    makeAutoObservable(this);
  }

  get CurrencyTypeList() {
    return Array.from(this.CurrencyTypeRegistry.values());
  }

  setCurrencyTypeList = (Cupboard: ICurrencyType) => {
    this.CurrencyTypeRegistry.set(Cupboard.id!, Cupboard);
  };

  //Pagination
  loadCurrencyType = async (params: ICurrencyTypeParams) => {
    try {
      const result = await agentCurrencyType.CurrencyType.getList(params);
      runInAction(() => {
        this.totalRecord = result.data.totalRecord;
        result.data.data.forEach((lst: any) => {
          this.setCurrencyTypeList(lst);
        });
      });
    } catch (error) {
      console.log(error);
    }
  };

  // Detail Infomation
  // DetailOfCupboard = async (Cupboard: Cupboard) => {
  //   try {
  //     await agentCurrencyType.Cupboards.detail(Cupboard);
  //     runInAction(() => {
  //       this.loadCurrencyType({ pageIndex: 0, pageSize: 5 });
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // Search
  CurrencyTypeearch = async (params: ICurrencyTypeParams) => {
    this.CurrencyTypeRegistry.clear();
    this.loadCurrencyType(params);
  };

  getCurrencyTypeFromRegistry = (id: number) => {
    let dep = this.CurrencyTypeRegistry.get(id);

    if (dep) {
      this.editMode = true;
      this.selectedCurrencyType = dep;
    }
  };

  clearSelectedCurrencyType = () => {
    this.editMode = false;
    this.selectedCurrencyType = undefined;
  };

  deleteCurrencyType = async (id: number, remark?: string) => {
    try {
      await agentCurrencyType.CurrencyType.delete(id, remark!);
      runInAction(() => {
        this.CurrencyTypeRegistry.delete(id);
        this.totalRecord--;
        this.setOpenCloseDialog();
      });
    } catch (error) {
      console.log(error);
    }
  };

  setOpenCloseDialog = () => (this.openDialog = !this.openDialog);

  setDetailCloseDialog = () => (this.openDetailDialog = !this.openDetailDialog);

  createCurrencyType = async (CurrencyType: ICurrencyType) => {
    await agentCurrencyType.CurrencyType.create(CurrencyType);
    runInAction(() => {
      this.loadCurrencyType({ pageIndex: 0, pageSize: 5 });
    });
  };

  updateCurrencyType = async (CurrencyType: ICurrencyType) => {
    await agentCurrencyType.CurrencyType.update(CurrencyType);
    runInAction(() => {
      this.loadCurrencyType({ pageIndex: 0, pageSize: 5 });
      this.CurrencyTypeRegistry.delete(CurrencyType.id!);
      this.CurrencyTypeRegistry.set(CurrencyType.id!, CurrencyType);
    });
  };

  // loadCurrencyTypeTypeDropdown = async () => {
  //   try {
  //     const result = await agentCurrencyType.CurrencyTypeTypes.CurrencyTypeTypeDDL();
  //     this.setCurrencyTypeTypeOptions(result.data.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // setCurrencyTypeTypeOptions = (data: CurrencyTypeTypeDDLDropdown[]) => {
  //   const op = data.map((op) => {
  //     const optRow = {
  //       text: op.name,
  //       value: op.id,
  //     };
  //     return optRow;
  //   });
  //   this.CurrencyTypeTypeOption = op;
  // };
}
