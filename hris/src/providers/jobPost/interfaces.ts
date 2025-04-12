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
    id: string;
    jobTitle: string;
    jobDescription: string;
    location: string;
    postingDate: string;
    closingDate: string;
    status: string;
    jobApplications ?: IJobApplication[];
  }