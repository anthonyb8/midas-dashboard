import { useState } from 'react';

/**
 * Custom hook for managing pagination logic.
 * 
 * @param {Array} items The items to paginate.
 * @param {number} itemsPerPage Number of items per page.
 * @returns Pagination logic and current items.
 */
export function usePagination(items, itemsPerPage) {
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(items.length / itemsPerPage);

    const goToNextPage = () => setCurrentPage(currentPage => Math.min(currentPage + 1, totalPages));
    const goToPreviousPage = () => setCurrentPage(currentPage => Math.max(currentPage - 1, 1));

    const currentItems = items.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    return { currentItems, goToNextPage, goToPreviousPage, currentPage, totalPages };
}
