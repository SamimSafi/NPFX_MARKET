import { makeAutoObservable, runInAction } from 'mobx';

import agentApplication from '../api/agent';
import { Application, ApplicationParams } from 'src/@types/application';
export default class ApplicationStore {
  openDialog = false;

  ApplicationRegistry = new Map<number, Application>();

  openDetailDialog = false;

  editMode = false; //When click on edit button

  selectedApplication: Application | undefined = undefined;

  totalRecord: number = 0;

  constructor() {
    makeAutoObservable(this);
  }

  get ApplicationList() {
    return Array.from(this.ApplicationRegistry.values());
  }

  setApplicationList = (proApplication: Application) => {
    this.ApplicationRegistry.set(proApplication.id!, proApplication);
  };

  //Pagination
  loadApplication = async (params: ApplicationParams) => {
    try {
      const result = await agentApplication.Applications.getList(params);
      runInAction(() => {
        this.totalRecord = result.data.totalRecord;
        result.data.data.forEach((lst: any) => {
          this.setApplicationList(lst);
        });
      });
    } catch (error) {
      console.log(error);
    }
  };

  // Search
  ApplicationSearch = async (params: ApplicationParams) => {
    this.ApplicationRegistry.clear();
    this.loadApplication(params);
  };

  getApplicationRegistry = (id: number) => {
    let proApplication = this.ApplicationRegistry.get(id);
    if (proApplication) {
      this.editMode = true;
      this.selectedApplication = proApplication;
    }
  };

  clearSelectedApplication = () => {
    this.editMode = false;
    this.selectedApplication = undefined;
  };

  deleteApplication = async (id: number, remark?: string) => {
    try {
      await agentApplication.Applications.delete(id, remark!);
      runInAction(() => {
        this.ApplicationRegistry.delete(id);
        this.totalRecord--;
        this.setOpenCloseDialog();
      });
    } catch (error) {
      console.log(error);
    }
  };

  setOpenCloseDialog = () => (this.openDialog = !this.openDialog);

  setDetailCloseDialog = () => (this.openDetailDialog = !this.openDetailDialog);

  createApplication = async (proApplication: Application) => {
    try {
      await agentApplication.Applications.create(proApplication);
      runInAction(() => {
        this.loadApplication({ pageIndex: 0, pageSize: 5 });
      });
    } catch (error) {
      console.log(error);
    }
  };

  updateApplication = async (proApplication: Application) => {
    try {
      await agentApplication.Applications.update(proApplication);

      runInAction(() => {
        this.loadApplication({ pageIndex: 0, pageSize: 5 });
        this.ApplicationRegistry.delete(proApplication.id!);
        this.ApplicationRegistry.set(proApplication.id!, proApplication);
      });
    } catch (error) {
      console.log(error);
    }
  };
}
