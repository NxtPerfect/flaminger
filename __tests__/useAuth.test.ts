import { ROLE_VARIANTS, ROLES } from "@/app/lib/definitions";
import { useAuth } from "@/hooks/useAuth";
import { act, renderHook } from "@testing-library/react";


global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({
      isLoggedIn: true,
      role: ROLES[ROLE_VARIANTS.user],
      status: 200
    }),
  }),
) as jest.Mock;

describe('useAuth', () => {
  it('to be false on startup', () => {
    const { result } = renderHook(() => useAuth());

    expect(result.current.isLoggedIn).toBe(false);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.role).toBe(ROLES[ROLE_VARIANTS.guest]);
  });

  it('to be true on login', () => {
    const { result } = renderHook(() => useAuth());

    act(() => {
      result.current.login(new FormData())
    })

    expect(result.current.isLoggedIn).toBe(true);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.role).toBe(ROLES[ROLE_VARIANTS.user]);
  })
})
