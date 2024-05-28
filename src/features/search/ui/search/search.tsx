import { ChangeEvent, FC, KeyboardEvent, useState } from "react";
import { FallingLines } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import {
  DropdownSearchItem,
  fetchSearch,
  selectSearchBooks,
  selectSearchError,
  selectSearchLoading,
} from "features/search";
import { useDebounce } from "shared/lib/debounce";
import { useAppDispatch, useAppSelector } from "shared/lib/store";
import { Dropdown } from "shared/ui/dropdown";

import "./search.css";
import SearchComponent from "shared/ui/search/search";

interface ISearch {
  readonly className?: string;
}

const PRIMARY_BG = "#2699fb";

export const Search: FC<ISearch> = (props) => {
  const { className = "" } = props;

  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [valueSearch, setValueSearch] = useState("");

  const books = useAppSelector(selectSearchBooks);
  const loading = useAppSelector(selectSearchLoading);
  const error = useAppSelector(selectSearchError);
  const dispatch = useAppDispatch();

  const { debouncedFunction: getResultsSearchDebounce, loadingDebounce } =
    useDebounce((searchSrc: string) => dispatch(fetchSearch({ searchSrc })));

  const goToResultsPage = () => {
    navigate(`/search/${valueSearch}`);
    setIsOpen(false);
    setValueSearch("");
  };

  const onChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setValueSearch(e.target.value);

    if (e.target.value.length >= 3) {
      getResultsSearchDebounce(e.target.value);
    }
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      goToResultsPage();
      e.currentTarget.blur();
    }
  };

  const renderContent = () => {
    if (loading || loadingDebounce) {
      return (
        <div className="search__loading">
          <FallingLines width="50" color={PRIMARY_BG} />
        </div>
      );
    }
    if (error) {
      return <span className="search__error">{error.messageError}</span>;
    }
    if (valueSearch.length < 3) {
      return (
        <div className="search__info">
          Enter search terms, at least 3 characters
        </div>
      );
    }
    return (
      <div>
        {books?.slice(0, 5)?.map((item) => {
          return (
            <DropdownSearchItem
              key={item.isbn}
              title={item.title}
              published={item.published}
              author={item.author}
              cover={item.cover}
              isbn={item.isbn}
            />
          );
        })}
        <button
          type="button"
          onClick={goToResultsPage}
          className="search__button-more"
        >
          See more
        </button>
      </div>
    );
  };

  return (
    <div
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) {
          setIsOpen(false);
        }
      }}
      className={`search ${className}`}
    >
      <Dropdown
        isOpen={isOpen}
        labelElement={
          <SearchComponent
            onChangeSearch={onChangeSearch}
            onKeyDown={onKeyDown}
            setIsOpen={setIsOpen}
            valueSearch={valueSearch}
          />
        }
        content={renderContent()}
        className="search__dropdown"
      />
    </div>
  );
};
