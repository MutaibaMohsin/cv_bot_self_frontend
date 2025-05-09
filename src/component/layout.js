import { Outlet } from 'react-router-dom';
import PrimarySearchAppBar from './appbar';

const Layout = () => {
  return (
      <div>
        <PrimarySearchAppBar />
        <main style={{ flex: 1, padding: '30px' }}>
          <Outlet />
        </main>
      </div>
  );
};

export default Layout;