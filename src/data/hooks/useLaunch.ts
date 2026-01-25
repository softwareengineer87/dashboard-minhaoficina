
import { useContext, useState } from "react";
import type Launch from "../../models/Launch";
import type Part from "../../models/Part";
import { baseURL } from "../../utils/api";
import { AuthContext } from "../contexts/AuthContext";

function useLaunch() {

  const [launch, setLaunch] = useState<Launch[]>([]);
  const [partsList, setPartsList] = useState<Part[]>([]);
  const [message, setMessage] = useState<string>('');
  const [status, setStatus] = useState<boolean>(false);
  const [activeMessage, setActiveMessage] = useState<boolean>(false);
  const [limit, setLimit] = useState<number>(10);
  const [offset, setOffset] = useState<number>(0);
  const [dataPhoto, setDataPhoto] = useState({} as any);
  const [idLaunch, setIdLaunch] = useState<string>('');

  const { business } = useContext(AuthContext);

  function handleActiveMessage() {
    setActiveMessage(true);
    setTimeout(() => {
      setActiveMessage(false);
    }, 4000);
  }

  async function saveLaunch(launch: Launch) {
    try {
      const responseLaunch = await fetch(`${baseURL}/create-launch/${business.payload.businessId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          launchId: launch.launchId,
          name: launch.name,
          date: launch.date,
          tel: launch.tel,
          cpf: launch.cpf,
          model: launch.model,
          kilometer: launch.kilometer,
          plate: launch.plate,
          observation: launch.observation,
        })
      });
      const dataLaunch = await responseLaunch.json();
      handleActiveMessage();
      if (dataLaunch.statusCode === 500) {
        setMessage(dataLaunch.message);
        setStatus(responseLaunch.ok);
      }
      setMessage(dataLaunch.message);
      setStatus(responseLaunch.ok);
      setIdLaunch(dataLaunch.launchId);
    } catch (error) {
      console.log(error);
    }
  }

  async function savePhoto(file: any, launchId: string) {
    try {
      const formData = new FormData();
      formData.append('file', file);
      const responsePhoto = await fetch(`${baseURL}/photo/${launchId}`, {
        method: 'POST',
        body: formData
      });
      const dataPhoto = await responsePhoto.json();
      handleActiveMessage();
      if (dataPhoto.statusCode === 500) {
        setMessage(dataPhoto.message);
        setStatus(responsePhoto.ok);
      }
      setMessage(dataPhoto.message);
      setStatus(responsePhoto.ok);
      setDataPhoto(dataPhoto);
      return responsePhoto;
    } catch (error) {
      console.log(error);
    }
  }

  async function savePart(name: string, price: number, launchId: string) {
    try {
      const response = await fetch(`${baseURL}/create-part/${launchId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name,
          price
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
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async function loadParts(launchId: string) {
    try {
      const response = await fetch(`${baseURL}/parts/${launchId}`);
      const data = await response.json();
      setPartsList(data);
    } catch (error) {
      console.log(error);
    }
  }

  async function loadPhoto(launchId: string) {
    try {
      const response = await fetch(`${baseURL}/photos/${launchId}`);
      const data = await response.json();
      if (data) {
        return data;
      }
    } catch (error) {
      console.log(error);
    }
  }

  return {
    launch,
    saveLaunch,
    setLaunch,
    loadParts,
    partsList,
    setPartsList,
    savePart,
    dataPhoto,
    savePhoto,
    idLaunch,
    loadPhoto,
    message,
    status,
    activeMessage
  }
}

export default useLaunch;
