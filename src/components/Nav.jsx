import { Form, NavLink } from 'react-router-dom';
import logomark from '../assets/logomark.svg';
import { TrashIcon } from '@heroicons/react/24/solid';

function Nav({ userName }) {
  return (
    <nav>
      <NavLink to="/" aria-label="Go to Home">
        <img src={logomark} alt="logomark-img" height={30} />
        <span>My Budget App</span>
      </NavLink>
      {userName && (
        <Form
          method="post"
          action="/logout"
          onSubmit={(event) => {
            if (!window.confirm('Sterge utilizatorul si toate datele?')) {
              event.preventDefault();
            }
          }}
        >
          <button type="submit" className="btn btn--warning">
            <span>Sterge Utilizatorul</span>
            <TrashIcon width={20} />
          </button>
        </Form>
      )}
    </nav>
  );
}

export default Nav;
