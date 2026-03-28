
import { useContext, useState } from "react";
import type Part from "../../models/Part";
import { baseURL } from "../../utils/api";
import Note from "@/models/Note";
import { Auth } from "../contexts/Auth";
import { PaginationModel } from "@/models/PaginationModel";

function useNote() {

  const [notes, setNotes] = useState<Note[]>([]);
  const [partsList, setPartsList] = useState<Part[]>([]);
  const [message, setMessage] = useState<string>('');
  const [status, setStatus] = useState<boolean>(false);
  const [activeMessage, setActiveMessage] = useState<boolean>(false);
  const [dataPhoto, setDataPhoto] = useState({} as any);
  const [idNote, setIdNote] = useState<string>('');
  const [pagination, setPagination] = useState<PaginationModel>({} as PaginationModel);

  const { business } = useContext(Auth);

  function handleActiveMessage() {
    setActiveMessage(true);
    setTimeout(() => {
      setActiveMessage(false);
    }, 4000);
  }

  async function saveNote(note: Note) {
    try {
      const responseNote = await fetch(`${baseURL}/notes/${business.payload.businessId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          noteId: note.noteId,
          email: note.email,
          name: note.name,
          cpf: note.cpf,
          phone: note.phone,
          model: note.model,
          kilometer: note.kilometer,
          plate: note.plate,
          observation: note.observation,
          date: note.date
        })
      });
      const dataNote = await responseNote.json();
      handleActiveMessage();
      if (dataNote.statusCode === 500) {
        setMessage(dataNote.message);
        setStatus(responseNote.ok);
      }
      setMessage(dataNote.message);
      setStatus(responseNote.ok);
      setIdNote(dataNote.noteId);
    } catch (error) {
      console.log(error);
    }
  }

  async function savePhoto(file: any, noteId: string) {
    try {
      const formData = new FormData();
      formData.append('file', file);
      const responsePhoto = await fetch(`${baseURL}/photo/${noteId}`, {
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

  async function savePart(name: string, price: number, noteId: string) {
    try {
      const response = await fetch(`${baseURL}/create-part/${noteId}`, {
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

  async function loadParts(noteId: string) {
    try {
      const response = await fetch(`${baseURL}/parts/${noteId}`);
      const data = await response.json();
      setPartsList(data);
    } catch (error) {
      console.log(error);
    }
  }

  async function loadPhoto(noteId: string) {
    try {
      const response = await fetch(`${baseURL}/photos/${noteId}`);
      const data = await response.json();
      if (data) {
        return data;
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function loadNotes(page: number, name: string = '') {
    try {
      const response = await fetch(`${baseURL}/dashboard/notes/${business.payload?.businessId}?page=${page}&name=${name}`);
      console.log(response);
      const data = await response.json();
      setNotes(data.notes);
      setPagination(data.pagination);
    } catch (error: any) {
      console.log(`Erro ao carregar notas: ${error.message}`)
    }
  }

  return {
    notes,
    pagination,
    saveNote,
    setNotes,
    loadParts,
    partsList,
    setPartsList,
    savePart,
    dataPhoto,
    savePhoto,
    idNote,
    loadPhoto,
    loadNotes,
    message,
    status,
    activeMessage
  }
}

export default useNote;
