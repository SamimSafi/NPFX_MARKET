import { makeAutoObservable, runInAction } from 'mobx';
import { SelectControl } from '../../@types/common';
import agentPartners from '../../api/agent';
import { IPartners, IPartnersParams } from 'src/@types/foamCompanyTypes/systemTypes/Partners';
export default class PartnersStore {
  openDialog = false;

  PartnersRegistry = new Map<number, IPartners>();

  openDetailDialog = false;

  editMode = false; //When click on edit button

  selectedPartners: IPartners | undefined;

  totalRecord: number = 0;

  PartnersTypeOption: SelectControl[] = []; // for Partners Type Dropdown

  constructor() {
    makeAutoObservable(this);
  }

  get PartnersList() {
    return Array.from(this.PartnersRegistry.values());
  }

  setPartnersList = (Cupboard: IPartners) => {
    this.PartnersRegistry.set(Cupboard.id!, Cupboard);
  };

  //Pagination
  loadPartners = async (params: IPartnersParams) => {
    try {
      const result = await agentPartners.Partners.getList(params);
      runInAction(() => {
        this.totalRecord = result.data.totalRecord;
        result.data.data.forEach((lst: any) => {
          this.setPartnersList(lst);
        });
      });
    } catch (error) {
      console.log(error);
    }
  };

  // Search
  Partnersearch = async (params: IPartnersParams) => {
    this.PartnersRegistry.clear();
    this.loadPartners(params);
  };

  getPartnersFromRegistry = (id: number) => {
    let dep = this.PartnersRegistry.get(id);

    if (dep) {
      this.editMode = true;
      this.selectedPartners = dep;
    }
  };

  clearSelectedPartners = () => {
    this.editMode = false;
    this.selectedPartners = undefined;
  };

  deletePartners = async (id: number, remark?: string) => {
    try {
      await agentPartners.Partners.delete(id, remark!);
      runInAction(() => {
        this.PartnersRegistry.delete(id);
        this.totalRecord--;
        this.setOpenCloseDialog();
      });
    } catch (error) {
      console.log(error);
    }
  };

  setOpenCloseDialog = () => (this.openDialog = !this.openDialog);

  setDetailCloseDialog = () => (this.openDetailDialog = !this.openDetailDialog);

  createPartners = async (Partners: IPartners) => {
    await agentPartners.Partners.create(Partners);
    runInAction(() => {
      this.loadPartners({ pageIndex: 0, pageSize: 5 });
    });
  };

  updatePartners = async (Partners: IPartners) => {
    await agentPartners.Partners.update(Partners);
    runInAction(() => {
      this.loadPartners({ pageIndex: 0, pageSize: 5 });
      this.PartnersRegistry.delete(Partners.id!);
      this.PartnersRegistry.set(Partners.id!, Partners);
    });
  };

  // loadPartnersTypeDropdown = async () => {
  //   try {
  //     const result = await agentPartners.PartnersTypes.PartnersTypeDDL();
  //     this.setPartnersTypeOptions(result.data.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // setPartnersTypeOptions = (data: PartnersTypeDDLDropdown[]) => {
  //   const op = data.map((op) => {
  //     const optRow = {
  //       text: op.name,
  //       value: op.id,
  //     };
  //     return optRow;
  //   });
  //   this.PartnersTypeOption = op;
  // };
}
