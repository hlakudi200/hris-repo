import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import JobPost from "../jobPostComponent";
import { useAuthState } from "../../../providers/auth";
import {
  useJobPostingState,
  useJobPostingActions,
} from "../../../providers/jobPost";
import {
  useJobApplicationActions,
  useJobApplicationState,
} from "../../../providers/jobApplication";
import "@testing-library/jest-dom";

// Mocking matchMedia for Ant Design components
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // Deprecated
    removeListener: jest.fn(), // Deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mocking all required hooks
jest.mock("../../../providers/auth", () => ({
  useAuthState: jest.fn(),
}));

jest.mock("../../../providers/jobPost", () => ({
  useJobPostingState: jest.fn(),
  useJobPostingActions: jest.fn(),
}));

jest.mock("../../../providers/jobApplication", () => ({
  useJobApplicationState: jest.fn(),
  useJobApplicationActions: jest.fn(),
}));

jest.mock("@/providers/toast/toast", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

const mockSubmitJobApplication = jest.fn();

describe("JobPost", () => {
  beforeEach(() => {
    // Set up mock return values
    (useAuthState as jest.Mock).mockReturnValue({
      currentUser: {
        id: "123",
        name: "Test User",
        emailAddress: "test@example.com",
      },
    });

    (useJobPostingState as jest.Mock).mockReturnValue({
      JobPostings: [
        {
          id: "1",
          title: "Software Engineer",
          description: "Build software.",
          location: "Remote",
          openDate: "2025-04-20T00:00:00Z",
          closeDate: "2025-05-20T00:00:00Z",
        },
      ],
      isPending: false,
      isError: false,
    });

    (useJobPostingActions as jest.Mock).mockReturnValue({
      getJobPostings: jest.fn(),
      applyForJob: jest.fn(),
    });

    (useJobApplicationState as jest.Mock).mockReturnValue({
      jobApplications: [],
      isPending: false,
      isSuccess: false,
      isError: false,
    });

    (useJobApplicationActions as jest.Mock).mockReturnValue({
      createJobApplication: jest.fn(),
      getJobApplications: jest.fn(),
    });

    (useJobApplicationActions as jest.Mock).mockReturnValue({
      submitJobApplication: mockSubmitJobApplication,
      resetStateFlags: jest.fn(),
    });
  });

  it("renders job posting details", () => {
    render(<JobPost />);

    expect(screen.getByText("Software Engineer")).toBeInTheDocument();
    expect(screen.getByText("Build software.")).toBeInTheDocument();
  });

  it("handles apply button click", async () => {
    render(<JobPost />);

    const applyButton = screen.getByText("Apply for role");
    fireEvent.click(applyButton);

    await waitFor(() => {
      expect(mockSubmitJobApplication).toHaveBeenCalledWith({
        jobPostingId: "1",
        applicantName: "Test User",
        email: "test@example.com",
        resumePath: "Internal Applicant",
        status: "Pending",
      });
    });
  });
});
