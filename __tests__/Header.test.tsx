import { ROLE_VARIANTS, ROLES } from "@/app/lib/definitions";
import Header from "@/components/organisms/Header";
import { useAuth } from "@/hooks/useAuth";
import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import React from "react";

jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      route: "/",
      pathname: "",
      query: "",
      asPath: "",
    };
  },
}));

jest.mock('@/hooks/useAuth');

// const mockUseAuth = jest.mocked(useAuth);
const mockUseAuth = useAuth as jest.Mock;

describe('Header', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    mockUseAuth.mockImplementation(() => ({
      checkAuth: jest.fn(),
      login: jest.fn(),
      register: jest.fn(),
      logout: jest.fn(),
      isLoggedIn: false,
      isLoading: false,
      role: ROLES[ROLE_VARIANTS.guest]
    }))
  })
  it('renders', () => {

    render(<Header />);

    const header = screen.getByRole('banner');

    expect(header).toBeInTheDocument();
  });

  it('renders for guest', () => {
    render(<Header />);

    const signin = screen.getByText('Signin');
    const signup = screen.getByText('Signup');
    const jobOffers = screen.getByText('Job Offers');

    expect(signin).toBeInTheDocument();
    expect(signup).toBeInTheDocument();
    expect(jobOffers).toBeInTheDocument();
  });

  it('renders for user', async () => {
    mockUseAuth.mockImplementation(() => ({
      checkAuth: jest.fn(),
      login: jest.fn(),
      register: jest.fn(),
      logout: jest.fn(),
      isLoggedIn: true,
      isLoading: false,
      role: ROLES[ROLE_VARIANTS.user]
    }));

    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({
          userAuth,
          status: 200
        }),
      }),
    ) as jest.Mock;

    const userAuth = {
      isLoggedIn: true,
      role: ROLES[ROLE_VARIANTS.user]
    }
    //
    // jest.spyOn(global, 'fetch').mockImplementation(
    //   jest.fn(
    //     () => Promise.resolve({
    //       json: () => Promise.resolve({
    //         userAuth,
    //         status: 200
    //       })
    //     })
    //   ) as jest.Mock)

    render(<Header />);

    await waitFor(() => {
      const profile = screen.getByText('My Profile');
      const logout = screen.getByText('Logout');

      expect(profile).toBeInTheDocument();
      expect(logout).toBeInTheDocument();
    })
  });

  it('renders for employer', async () => {
    mockUseAuth.mockImplementation(() => ({
      checkAuth: jest.fn(),
      login: jest.fn(),
      register: jest.fn(),
      logout: jest.fn(),
      isLoggedIn: true,
      isLoading: false,
      role: ROLES[ROLE_VARIANTS.employer]
    }));

    render(<Header />);

    await waitFor(() => {
      const signin = screen.queryByText('Signin');
      const signup = screen.queryByText('Signup');

      expect(signin).not.toBeInTheDocument();
      expect(signup).not.toBeInTheDocument();

      const addOffer = screen.getByText('Add Offer');
      const checkApplications = screen.getByText('Check Applications');

      expect(addOffer).toBeInTheDocument();
      expect(checkApplications).toBeInTheDocument();
    })
  });
})
