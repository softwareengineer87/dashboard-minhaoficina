import { useRouter } from "next/navigation";
import { FormEvent, useCallback, useState } from "react";

interface UseSearchProps {
  searchParams?: any;
  pathname?: any;
}

function useSearch({
  searchParams,
  pathname
}: UseSearchProps) {

  const [nameState, setNameState] = useState<string | null>('');

  const { push } = useRouter();
  const page = Number(searchParams.get('page'));
  const name = searchParams.get('name');

  const createQueryString = useCallback((name: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(name, value);
    return params.toString();
  }, [searchParams]);

  async function search(data: (...args: any[]) => void, event: FormEvent) {
    event.preventDefault();
    if (pathname.includes('page')) {
      push(`${pathname}?${createQueryString('name', nameState!)}`);
    } else {
      push(`${pathname}?page=${page}&${createQueryString('name', nameState!)}`);
    }
    if (name === '') {
      push(`${pathname}`);
    }
    setNameState(name);
    await data(page, name!);
    setNameState('');
  }

  return {
    search,
    createQueryString
  }

}

export { useSearch }

