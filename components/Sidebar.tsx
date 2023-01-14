import { FC, ReactNode } from 'react';
import AdSense from 'react-adsense';
import { ListGroup, ListGroupItem } from './ListGroup';
import Image from './Image';
import Card from './Card';

export interface SidebarProps {
  children?: ReactNode;
}

const Sidebar: FC<SidebarProps> = ({ children }) => {
  return (
    <>
      <Card>Sidebar</Card>
      <AdSense.Google
        client='ca-pub-3219722052726085'
        slot='4021017786'
        style={{ display: 'block' }}
        format='auto'
        responsive='true'
        layoutKey='-gw-1+2a-9x+5c'
      />
      {children}
    </>
  );
};
export default Sidebar;
