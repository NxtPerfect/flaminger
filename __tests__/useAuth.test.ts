import { ROLE_VARIANTS, ROLES } from "@/app/lib/definitions";
import { useAuth } from "@/hooks/useAuth";
import { renderHook } from "@testing-library/react";

describe('useAuth', () => {
  it('to be false on startup', () => {
    const { result } = renderHook(() => useAuth());

    expect(result.current.isLoggedIn).toBe(false);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.role).toBe(ROLES[ROLE_VARIANTS.guest]);
  });

  // it('to be true on login', () => {
  //   const { result } = renderHook(() => useAuth());
  //
  //   expect(result.current.isLoggedIn).toBe(false);
  //   expect(result.current.isLoading).toBe(false);
  //   expect(result.current.role).toBe(ROLES[ROLE_VARIANTS.guest]);
  // })
})
