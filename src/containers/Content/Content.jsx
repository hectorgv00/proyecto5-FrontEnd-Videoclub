import './Content.css';
import { ContentGrid } from '../ContentGrid/ContentGrid';
import { useDebounce } from '../../hooks/useDebounce';
import { useQuery } from '../../hooks/useQuery';


export const Content = ({ title, url }) => {

  const query = useQuery();
  const search = query.get("search");

  const debouncedSearch = useDebounce(search, 400);

  // const axiosFn = () => console.log(url);

  return <ContentGrid title={title} key={debouncedSearch} search={debouncedSearch} />
   
};
