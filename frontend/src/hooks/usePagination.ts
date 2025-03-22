import { useState } from 'react';

interface UsePaginationProps {
  initialPage?: number;
  initialPerPage?: number;
}

export const usePagination = ({ initialPage = 1, initialPerPage = 10 }: UsePaginationProps = {}) => {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [perPage, setPerPage] = useState(initialPerPage);

  const handlePerPageChange = (newPerPage: number) => {
    setPerPage(newPerPage);
    setCurrentPage(1); // Reset to first page when changing items per page
  };

  return {
    currentPage,
    perPage,
    setCurrentPage,
    handlePerPageChange,
  };
};