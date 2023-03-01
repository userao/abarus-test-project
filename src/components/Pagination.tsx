import React from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { actions } from "../slices/PostsSlice";
import "../styles/pagination.css";

const Pagination: React.FC = () => {
  const dispatch = useAppDispatch();
  const { totalCount, postsPerPage, currentPage } = useAppSelector((state) => state.posts);
  const numberOfPages: number[] = Array(totalCount / postsPerPage)
    .fill(null)
    .map((item, i) => i + 1);

  function nextPage() {
    const nextPageNumber = currentPage + 1 > totalCount / postsPerPage ? 1 : currentPage + 1;
    dispatch(actions.setCurrentPage(nextPageNumber));
  }
  function prevPage() {
    const prevPageNumber = currentPage - 1 < 1 ? totalCount / postsPerPage : currentPage - 1;
    dispatch(actions.setCurrentPage(prevPageNumber));
  }

  return (
    <div className="pagination">
      <div className="pagination__prev-page pagination__nav-button" onClick={prevPage}>
        Назад
      </div>
      <div className="pagination__page-buttons-container">
        {totalCount &&
          numberOfPages.map((number) => {
            const buttonClasses = `pagination__page-button ${
              number === currentPage ? "page-active" : null
            }`;
            return (
              <span
                key={number}
                className={buttonClasses}
                onClick={() => dispatch(actions.setCurrentPage(number))}>
                {number}
              </span>
            );
          })}
      </div>
      <div className="pagination__next-page pagination__nav-button" onClick={nextPage}>
        Далее
      </div>
    </div>
  );
};

export default Pagination;
