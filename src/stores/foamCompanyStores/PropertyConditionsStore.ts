import { makeAutoObservable, runInAction } from 'mobx';
import { SelectControl } from '../../@types/common';
import agentPropertyConditions from '../../api/agent';
import {
  IPropertyConditions,
  IPropertyConditionsParams,
} from 'src/@types/foamCompanyTypes/looks/PropertyConditions';
export default class PropertyConditionsStore {
  openDialog = false;

  PropertyConditionsRegistry = new Map<number, IPropertyConditions>();

  openDetailDialog = false;

  editMode = false; //When click on edit button

  selectedPropertyConditions: IPropertyConditions | undefined;

  totalRecord: number = 0;

  PropertyConditionsTypeOption: SelectControl[] = []; // for PropertyConditions Type Dropdown

  constructor() {
    makeAutoObservable(this);
  }

  get PropertyConditionsList() {
    return Array.from(this.PropertyConditionsRegistry.values());
  }

  setPropertyConditionsList = (Cupboard: IPropertyConditions) => {
    this.PropertyConditionsRegistry.set(Cupboard.id!, Cupboard);
  };

  //Pagination
  loadPropertyConditions = async (params: IPropertyConditionsParams) => {
    try {
      const result = await agentPropertyConditions.PropertyConditions.getList(params);
      runInAction(() => {
        this.totalRecord = result.data.totalRecord;
        result.data.data.forEach((lst: any) => {
          this.setPropertyConditionsList(lst);
        });
      });
    } catch (error) {
      console.log(error);
    }
  };

  // Search
  PropertyConditionsearch = async (params: IPropertyConditionsParams) => {
    this.PropertyConditionsRegistry.clear();
    this.loadPropertyConditions(params);
  };

  getPropertyConditionsFromRegistry = (id: number) => {
    let dep = this.PropertyConditionsRegistry.get(id);

    if (dep) {
      this.editMode = true;
      this.selectedPropertyConditions = dep;
    }
  };

  clearSelectedPropertyConditions = () => {
    this.editMode = false;
    this.selectedPropertyConditions = undefined;
  };

  deletePropertyConditions = async (id: number, remark?: string) => {
    try {
      await agentPropertyConditions.PropertyConditions.delete(id, remark!);
      runInAction(() => {
        this.PropertyConditionsRegistry.delete(id);
        this.totalRecord--;
        this.setOpenCloseDialog();
      });
    } catch (error) {
      console.log(error);
    }
  };

  setOpenCloseDialog = () => (this.openDialog = !this.openDialog);

  setDetailCloseDialog = () => (this.openDetailDialog = !this.openDetailDialog);

  createPropertyConditions = async (PropertyConditions: IPropertyConditions) => {
    await agentPropertyConditions.PropertyConditions.create(PropertyConditions);
    runInAction(() => {
      this.loadPropertyConditions({ pageIndex: 0, pageSize: 5 });
    });
  };

  updatePropertyConditions = async (PropertyConditions: IPropertyConditions) => {
    await agentPropertyConditions.PropertyConditions.update(PropertyConditions);
    runInAction(() => {
      this.loadPropertyConditions({ pageIndex: 0, pageSize: 5 });
      this.PropertyConditionsRegistry.delete(PropertyConditions.id!);
      this.PropertyConditionsRegistry.set(PropertyConditions.id!, PropertyConditions);
    });
  };

  // loadPropertyConditionsTypeDropdown = async () => {
  //   try {
  //     const result = await agentPropertyConditions.PropertyConditionsTypes.PropertyConditionsTypeDDL();
  //     this.setPropertyConditionsTypeOptions(result.data.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // setPropertyConditionsTypeOptions = (data: PropertyConditionsTypeDDLDropdown[]) => {
  //   const op = data.map((op) => {
  //     const optRow = {
  //       text: op.name,
  //       value: op.id,
  //     };
  //     return optRow;
  //   });
  //   this.PropertyConditionsTypeOption = op;
  // };
}
