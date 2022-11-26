import { useSelector } from 'react-redux';
import { contentData } from '../../slices/contentSlice';
import './LoanDetails.css';

export const LoanDetails = ( ) => {
  

  const content = useSelector(contentData);
  console.log(content);


  return (
    <div>LoanDetails
    </div>
  )
}
