import {Search} from '../../components/Search/Search';
import './Empty.css';

export const Empty = () => {
  return (
    <>
    <Search />
    <div className='noMatches'>No matches...</div>
    </>
  )
}
