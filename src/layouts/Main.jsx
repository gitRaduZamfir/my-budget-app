import { Outlet, useLoaderData } from 'react-router-dom';
import { fetchData } from '../helpers';

import wave from '../assets/wave.svg';
import Nav from '../components/Nav';

export function mainLoader() {
  const userName = fetchData('userName');
  return { userName };
}

function Main() {
  const { userName } = useLoaderData();
  return (
    <div className={`${!userName ? 'layout-home' : 'layout'} `}>
      <Nav className="nav-menu" userName={userName} />
      <main className="main-bg">
        <Outlet />
      </main>
    </div>
  );
}

export default Main;
