import { LoanCard } from '../LoanCard/LoanCard';
import './SeriesLoans.css';
import Button from '../../components/Button/Button';
import { useNavigate } from 'react-router-dom';
import CyberButton from '../../components/CyberButton/CyberButton';

export const SeriesLoans = ({ series }) => {

  const navigate = useNavigate();

  return (
    <div className="contentRented">
            <h1 className='seriesHeader'>Series</h1>
            {series.length > 0 ? (
              <ul className="contentGrid">
                {series?.map((serie) => (
                  <LoanCard key={serie.id_loan} content={serie} />
                ))}
              </ul>
            ) : (
              <div className='d-flex justify-content-center align-items-center flex-column'>
                <p>You don't have series yet... check out our colecction</p>
                {/* <Button
                  text={"Series"}
                  onClick={() => navigate("/series")}
                  className={
                    "fs-3 text-light buttonDesign d-flex align-items-center bgPurple justify-content-center ms-3"
                  }
                /> */}
                <CyberButton text={"Series"} onClick={()=>navigate("/series")}/>
              </div>
            )}
          </div>
  )
}
