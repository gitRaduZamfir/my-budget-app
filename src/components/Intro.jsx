import { Form, useFetcher } from 'react-router-dom';
import { UserPlusIcon } from '@heroicons/react/24/solid';

function Intro() {
  const fetcher = useFetcher();
  const isSubmiting = fetcher.state === 'submitting';

  return (
    <div className="intro">
      <div>
        <h1>
          Tine-ti <span className="accent">Banii</span> sub control!
        </h1>
        <p>Ai grija de banii tai. Devino liber financiar acum!</p>
        <Form method="post">
          <input
            type="text"
            name="userName"
            required
            placeholder="Enter your name"
            aria-label="Your name"
            autoComplete="given-name"
          />
          <input type="hidden" name="_action" value="newUser" />
          <button
            type="submit"
            aria-label="submit form"
            className="btn btn--dark"
            disabled={isSubmiting}
          >
            <span>Creaza contul</span>
            <UserPlusIcon width={20} />
          </button>
        </Form>
      </div>
    </div>
  );
}

export default Intro;
