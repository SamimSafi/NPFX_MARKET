export interface TrainingVideo {
  id?: number;
  dariTitle: string;
  pashtoTitle: string;
  application: string;
  poster: any;
  dariVideoPath: any;
  pashtoVideoPath: any;
}

export interface TrainingVideoParams {
  pageIndex?: number;
  pageSize?: number;
  //title?: string;
  searchBy?: string;
}
