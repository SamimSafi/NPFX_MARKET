import { makeAutoObservable, runInAction } from 'mobx';
import {
  TrainingVideo,
  TrainingVideoParams,
} from 'src/@types/foamCompanyTypes/systemTypes/trainingVideo';
import agent from 'src/api/agent';

export default class TrainingVideoStore {
  selectedTrainingVideo: TrainingVideo | undefined = undefined;

  totalRecord: number = 0;

  //NewsRegistry = new Map<number, News>();

  TrainingVideoRegistry: TrainingVideo[] = [];

  //activeNews: NewsAlert[] = [];

  editMode = false; //When click on edit button

  load = false;

  setLoad = () => (this.load = !this.load);

  //isNews = false;

  openDialog = false;

  openDialogTrainingVideo = false;

  constructor() {
    makeAutoObservable(this);
  }

  get TrainingVideoList() {
    return Array.from(this.TrainingVideoRegistry.values());
  }

  clearSelectedTrainingVideo = () => {
    this.editMode = false;
    this.selectedTrainingVideo = undefined;
  };

  setTrainingVideoList = (trainingVideos: TrainingVideo) => {
    this.TrainingVideoRegistry.push(trainingVideos);
  };

  // Load User's Dashboard By Department
  // getNews = async () => {
  //   try {
  //     const ActiveNews = await agent.newsAgent.ActiveNews();
  //     runInAction(() => {
  //       if (ActiveNews.data.length > 0) {
  //         this.activeNews = ActiveNews.data;
  //         this.isNews = true;
  //       } else {
  //         this.isNews = false;
  //       }
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  //gotoList = () => PATH_DASHBOARD.News.list;

  createTrainingVideo = async (title: TrainingVideo) => {
    //console.log(eduTitle);
    // try {
    await agent.trainingVideoAgent.create(
      title,
      title.poster,
      title.dariVideoPath,
      title.pashtoVideoPath
    );
    runInAction(() => {
      this.loadTrainingVideoList({ pageIndex: 0, pageSize: 5 });
      this.clearSelectedTrainingVideo();
    });
    // } catch (error) {
    //   console.log(error);
    // }
  };

  updateTrainingVideo = async (titleProps: TrainingVideo) => {
    console.log(titleProps);
    // try {

    await agent.trainingVideoAgent.update(
      titleProps,
      titleProps.poster,
      titleProps.dariVideoPath,
      titleProps.pashtoVideoPath
    );
    runInAction(() => {
      const index = this.TrainingVideoRegistry.findIndex((title) => title.id === titleProps.id);
      if (index !== -1) {
        this.TrainingVideoRegistry.splice(index, 1, titleProps);
        this.loadTrainingVideoList({ pageIndex: 0, pageSize: 5 });
      }
    });
    // } catch (error) {
    //   console.log(error)
    // }
  };

  // Load News List
  loadTrainingVideoList = async (params: TrainingVideoParams) => {
    try {
      const result = await agent.trainingVideoAgent.getList(params);
      runInAction(() => {
        // if(result.data) {
        this.totalRecord = result.data.totalRecord;
        if (params.pageIndex === 0) {
          this.TrainingVideoRegistry = result.data.data.slice();
        } else {
          result.data.data.forEach((lst: any) => {
            console.log(lst);
            this.setTrainingVideoList(lst);
          });
          // }
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  // delete TrainingVideo
  deleteTrainingVideo = async (id: number, remark: string) => {
    try {
      await agent.trainingVideoAgent.delete(id, remark);
      runInAction(() => {
        const index = this.TrainingVideoRegistry.findIndex((video) => video.id === id);
        if (index !== -1) {
          this.TrainingVideoRegistry.splice(index, 1);
          this.totalRecord--;
          this.setOpenCloseDialog();
        }
        // this.NewsRegistry.delete(id);
        // this.totalRecord--;
        // this.setOpenCloseDialog();
      });
    } catch (error) {
      console.log(error);
    }
  };

  setOpenCloseDialog = () => (this.openDialog = !this.openDialog);

  getTrainingVideoFromRegistry = async (id: number) => {
    let region = await this.TrainingVideoRegistry.find((video) => video.id === id);
    console.log(region);

    if (region) {
      this.editMode = true;
      this.selectedTrainingVideo = region;
    }
  };

  //setOpenCloseTrainingVideoDialog = () => (this.openDialogTrainingVideo = !this.openDialogTrainingVideo);

  // Search
  TrainingVideoSearch = async (params: TrainingVideoParams) => {
    //this.NewsRegistry.clear();
    this.loadTrainingVideoList(params);
  };
}
