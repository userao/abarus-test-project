import React from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { setCurrentPage } from "../slices/PostsSlice";
import "../styles/pagination.css";

const Pagination: React.FC = () => {
  const dispatch = useAppDispatch();
  const { normalizedPosts, postsPerPage, currentPage } = useAppSelector((state) => state.posts);

  const numberOfPages = Math.ceil(normalizedPosts.length / postsPerPage);
  const pages = [];

  for (let i = 0; i < numberOfPages; i += 1) {
    pages.push(i + 1);
  }

  function nextPage() {
    const nextPageNumber = currentPage + 1 > numberOfPages ? 1 : currentPage + 1;
    dispatch(setCurrentPage(nextPageNumber));
  }
  function prevPage() {
    const prevPageNumber = currentPage - 1 < 1 ? numberOfPages : currentPage - 1;
    dispatch(setCurrentPage(prevPageNumber));
  }

  return (
    <div className="pagination">
      <div className="pagination__prev-page pagination__nav-button" onClick={prevPage}>
        Назад
      </div>
      <div className="pagination__page-buttons-container">
        {normalizedPosts.length &&
          pages.map((number) => {
            const buttonClasses = `pagination__page-button ${
              number === currentPage ? "page-active" : null
            }`;
            return (
              <span
                key={number}
                className={buttonClasses}
                onClick={() => dispatch(setCurrentPage(number))}>
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
