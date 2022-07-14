import { colors, IconButtonProps } from '../../types/types';
import { Container } from '../container/container';
import { IconButton } from '../iconButton';
import {
  faUser,
  faTractor,
  faWheatAlt,
} from '@fortawesome/free-solid-svg-icons';

const icons: IconButtonProps[] = [
  { color: colors.pinkAccent, size: '1x', icon: faUser },
  { color: colors.redAccent, size: '1x', icon: faTractor },
  { color: colors.salmonAccent, size: '1x', icon: faWheatAlt },
];

export const Home = (): JSX.Element => {
  return (
    <Container>
      <h1>Home</h1>
      <div className="home__icons">
        {icons.map(({ icon, size, color }) => {
          return <IconButton color={color} size={size} icon={icon} />;
        })}
      </div>
    </Container>
  );
};
