import { makeAutoObservable, runInAction } from 'mobx';
import { SelectControl } from '../../@types/common';
import agentCategorys from '../../api/agent';
import { ICategorys, ICategorysParams } from 'src/@types/foamCompanyTypes/looks/Categorys';
export default class CategorysStore {
  openDialog = false;

  CategorysRegistry = new Map<number, ICategorys>();

  openDetailDialog = false;

  editMode = false; //When click on edit button

  selectedCategorys: ICategorys | undefined;

  totalRecord: number = 0;

  CategorysTypeOption: SelectControl[] = []; // for Categorys Type Dropdown

  constructor() {
    makeAutoObservable(this);
  }

  get CategorysList() {
    return Array.from(this.CategorysRegistry.values());
  }

  setCategorysList = (Cupboard: ICategorys) => {
    this.CategorysRegistry.set(Cupboard.id!, Cupboard);
  };

  //Pagination
  loadCategorys = async (params: ICategorysParams) => {
    try {
      const result = await agentCategorys.Categorys.getList(params);
      runInAction(() => {
        this.totalRecord = result.data.totalRecord;
        result.data.data.forEach((lst: any) => {
          this.setCategorysList(lst);
        });
      });
    } catch (error) {
      console.log(error);
    }
  };

  // Search
  Categorysearch = async (params: ICategorysParams) => {
    this.CategorysRegistry.clear();
    this.loadCategorys(params);
  };

  getCategorysFromRegistry = (id: number) => {
    let dep = this.CategorysRegistry.get(id);

    if (dep) {
      this.editMode = true;
      this.selectedCategorys = dep;
    }
  };

  clearSelectedCategorys = () => {
    this.editMode = false;
    this.selectedCategorys = undefined;
  };

  deleteCategorys = async (id: number, remark?: string) => {
    try {
      await agentCategorys.Categorys.delete(id, remark!);
      runInAction(() => {
        this.CategorysRegistry.delete(id);
        this.totalRecord--;
        this.setOpenCloseDialog();
      });
    } catch (error) {
      console.log(error);
    }
  };

  setOpenCloseDialog = () => (this.openDialog = !this.openDialog);

  setDetailCloseDialog = () => (this.openDetailDialog = !this.openDetailDialog);

  createCategorys = async (Categorys: ICategorys) => {
    await agentCategorys.Categorys.create(Categorys);
    runInAction(() => {
      this.loadCategorys({ pageIndex: 0, pageSize: 5 });
    });
  };

  updateCategorys = async (Categorys: ICategorys) => {
    await agentCategorys.Categorys.update(Categorys);
    runInAction(() => {
      this.loadCategorys({ pageIndex: 0, pageSize: 5 });
      this.CategorysRegistry.delete(Categorys.id!);
      this.CategorysRegistry.set(Categorys.id!, Categorys);
    });
  };

  // loadCategorysTypeDropdown = async () => {
  //   try {
  //     const result = await agentCategorys.CategorysTypes.CategorysTypeDDL();
  //     this.setCategorysTypeOptions(result.data.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // setCategorysTypeOptions = (data: CategorysTypeDDLDropdown[]) => {
  //   const op = data.map((op) => {
  //     const optRow = {
  //       text: op.name,
  //       value: op.id,
  //     };
  //     return optRow;
  //   });
  //   this.CategorysTypeOption = op;
  // };
}
