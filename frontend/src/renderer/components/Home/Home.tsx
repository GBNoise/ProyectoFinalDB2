import { colors, IconButtonProps } from '../../types/types';
import { Container } from '../container/container';
import { IconButton } from '../iconButton';
import {
  faTractor,
  faUser,
  faWheatAlt,
} from '@fortawesome/free-solid-svg-icons';

const icons: IconButtonProps[] = [
  { color: colors.pinkAccent, size: '2x', icon: faUser, to: '/productores' },
  { color: colors.redAccent, size: '2x', icon: faTractor, to: '/finca' },
  { color: colors.salmonAccent, size: '2x', icon: faWheatAlt, to: '/lote' },
  { color: colors.pinkAccent, size: '2x', icon: faUser, to: '/chart' },
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
    </Container>
  );
};
