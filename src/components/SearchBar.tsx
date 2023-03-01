import React, { ReactElement, useState } from "react";
import { actions } from "../slices/PostsSlice";
import { useAppDispatch } from "../app/hooks";
import "../styles/search-bar.css";

const SearchBar: React.FC = (): ReactElement => {
  const [inputValue, setInputValue] = useState<string>("");
  const dispatch = useAppDispatch();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    dispatch(actions.setSearchBy(inputValue));
    setInputValue("");
  }

  function handleChange(e: React.FormEvent<HTMLInputElement>) {
    setInputValue(e.currentTarget.value);
  }

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        onChange={handleChange}
        type="text"
        className="search-bar__input"
        placeholder="Поиск"
        value={inputValue}
      />
      <button type="submit" className="search-bar__button">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="21"
          height="20"
          fill="white"
          className="bi bi-search"
          viewBox="0 0 16 16">
          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
        </svg>
      </button>
    </form>
  );
};

export default SearchBar;
