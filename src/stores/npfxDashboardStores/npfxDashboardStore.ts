import { makeAutoObservable, runInAction } from 'mobx';
import { IPieChartByBranch } from 'src/@types/foamCompanyTypes/systemTypes/npfxDashboard';
import agent from 'src/api/agent';

export default class npfxDashboardStore {
  dashboardUsersByBranch: IPieChartByBranch[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  // Load User's Dashboard By Department
  getUserSummaryByBranch = async () => {
    try {
      const usersBybranch = await agent.npfxDashboards.UserDashboardByBranch();
      runInAction(() => {
        this.dashboardUsersByBranch = usersBybranch.data;
      });
    } catch (error) {
      console.log(error);
    }
  };
}
