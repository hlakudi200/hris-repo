export interface IInterview {
  id: string;
  creationTime: string;
  creatorUserId: number;
  lastModificationTime?: string;
  lastModifierUserId?: number;
  isDeleted: boolean;
  deleterUserId?: number;
  deletionTime?: string;
  jobApplicationId: string;
  scheduledDate: string;
  interviewer: string;
  mode: string;
  feedback: string;
}

export interface IJobPostingListResult {
  totalCount: number;
  items: IJobPosting[];
}

export interface IAbpResponse<T> {
  result: T;
  success: boolean;
  error: string | null;
  unAuthorizedRequest: boolean;
  __abp: boolean;
}

export interface IJobApplication {
  id: string;
  jobPostingId: string;
  applicantName: string;
  email: string;
  resumePath: string;
  status: string;
  interviews: IInterview[];
}

export interface IJobPosting {
  id?: string;
  title: string;
  department:string;
  description: string;
  location: string;
  openDate: string;
  closeDate: string;
  status: string;
  applications?: IJobApplication[];
}
