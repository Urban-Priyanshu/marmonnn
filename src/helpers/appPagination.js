import React from 'react';
import ReactPaginate from 'react-paginate';

const AppPagination = ({ page, totalPages, setPage }) => {
  const handlePageClick = (event) => {
    setPage(event.selected + 1);
  };

  return (
    <ReactPaginate
      breakLabel="..."
      nextLabel=">"
      onPageChange={handlePageClick}
      containerClassName="pagination justify-content-center"
      breakClassName="page-item"
      breakLinkClassName="page-link"
      pageClassName="page-item"
      pageLinkClassName="page-link"
      previousClassName="page-item"
      previousLinkClassName="page-link"
      nextClassName="page-item"
      nextLinkClassName="page-link"
      activeClassName="active"
      pageRangeDisplayed={5}
      pageCount={totalPages}
      previousLabel="<"
      renderOnZeroPageCount={null}
    />
  );
};

export default AppPagination;
