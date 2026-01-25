import { useCallback, useContext, useEffect, useState } from "react";
import type { Business } from "../../models/Business";
import { baseURL } from "../../utils/api";
import type { Customer } from "../../models/Customer";
import { Schedule } from "@/types/Service";
import { Auth } from "../contexts/Auth";

function useBusiness() {

  const [message, setMessage] = useState<string>('');
  const [status, setStatus] = useState<boolean>(false);
  const [activeMessage, setActiveMessage] = useState<boolean>(false);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [limit, setLimit] = useState<number>(10);
  const [offset, setOffset] = useState<number>(0);
  const [canSchedule, setCanSchedule] = useState<boolean>(true);
  const [schedules, setSchedules] = useState([]);
  const [schedulesByBusinessId, setSchedulesByBusinessId] = useState<Schedule[]>([]);

  const { business } = useContext(Auth);

  function handleActiveMessage() {
    setActiveMessage(true);
    setTimeout(() => {
      setActiveMessage(false);
    }, 7000);
  }

  async function loadBusiness(businesId: string) {
    try {
      const response = await fetch(`${baseURL}/business/${businesId}`, {
        headers: {
          'Authorization': `Bearer ${business.token}`,
        }
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  async function loadPhoto(businesId: string) {
    try {
      const response = await fetch(`${baseURL}/business/photos/${businesId}`);
      const data = await response.json();
      if (data) {
        return data;
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function loadCustomers() {
    try {
      const queryParams = {
        limit: String(limit),
        offset: String(offset)
      }
      const queryString = new URLSearchParams(queryParams).toString();
      const response = await fetch(`${baseURL}/customers?${queryString}`);
      const data = await response.json();
      setCustomers(data);
    } catch (error) {
      console.log(error);
    }
  }

  async function updateBusiness(businessId: string, businessData: Business) {
    try {
      const response = await fetch(`${baseURL}/business/${businessId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${business.token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: businessData.name,
          email: businessData.email,
          cpf: businessData.cpf,
          password: businessData.password,
          city: businessData.city,
          district: businessData.district,
          address_number: businessData.addressNumber,
          description: businessData.description
        })
      });

      const data = await response.json();
      handleActiveMessage();
      if (data.statusCode === 500) {
        setStatus(response.ok);
        setMessage(data.message);
      }
      setStatus(response.ok);
      setMessage(data.message);
      return response;

    } catch (error) {
      console.log(error);
    }
  }

  async function blockCustomer(businessId: string) {
    try {
      const response = await fetch(`${baseURL}/business/block-customer/${businessId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${business.token}`,
        }
      });

      const data = await response.json();
      handleActiveMessage();
      if (data.statusCode === 500) {
        setStatus(response.ok);
        setMessage(data.message);
      }
      setStatus(response.ok);
      setMessage(data.message);
      setCanSchedule(data.canSchedule);
      return response;

    } catch (error) {
      console.log(error);
    }
  }

  async function unlockCustomer(businessId: string) {
    try {
      const response = await fetch(`${baseURL}/business/unlock-customer/${businessId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${business.token}`,
        }
      });

      const data = await response.json();
      handleActiveMessage();
      if (data.statusCode === 500) {
        setStatus(response.ok);
        setMessage(data.message);
      }
      setStatus(response.ok);
      setMessage(data.message);
      return response;

    } catch (error) {
      console.log(error);
    }
  }

  async function allSchedules() {
    try {
      const response = await fetch(`${baseURL}/schedules`);

      const data = await response.json();
      setSchedules(data);
    } catch (error) {
      console.log(error);
    }
  }

  const getSchedulesByBusinessId = useCallback(async () => {
    const queryParams = {
      limit: String(limit),
      offset: String(offset)
    }
    const queryString = new URLSearchParams(queryParams).toString();
    const response = await fetch(`${baseURL}/schedules/${business.payload?.businessId}?${queryString}`);
    const data = await response.json();
    setSchedulesByBusinessId(data);
  }, [business.payload?.businessId, limit, offset]);

  useEffect(() => {
    loadCustomers();
    allSchedules();
    getSchedulesByBusinessId();
  }, []);

  return {
    loadBusiness,
    updateBusiness,
    customers,
    blockCustomer,
    unlockCustomer,
    canSchedule,
    setCanSchedule,
    schedules,
    schedulesByBusinessId,
    setLimit,
    limit,
    setOffset,
    loadPhoto,
    message,
    status,
    activeMessage
  }

}

export { useBusiness }

