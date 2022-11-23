import { Search } from "../../components/Search/Search";
import "./Empty.css";

export const Empty = () => {
  return (
    <div className="bg-black pt-5 mt-5">
      <div className="noMatches text-light">No matches...</div>
      <div>
        <Search />
      </div>
    </div>
  );
};
