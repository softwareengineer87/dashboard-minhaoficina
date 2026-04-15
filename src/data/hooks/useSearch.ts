import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useCallback, useContext, useState } from "react";
import { Auth } from "../contexts/Auth";

interface useSearchProps {
  loadCb(
    businessId: string,
    page: number,
    title?: string
  ): Promise<void>;
  paramName: string
}

function useSearch({ loadCb, paramName }: useSearchProps) {

  const [inputTitle, setInputTitle] = useState<string | null>('');
  const [inputPage, setInputPage] = useState<number>(1);

  const { business } = useContext(Auth);

  const { push } = useRouter();
  const searchParams = useSearchParams();
  const page = Number(searchParams.get('page'));
  const title = searchParams.get(paramName);
  const pathname = usePathname();

  const createQueryString = useCallback((name: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(name, value);
    return params.toString();
  }, [searchParams]);


  async function search(event: FormEvent) {
    event.preventDefault();
    const params = new URLSearchParams(searchParams.toString());
    if (!params.has('page')) {
      push(`${pathname}?${createQueryString('page', String(inputPage))}&${createQueryString(paramName, inputTitle!)}`);
    } else {
      push(`${pathname}?${createQueryString(paramName, inputTitle!)}`);
    }
    if (title === '') {
      push(`${pathname}`);
    }
    setInputTitle(title);
    await loadCb(business.payload?.businessId, inputPage, inputTitle!);
    setInputTitle('');
  }

  async function changePage(pageNumber: number) {
    push(`${pathname}?${createQueryString('page', String(pageNumber))}`);
    setInputPage(page);
    await loadCb(business.payload?.businessId, inputPage);
    console.log('alterou a funcao change page', inputPage);
  }

  async function showAll() {
    push(pathname);
    await loadCb(business.payload?.businessId, inputPage);
  }

  return {
    search,
    changePage,
    showAll,
    inputTitle,
    inputPage,
    page,
    setInputPage,
    setInputTitle
  }

}

export { useSearch }

