import { ERROR_MESSAGES, ERROR_VARIANTS, ErrorVariant, RegisterFormData, ROLE_VARIANTS, ROLES, RoleVariant } from "@/app/lib/definitions";
import { useCallback, useState } from "react";

type ReturnData = {
  readonly errorType?: ErrorVariant
  readonly status: number
}

type AuthState = {
  isLoggedIn: boolean
  role: RoleVariant
  error?: ErrorVariant
}

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    isLoggedIn: false,
    role: ROLES[ROLE_VARIANTS.guest]
  });

  function setError(data: ReturnData) {
    if (isBadData(data))
      setAuthState((prev) => ({
        ...prev,
        error: ERROR_MESSAGES[ERROR_VARIANTS.BAD_DATA]
      }));
  }

  function isBadData(data: ReturnData) {
    return data.errorType === "badData";
  }

  const checkAuth = useCallback(async () => {
    try {
      const response = await fetch('/api/auth/check', {
        method: "GET",
        credentials: "include"
      });

      if (!response.ok) {
        setAuthState((prev) => ({
          ...prev,
          isLoggedIn: false,
          role: ROLES[ROLE_VARIANTS.guest],
          error: ERROR_MESSAGES[ERROR_VARIANTS.BAD_DATA]
        }));
        return;
      }

      const data = await response.json();
      setAuthState(() => ({
        isLoggedIn: true,
        role: data.role
      }));

    }
    catch {
      setAuthState((prev) => ({
        ...prev,
        isLoggedIn: false,
        role: ROLES[ROLE_VARIANTS.guest],
        error: ERROR_MESSAGES[ERROR_VARIANTS.OTHER]
      }));
      return;
    }
  }, []);

  const login = useCallback(async (formData: FormData) => {
    const response = await fetch('/api/login', {
      method: "POST",
      body: formData,
    })

    const data = await response.json();
    if (isBadData(data)) {
      setAuthState((prev) => ({
        ...prev,
        isLoggedIn: false,
        role: ROLES[ROLE_VARIANTS.guest],
      }));
    }
    setAuthState(() => ({
      isLoggedIn: true,
      role: data.role === "employer" ?
        ROLES[ROLE_VARIANTS.employer] :
        ROLES[ROLE_VARIANTS.user]
    }));
  }, []);

  const register = useCallback(async (formData: FormData) => {
    try {
      const response = await fetch('/api/register', {
        method: "POST",
        body: formData,
      })

      const data = await response.json();
      if (isBadData(data)) {
        setAuthState(() => ({
          isLoggedIn: false,
          role: ROLES[ROLE_VARIANTS.guest],
          error: ERROR_MESSAGES[ERROR_VARIANTS.BAD_DATA]
        }));
      }

      setAuthState(() => ({
        isLoggedIn: true,
        role: data.role === "employer" ?
          ROLES[ROLE_VARIANTS.employer] :
          ROLES[ROLE_VARIANTS.user]
      }));
    }
    catch {
      setAuthState(() => ({
        isLoggedIn: false,
        role: ROLES[ROLE_VARIANTS.guest],
        error: ERROR_MESSAGES[ERROR_VARIANTS.OTHER]
      }));
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      const response = await fetch('/api/logout', {
        method: "DELETE",
      })

      const data = await response.json();
      if (isBadData(data)) {
        setAuthState(() => ({
          isLoggedIn: false,
          role: ROLES[ROLE_VARIANTS.guest],
          error: ERROR_MESSAGES[ERROR_VARIANTS.BAD_DATA]
        }));
      }
      setAuthState(() => ({
        isLoggedIn: false,
        role: ROLES[ROLE_VARIANTS.guest],
      }));
    }
    catch {
      setAuthState(() => ({
        isLoggedIn: false,
        role: ROLES[ROLE_VARIANTS.guest],
        error: ERROR_MESSAGES[ERROR_VARIANTS.OTHER]
      }));
    }
  }, []);

  return {
    ...authState,
    checkAuth,
    login,
    register,
    logout
  }
}
