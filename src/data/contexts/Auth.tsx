'use client';

import { Business } from "@/models/Business";
import { BusinessPayload } from "@/types/Business";
import { useRouter } from "next/navigation";
import { createContext, useEffect, useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { baseURL } from "@/utils/api";
import { setCookie, destroyCookie } from "nookies";

interface AuthProviderProps {
  children: React.ReactNode;
}

const Auth = createContext({} as any);

function AuthProvider2({ children }: AuthProviderProps) {
  const [business, setBusiness] = useState<BusinessPayload>({} as BusinessPayload);
  const [businessDetail, setBusinessDetail] = useState<Business>({} as Business);
  const [message, setMessage] = useState<string>('');
  const [status, setStatus] = useState<boolean>(false);
  const [activeMessage, setActiveMessage] = useState<boolean>(false);
  const { getLocalStorage, setLocalStorage, deleteLocalStorage } = useLocalStorage();
  const [dataPhoto, setDataPhoto] = useState({} as any);
  const [businessId, setBusinessId] = useState<string>('');

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
      const response = await fetch(`${baseURL}/business/sign-in`, {
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
        setCookie(null, 'minhaoficina-token', data.token, {
          maxAge: 7 * 60 * 60 * 60
        });
        setLocalStorage('business-payload', data);
        redirectTo('/');
      }
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  function logout() {
    deleteLocalStorage('business-payload');
    destroyCookie(null, 'minhaoficina-token');
    setBusiness({} as BusinessPayload);
    handleActiveMessage();
    setMessage('Logout feito, você está sendo redirecionado.');
    redirectTo('/');
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

  async function saveBusiness(business: Business) {
    try {
      const response = await fetch(`${baseURL}/business/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: business.name,
          email: business.email,
          password: business.password
        })
      });
      const data = await response.json();
      handleActiveMessage();
      if (data.statusCode === 500) {
        setMessage(data.message);
        setStatus(response.ok);
      }
      setBusinessId(data.businessId);
      setMessage(data.message);
      setStatus(response.ok);
    } catch (error) {
      console.log(error);
    }
  }

  async function savePhoto(file: any) {
    try {
      const formData = new FormData();
      formData.append('file', file);
      const response = await fetch(`${baseURL}/business/logo/${businessId}`, {
        method: 'POST',
        body: formData
      });
      const data = await response.json();
      handleActiveMessage();
      if (data.statusCode === 500) {
        setMessage(data.message);
        setStatus(response.ok);
      }
      setDataPhoto(data);
      setMessage(data.message);
      setStatus(response.ok);
      return response;
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
    <Auth.Provider value={{
      login,
      business,
      logout,
      loadBusiness,
      businessDetail,
      saveBusiness,
      savePhoto,
      dataPhoto,
      message,
      status,
      activeMessage
    }}>
      {children}
    </Auth.Provider>
  );
}

export {
  Auth,
  AuthProvider2
}

