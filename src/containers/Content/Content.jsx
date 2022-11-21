import './Content.css';
import { ContentGrid } from './ContentGrid';
import { useDebounce } from './hooks/useDebounce';
import { useQuery } from './hooks/useQuery';

export const Content = () => {

  // TODO: movies or series
  
  const query = useQuery();
  const search = query.get("search");

  const debouncedSearch = useDebounce(search, 400);

  return (
    // tip: passing key component reset its state
    <ContentGrid key={debouncedSearch} search={debouncedSearch} />
  );
};
