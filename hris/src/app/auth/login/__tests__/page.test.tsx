import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SignIn from '../page'; 
import { useAuthState, useAuthActions } from '../../../../providers/auth';
import { toast } from '../../../../providers/toast/toast';
import "@testing-library/jest-dom";

// Mocking the navigation
const mockPush = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush
  })
}));

// Mocking the Next Image component
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props) => <img {...props} />
}));

jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, href }) => <a href={href}>{children}</a>
}));

// Mocking the auth provider hooks
jest.mock('@/providers/auth', () => ({
  useAuthState: jest.fn(),
  useAuthActions: jest.fn()
}));

// Mocking the toast
jest.mock('@/providers/toast/toast', () => ({
  toast: jest.fn()
}));

// Mocking matchMedia for Ant Design components
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

describe('SignIn Component', () => {
  const mockLoginUser = jest.fn();
  const mockResetStateFlags = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    
    (useAuthActions as jest.Mock).mockReturnValue({
      loginUser: mockLoginUser,
      resetStateFlags: mockResetStateFlags
    });
    
    (useAuthState as jest.Mock).mockReturnValue({
      isPending: false,
      isSuccess: false,
      isError: false,
      currentRole: ''
    });
  });

  it('renders the login form correctly', () => {
    render(<SignIn />);
    
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByText('Sign In')).toBeInTheDocument();
    expect(screen.getByText(/Don't have an account\?/)).toBeInTheDocument();
    expect(screen.getByText('Register an account.')).toBeInTheDocument();
  });

  it('updates input fields when user types', () => {
    render(<SignIn />);
    
    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');
    
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    
    expect(emailInput).toHaveValue('test@example.com');
    expect(passwordInput).toHaveValue('password123');
  });

  it('calls loginUser when Sign In button is clicked', () => {
    render(<SignIn />);
    
    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');
    
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'Password@1' } });
    
    const signInButton = screen.getByText('Sign In');
    fireEvent.click(signInButton);
    
    expect(mockLoginUser).toHaveBeenCalledWith({
      userNameOrEmailAddress: 'test@example.com',
      password: 'Password@1'
    });
  });

  it('shows loading spinner when isPending is true', () => {
    (useAuthState as jest.Mock).mockReturnValue({
      isPending: true,
      isSuccess: false,
      isError: false,
      currentRole: ''
    });
    
    render(<SignIn />);
  });

  it('redirects to employee page on successful login as employee', async () => {
    const { rerender } = render(<SignIn />);
    
    (useAuthState as jest.Mock).mockReturnValue({
      isPending: false,
      isSuccess: true,
      isError: false,
      currentRole: 'employee'
    });
    
    rerender(<SignIn />);
    
    await waitFor(() => {
      expect(toast).toHaveBeenCalledWith('Authorized', 'success');
      expect(mockResetStateFlags).toHaveBeenCalled();
      expect(mockPush).toHaveBeenCalledWith('/employee');
    });
  });

  it('redirects to HR manager page on successful login as HR manager', async () => {
    const { rerender } = render(<SignIn />);
    
    (useAuthState as jest.Mock).mockReturnValue({
      isPending: false,
      isSuccess: true,
      isError: false,
      currentRole: 'hrmanager'
    });
    
    rerender(<SignIn />);
    
    await waitFor(() => {
      expect(toast).toHaveBeenCalledWith('Authorized', 'success');
      expect(mockResetStateFlags).toHaveBeenCalled();
      expect(mockPush).toHaveBeenCalledWith('/hrManager');
    });
  });

  it('redirects to applicant page on successful login with default role', async () => {
    const { rerender } = render(<SignIn />);
    
    (useAuthState as jest.Mock).mockReturnValue({
      isPending: false,
      isSuccess: true,
      isError: false,
      currentRole: 'unknown'
    });
    
    rerender(<SignIn />);
    
    await waitFor(() => {
      expect(toast).toHaveBeenCalledWith('Authorized', 'success');
      expect(mockResetStateFlags).toHaveBeenCalled();
      expect(mockPush).toHaveBeenCalledWith('/applicant');
    });
  });

  it('shows error toast when login fails', async () => {
    const { rerender } = render(<SignIn />);
    
    (useAuthState as jest.Mock).mockReturnValue({
      isPending: false,
      isSuccess: false,
      isError: true,
      currentRole: ''
    });
    
    rerender(<SignIn />);
    
    await waitFor(() => {
      expect(toast).toHaveBeenCalledWith('Erorr,please check your credentials', 'error');
      expect(mockResetStateFlags).toHaveBeenCalled();
    });
  });

  it('handles API errors during login', async () => {
    mockLoginUser.mockRejectedValueOnce({
      response: {
        data: {
          message: 'Invalid credentials'
        }
      }
    });
    
    render(<SignIn />);
    
    const signInButton = screen.getByText('Sign In');
    fireEvent.click(signInButton);
    
    await waitFor(() => {
      expect(toast).toHaveBeenCalledWith('error', 'Invalid credentials');
    });
  });

  it('handles generic errors during login', async () => {
    // Mocking a network error
    mockLoginUser.mockRejectedValueOnce(new Error('Network error'));
    
    render(<SignIn />);
    
    const signInButton = screen.getByText('Sign In');
    fireEvent.click(signInButton);
    
    await waitFor(() => {
      expect(toast).toHaveBeenCalledWith('error', 'An error occurred');
    });
  });
});