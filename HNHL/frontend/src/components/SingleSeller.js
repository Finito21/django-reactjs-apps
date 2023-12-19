import { Link } from 'react-router-dom';
import { useContext } from 'react';

function SingleSeller(props) {
  return (
    <div className='col-12 col-md-3 mb-4'>
      <div className="card text-center">
        <Link to={`/seller/${props.seller.user.username}/${props.seller.id}`}>
          <img src={props.seller.profile_img} className="card-img-top" alt={props.seller.user.username} 
          />
        </Link>
        <div className="card-body text-center">
          <h4 className="card-title" style={{ marginBottom: '10px' }}>
            <Link
              to={`/seller/${props.seller.user.username}/${props.seller.id}`}
              style={{ textDecoration: 'none', color: 'black' }}
            >
              {props.seller.user.username}
            </Link>
          </h4>
        </div>
      </div>
    </div>
  );
}

export default SingleSeller;
