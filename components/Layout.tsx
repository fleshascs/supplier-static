import NavBar from './NavBar';
import Footer from './Footer';

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <>
      <NavBar />
      <main className='min-h-screen container'>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
