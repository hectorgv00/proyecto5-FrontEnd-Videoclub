import "./Search.css";
import { ImSearch } from "react-icons/im";
import { useSearchParams } from "react-router-dom";

export const Search = () => {
  const [searchText, setSearchText] = useSearchParams("");
  const search = searchText.get("search");

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form className="searchForm  bg-black" onSubmit={handleSubmit}>
      <div className="searchBox ">
        <input
          autoFocus
          className="searchInput"
          type="text"
          placeholder="Search..."
          value={search ?? ""}
          onChange={(e) =>
            setSearchText({
              search: e.target.value,
            })
          }
        />
        <button className="searchButton" type="submit">
          <ImSearch size={20} />
        </button>
      </div>
    </form>
  );
};
