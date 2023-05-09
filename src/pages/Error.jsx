import { Link, useNavigate, useRouteError } from 'react-router-dom';
import { HomeIcon, ArrowUturnLeftIcon } from '@heroicons/react/24/solid';

function Error() {
  const error = useRouteError();
  const navigate = useNavigate();

  return (
    <div className="error">
      <h1>Avem o problema!</h1>
      <p>{error.message || error.statusText}</p>
      <div className="flex-md">
        <button className="btn btn--dark" onClick={() => navigate(-1)}>
          <ArrowUturnLeftIcon width={20} />
          <span>Go back</span>
        </button>
        <button>
          <Link to="/" className="btn btn--dark">
            <HomeIcon width={20} />
            <span>Go Home</span>
          </Link>
        </button>
      </div>
    </div>
  );
}

export default Error;
