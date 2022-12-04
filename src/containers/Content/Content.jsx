import "./Contento.css";
import { ContentGrid } from "../ContentGrid/ContentGrid";
import { useDebounce } from "../../hooks/useDebounce";
import { useQuery } from "../../hooks/useQuery";

export const Content = ({ title, type }) => {
  const query = useQuery();
  const search = query.get("search");

  const debouncedSearch = useDebounce(search, 400);


  return (
    
    <ContentGrid title={title} type={type} key={debouncedSearch} search={debouncedSearch} />
    
  );
};
