'use client';

import { createContext, useEffect, useState } from "react";
import type { BusinessPayload } from "../../types/Business";
import { baseURL } from "../../utils/api";
import { useLocalStorage } from "../hooks/useLocalStorage";
import type { Business } from "../../models/Business";
import { useRouter } from "next/navigation";
import { setCookie } from "nookies";

interface AuthProviderProps {
  children: React.ReactNode;
}

interface AuthContextProps {
  login(email: string, password: string): Promise<void>;
  business: BusinessPayload;
  logout(): void;
  loadBusiness(businessId: string): Promise<void>;
  businessDetail: Business;
  message: string,
  status: boolean;
  activeMessage: boolean;
}

const AuthContext = createContext({} as AuthContextProps);

function AuthProvider({ children }: AuthProviderProps) {
  const [business, setBusiness] = useState<BusinessPayload>({} as BusinessPayload);
  const [businessDetail, setBusinessDetail] = useState<Business>({} as Business);
  const [message, setMessage] = useState<string>('');
  const [status, setStatus] = useState<boolean>(false);
  const [activeMessage, setActiveMessage] = useState<boolean>(false);
  const { getLocalStorage, setLocalStorage, deleteLocalStorage } = useLocalStorage();
  console.log(business);

  const { push } = useRouter();

  function handleActiveMessage() {
    setActiveMessage(true);
    setTimeout(() => {
      setActiveMessage(false);
    }, 4000);
  }

  function redirectTo(url: string) {
    setTimeout(() => {
      push(url);
    }, 3000);
  }

  async function login(email: string, password: string) {
    try {
      const response = await fetch(`${baseURL}/business/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email,
          password
        })
      });
      const data = await response.json();
      handleActiveMessage();
      if (data.statusCode === 500) {
        setStatus(response.ok);
        setMessage(data.message);
        return;
      }
      setStatus(response.ok);
      setMessage(data.message);
      setBusiness(data);
      if (response.ok) {
        setCookie(null, 'simplehour-token', data.token, {
          maxAge: 7 * 60 * 60 * 60
        });
        setLocalStorage('business-payload', data);
        redirectTo('/');
      }
    } catch (error) {
      console.log(error);
    }
  }

  function logout() {
    deleteLocalStorage('business-payload');
    setBusiness({} as BusinessPayload);
    handleActiveMessage();
    setMessage('Logout feito, você está sendo redirecionado.');
    redirectTo('/sign-in');
  }

  async function loadBusiness(businesId: string) {
    try {
      const response = await fetch(`${baseURL}/business/${businesId}`);
      const data = await response.json();
      if (data) {
        setBusinessDetail(data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const businessData = getLocalStorage('business-payload');
    if (businessData) {
      setBusiness(businessData);
    }
  }, [getLocalStorage]);

  return (
    <AuthContext.Provider value={{
      login,
      business,
      logout,
      loadBusiness,
      businessDetail,
      message,
      status,
      activeMessage
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export {
  AuthContext,
  AuthProvider
}
