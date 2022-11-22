import './Content.css';
import { ContentGrid } from '../ContentGrid/ContentGrid';
import { useDebounce } from '../../hooks/useDebounce';
import { useQuery } from '../../hooks/useQuery';
import { Search } from '../../components/Search/Search';


export const Content = () => {

  // TODO: movies or series
  
  const query = useQuery();
  const search = query.get("search");

  const debouncedSearch = useDebounce(search, 400);

  return (
    // tip: passing key component reset its state
    <>
    {/* <Search className="mt-5"/> */}
    <ContentGrid key={debouncedSearch} search={debouncedSearch} />
    </>
  );
};
