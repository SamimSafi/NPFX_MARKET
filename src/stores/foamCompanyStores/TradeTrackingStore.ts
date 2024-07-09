import { makeAutoObservable, runInAction } from 'mobx';
import { SelectControl } from '../../@types/common';
import agentTradeTracking from '../../api/agent';
import {
  ITradeTracking,
  ITradeTrackingParams,
} from 'src/@types/foamCompanyTypes/systemTypes/TradeTracking';
export default class TradeTrackingStore {
  openDialog = false;

  TradeTrackingRegistry = new Map<number, ITradeTracking>();

  openDetailDialog = false;

  editMode = false; //When click on edit button

  selectedTradeTracking: ITradeTracking | undefined;

  totalRecord: number = 0;

  TradeTrackingTypeOption: SelectControl[] = []; // for TradeTracking Type Dropdown

  constructor() {
    makeAutoObservable(this);
  }

  get TradeTrackingList() {
    return Array.from(this.TradeTrackingRegistry.values());
  }

  setTradeTrackingList = (Cupboard: ITradeTracking) => {
    this.TradeTrackingRegistry.set(Cupboard.id!, Cupboard);
  };

  //Pagination
  loadTradeTracking = async (params: ITradeTrackingParams) => {
    try {
      const result = await agentTradeTracking.TradeTracking.getList(params);
      runInAction(() => {
        this.totalRecord = result.data.totalRecord;
        result.data.data.forEach((lst: any) => {
          this.setTradeTrackingList(lst);
        });
      });
    } catch (error) {
      console.log(error);
    }
  };

  // Search
  TradeTrackingearch = async (params: ITradeTrackingParams) => {
    this.TradeTrackingRegistry.clear();
    this.loadTradeTracking(params);
  };

  getTradeTrackingFromRegistry = (id: number) => {
    let dep = this.TradeTrackingRegistry.get(id);

    if (dep) {
      this.editMode = true;
      this.selectedTradeTracking = dep;
    }
  };

  clearSelectedTradeTracking = () => {
    this.editMode = false;
    this.selectedTradeTracking = undefined;
  };

  deleteTradeTracking = async (id: number, remark?: string) => {
    try {
      await agentTradeTracking.TradeTracking.delete(id, remark!);
      runInAction(() => {
        this.TradeTrackingRegistry.delete(id);
        this.totalRecord--;
        this.setOpenCloseDialog();
      });
    } catch (error) {
      console.log(error);
    }
  };

  setOpenCloseDialog = () => (this.openDialog = !this.openDialog);

  setDetailCloseDialog = () => (this.openDetailDialog = !this.openDetailDialog);

  createTradeTracking = async (TradeTracking: ITradeTracking) => {
    await agentTradeTracking.TradeTracking.create(TradeTracking);
    runInAction(() => {
      this.loadTradeTracking({ pageIndex: 0, pageSize: 5 });
    });
  };

  updateTradeTracking = async (TradeTracking: ITradeTracking) => {
    await agentTradeTracking.TradeTracking.update(TradeTracking);
    runInAction(() => {
      this.loadTradeTracking({ pageIndex: 0, pageSize: 5 });
      this.TradeTrackingRegistry.delete(TradeTracking.id!);
      this.TradeTrackingRegistry.set(TradeTracking.id!, TradeTracking);
    });
  };

  // loadTradeTrackingTypeDropdown = async () => {
  //   try {
  //     const result = await agentTradeTracking.TradeTrackingTypes.TradeTrackingTypeDDL();
  //     this.setTradeTrackingTypeOptions(result.data.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // setTradeTrackingTypeOptions = (data: TradeTrackingTypeDDLDropdown[]) => {
  //   const op = data.map((op) => {
  //     const optRow = {
  //       text: op.name,
  //       value: op.id,
  //     };
  //     return optRow;
  //   });
  //   this.TradeTrackingTypeOption = op;
  // };
}
