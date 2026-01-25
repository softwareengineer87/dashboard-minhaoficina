import { useState } from "react";
import { useServices } from "./useServices";

function usePagination() {

  const {
    allServices,
    setOffset,
    limit
  } = useServices();

  const totalPages = Math.ceil(allServices.length / limit);
  const [currentPage, setCurrentPage] = useState<number>(0);

  const isFirstPage = currentPage === 0;
  const isLastPage = currentPage + 1 === totalPages;

  function goToPage(index: number) {
    const current = index * limit;
    setOffset(current);
    setCurrentPage(index);
  }

  function toPreviusPage() {
    setCurrentPage((index) => {
      if (currentPage === index) {
        setOffset(0);
      } else {
        setOffset(-10);
      }
      return index === 0 ? index : index - 1
    });
    setOffset(limit);
  }

  function toNextPage() {
    setCurrentPage((index) => {
      if (index === totalPages) {
        setOffset(index * limit);
      } else {
        setOffset(limit);
      }
      return index + 1 === totalPages ? index : index + 1
    });
  }

  return {
    goToPage,
    toNextPage,
    toPreviusPage,
    isFirstPage,
    isLastPage,
    totalPages,
    currentPage
  }

}

export { usePagination }

