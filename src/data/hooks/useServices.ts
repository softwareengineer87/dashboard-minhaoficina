import { Business } from "@/models/Business";
import { Service } from "@/types/Service";
import { useCallback, useContext, useEffect, useState } from "react"
import { baseURL } from "@/utils/api";
import { Auth } from "../contexts/Auth";

function useServices() {

  const [services, setServices] = useState<Service[]>([]);
  const [allServices, setAllServices] = useState<Service[]>([]);
  const [detailService, setDetailService] = useState<Service>({} as Service);
  const [message, setMessage] = useState<string>('');
  const [status, setStatus] = useState<boolean>(false);
  const [activeMessage, setActiveMessage] = useState<boolean>(false);
  const [limit, setLimit] = useState<number>(10);
  const [offset, setOffset] = useState<number>(0);
  const [businessDetail, setBusinessDetail] = useState<Business | undefined>({} as Business);

  const { business } = useContext(Auth);
  function handleActiveMessage() {
    setActiveMessage(true);
    setTimeout(() => {
      setActiveMessage(false);
    }, 4000);
  }

  const getServices = useCallback(async () => {
    const queryParams = {
      limit: String(limit),
      offset: String(offset)
    }
    const queryString = new URLSearchParams(queryParams).toString();
    const response = await fetch(`${baseURL}/business/services/${business.payload?.businessId}?${queryString}`, {
      headers: {
        'Authorization': `Bearer ${business.token}`,
      }
    });
    const data = await response.json();
    setServices(data);
  }, [limit, offset]);

  const getAllServices = useCallback(async () => {
    const response = await fetch(`${baseURL}/business/all_services/${business.payload?.businessId}`, {
      headers: {
        'Authorization': `Bearer ${business.token}`,
      }
    });
    const data = await response.json();
    setAllServices(data);
  }, []);

  async function saveService(service_title: string, price: number, start_hour: string) {
    try {
      const response = await fetch(`${baseURL}/business/services/${business.payload?.businessId}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${business.token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          service_title,
          price,
          start_hour
        })
      });
      const data = await response.json();
      handleActiveMessage();
      if (data.statusCode === 500) {
        setMessage(data.message);
        setStatus(response.ok);
        return { ok: response.ok };
      }
      setMessage(data.message);
      setStatus(response.ok);
      return { ok: response.ok };
    } catch (error) {
      console.log(error);
      return { ok: false };
    }
  }

  async function updateService(service: Service) {
    try {
      const response = await fetch(`${baseURL}/business/services_update/${service.service_id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${business.token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          service_title: service.service_title,
          price: service.price,
        })
      });
      const data = await response.json();
      handleActiveMessage();
      if (data.statusCode === 500) {
        setMessage(data.message);
        setStatus(response.ok);
      }
      setMessage(data.message);
      setStatus(response.ok);
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteService(service: Service) {
    try {
      const response = await fetch(`${baseURL}/business/services_delete/${service.service_id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${business.token}`,
        }
      });
      const data = await response.json();
      handleActiveMessage();
      if (data.statusCode === 500) {
        setMessage(data.message);
        setStatus(response.ok);
      }
      setMessage(data.message);
      setStatus(response.ok);
    } catch (error) {
      console.log(error);
    }
  }

  async function loadService(serviceId: string) {
    try {
      const response = await fetch(`${baseURL}/business/service_detail/${serviceId}`, {
        headers: {
          'Authorization': `Bearer ${business.token}`,
        }
      });
      const data = await response.json();
      if (data.statusCode === 500) {
        setMessage(data.message);
        setStatus(response.ok);
      }
      setMessage(data.message);
      setStatus(response.ok);
      setDetailService(data);
    } catch (error) {
      console.log(error);
    }
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
    getServices();
    getAllServices();
  }, [getServices, getAllServices]);

  return {
    services,
    allServices,
    saveService,
    updateService,
    loadService,
    deleteService,
    detailService,
    message,
    status,
    activeMessage,
    getServices,
    limit,
    setLimit,
    offset,
    setOffset,
    loadBusiness,
    businessDetail
  }
}

export { useServices }

