import {
  colors,
  IconButtonProps,
  DashboardCounterProps,
} from '../../types/types';
import { Container } from '../container/container';
import { IconButton } from '../iconButton';
import {
  faUser,
  faTractor,
  faWheatAlt,
} from '@fortawesome/free-solid-svg-icons';
import { DashboardCounter } from '../dashboardCounter';

const icons: IconButtonProps[] = [
  { color: colors.pinkAccent, size: '2x', icon: faUser, to: '/productores' },
  { color: colors.redAccent, size: '2x', icon: faTractor, to: '/finca' },
  { color: colors.salmonAccent, size: '2x', icon: faWheatAlt, to: '/other' },
];

export const Home = (): JSX.Element => {
  return (
    <Container>
      <h1>Home</h1>
      <div className="home__icons">
        {icons.map(({ icon, size, color, to }) => {
          return <IconButton color={color} size={size} icon={icon} to={to} />;
        })}
      </div>
      {/* <div className="home__dashboard">
        {dashboard.map((db) => {
          return (
            <DashboardCounter
              count={db.count}
              icon={db.icon}
              color={db.color}
            />
          );
        })}
      </div> */}
    </Container>
  );
};
