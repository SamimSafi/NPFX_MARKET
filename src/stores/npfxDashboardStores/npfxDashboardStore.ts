import { makeAutoObservable, runInAction } from 'mobx';
import {
  DashboardOfBranchsMainAsset,
  ExpenseChart,
  IPieChartByBranch,
  RealTimeDasboard,
  TradeTrackingChart,
} from 'src/@types/foamCompanyTypes/systemTypes/npfxDashboard';
import agent from 'src/api/agent';

export default class npfxDashboardStore {
  dashboardUsersByBranch: IPieChartByBranch[] = [];

  realTimeDashboardData: RealTimeDasboard | undefined;

  tradeTrackingChartData: TradeTrackingChart | undefined;

  expenseChartData: ExpenseChart | undefined;

  dashboardOfBranchsMainAsset: DashboardOfBranchsMainAsset[] | undefined;

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

  //#region RealTimeDashboard
  LoadRealTimeDashboard = async () => {
    try {
      const dashboardData = await agent.npfxDashboards.RealTimeDashboard();
      runInAction(() => {
        if (dashboardData) {
          this.realTimeDashboardData = dashboardData.data;
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  //#endregion

  //#region RealTimeDashboard
  LoadTradeTrackingChart = async () => {
    try {
      const dashboardData = await agent.npfxDashboards.TradeTrackingChart();
      runInAction(() => {
        if (dashboardData) {
          this.tradeTrackingChartData = dashboardData.data;
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  //#endregion

  //#region RealTimeDashboard
  LoadExpenseChart = async () => {
    try {
      const dashboardData = await agent.npfxDashboards.ExpenseChart();
      runInAction(() => {
        if (dashboardData) {
          this.expenseChartData = dashboardData.data;
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  //#endregion

   //#region DashboardOfBranchsMainAsset
   LoadDashboardOfBranchsMainAsset = async () => {
    try {
      const dashboardData = await agent.npfxDashboards.DashboardOfBranchsMainAsset();
      runInAction(() => {
        if (dashboardData) {
          this.dashboardOfBranchsMainAsset = dashboardData.data;
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  //#endregion
}


