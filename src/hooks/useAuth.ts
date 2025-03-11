import { ERROR_MESSAGES, ERROR_VARIANTS, ErrorVariant, ROLE_VARIANTS, ROLES, RoleVariant } from "@/app/lib/definitions";
import { useCallback, useEffect, useState } from "react";

type ReturnData = {
  readonly errorType?: ErrorVariant
  readonly status: number
}

type AuthState = {
  isLoggedIn: boolean
  isLoading: boolean
  role: RoleVariant
  error?: ErrorVariant
}

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    isLoggedIn: false,
    isLoading: false,
    role: ROLES[ROLE_VARIANTS.guest]
  });

  function setError(data: ReturnData) {
    if (isBadData(data)) {
      setAuthState((prev) => ({
        ...prev,
        isLoading: false,
        error: ERROR_MESSAGES[ERROR_VARIANTS.BAD_DATA]
      }));
      return;
    }

    if (isPasswordsNotMatching(data)) {
      setAuthState((prev) => ({
        ...prev,
        isLoading: false,
        error: ERROR_MESSAGES[ERROR_VARIANTS.PASSWORDS_NOT_MATCHING]
      }));
      return;
    }

    if (isFieldsEmpty(data)) {
      setAuthState((prev) => ({
        ...prev,
        isLoading: false,
        error: ERROR_MESSAGES[ERROR_VARIANTS.EMPTY_FIELDS]
      }));
      return;
    }

    if (isDataNotConsent(data)) {
      setAuthState((prev) => ({
        ...prev,
        isLoading: false,
        error: ERROR_MESSAGES[ERROR_VARIANTS.NO_DATA_CONSENT]
      }));
      return;
    }

    if (isUserExists(data)) {
      setAuthState((prev) => ({
        ...prev,
        isLoading: false,
        error: ERROR_MESSAGES[ERROR_VARIANTS.USER_EXISTS]
      }));
      return;
    }

    if (isOtherError(data)) {
      setAuthState((prev) => ({
        ...prev,
        isLoading: false,
        error: ERROR_MESSAGES[ERROR_VARIANTS.OTHER]
      }));
      return;
    }
    setAuthState((prev) => ({
      ...prev,
      isLoading: false,
      error: undefined
    }));
    return;
  }

  function isBadData(data: ReturnData) {
    return data.errorType === ERROR_VARIANTS.BAD_DATA;
  }

  function isPasswordsNotMatching(data: ReturnData) {
    return data.errorType === ERROR_VARIANTS.PASSWORDS_NOT_MATCHING;
  }

  function isFieldsEmpty(data: ReturnData) {
    return data.errorType === ERROR_VARIANTS.EMPTY_FIELDS;
  }

  function isDataNotConsent(data: ReturnData) {
    return data.errorType === ERROR_VARIANTS.NO_DATA_CONSENT;
  }

  function isUserExists(data: ReturnData) {
    return data.errorType === ERROR_VARIANTS.USER_EXISTS;
  }

  function isOtherError(data: ReturnData) {
    return data.errorType === ERROR_VARIANTS.OTHER;
  }

  const checkAuth = useCallback(async () => {
    setAuthState((prev) => ({
      ...prev,
      isLoading: true,
      error: undefined
    }));

    try {
      const response = await fetch('/api/auth/check', {
        method: "GET",
        credentials: "include"
      });

      if (!response.ok) {
        const responseJson = await response.json();
        setError(responseJson);
        return;
      }

      const data = await response.json();
      setAuthState(() => ({
        isLoggedIn: data.isLoggedIn,
        isLoading: false,
        role: data.role,
        error: undefined
      }));

    }
    catch {
      setAuthState((prev) => ({
        ...prev,
        isLoggedIn: false,
        isLoading: false,
        role: ROLES[ROLE_VARIANTS.guest],
        error: ERROR_MESSAGES[ERROR_VARIANTS.OTHER]
      }));
      return;
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const login = useCallback(async (formData: FormData) => {
    setAuthState((prev) => ({
      ...prev,
      isLoading: true,
      error: undefined
    }));

    const response = await fetch('/api/login', {
      method: "POST",
      body: formData,
    })

    if (!response.ok) {
      const responseJson = await response.json();
      setError(responseJson);
      return;
    }

    const data = await response.json();

    setAuthState(() => ({
      isLoggedIn: true,
      isLoading: false,
      role: data.role === "employer" ?
        ROLES[ROLE_VARIANTS.employer] :
        ROLES[ROLE_VARIANTS.user],
      error: undefined
    }));
  }, []);

  const register = useCallback(async (formData: FormData) => {
    setAuthState((prev) => ({
      ...prev,
      isLoading: true,
      error: undefined
    }));

    try {
      const response = await fetch('/api/register', {
        method: "POST",
        body: formData,
      })
      if (!response.ok) {
        const responseJson = await response.json();
        setError(responseJson);
        return;
      }

      const data = await response.json();

      setAuthState(() => ({
        isLoggedIn: true,
        isLoading: false,
        role: data.role === "employer" ?
          ROLES[ROLE_VARIANTS.employer] :
          ROLES[ROLE_VARIANTS.user],
        error: undefined
      }));
    }
    catch {
      setAuthState(() => ({
        isLoggedIn: false,
        isLoading: false,
        role: ROLES[ROLE_VARIANTS.guest],
        error: ERROR_MESSAGES[ERROR_VARIANTS.OTHER]
      }));
    }
  }, []);

  const logout = useCallback(async () => {
    setAuthState((prev) => ({
      ...prev,
      isLoading: true,
      error: undefined
    }));

    try {
      const response = await fetch('/api/logout', {
        method: "DELETE",
      })
      if (!response.ok) {
        const responseJson = await response.json();
        setError(responseJson);
        return;
      }

      setAuthState((prev) => ({
        ...prev,
        isLoggedIn: false,
        isLoading: false,
        role: ROLES[ROLE_VARIANTS.guest],
        error: undefined
      }));
    }
    catch {
      setAuthState((prev) => ({
        ...prev,
        isLoggedIn: false,
        isLoading: false,
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
