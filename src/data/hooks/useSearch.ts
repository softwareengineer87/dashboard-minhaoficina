import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useCallback, useContext, useState } from "react";
import { Auth } from "../contexts/Auth";

interface UseSearchProps {
  load(
    businessId: string,
    page: number,
    title?: string
  ): Promise<void>;
  paramName: string;
}

function useSearch({
  load,
  paramName
}: UseSearchProps) {

  const [inputTitle, setInputTitle] = useState<string | null>('');
  const [inputPage, setInputPage] = useState<number>(0);

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
    if (paramName === '') {
      push(`${pathname}`);
    }
    setInputTitle(title);
    await load(business.payload?.businessId, inputPage, title!);
    setInputTitle('');
  }

  async function changePage(pageNumber: number) {
    push(`${pathname}?${createQueryString('page', String(pageNumber))}`);
    setInputPage(page);
    await load(business.payload?.businessId, page);
  }

  async function showAll() {
    push(pathname);
    await load(business.payload?.businessId, inputPage);
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

