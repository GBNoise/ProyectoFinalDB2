import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-common-types';
import {
  faUser,
  faTractor,
  faWheatAlt,
} from '@fortawesome/free-solid-svg-icons';
import { colors } from '../../types/types';
import { Link } from 'react-router-dom';

interface icons {
  icon: IconDefinition;
  title: string;
  color: string;
  to: string;
}

const iconsArr: icons[] = [
  {
    icon: faUser,
    title: 'productores',
    color: colors.pinkAccent,
    to: '/productores',
  },
  { icon: faTractor, title: 'workers', color: colors.redAccent, to: '/finca' },
  { icon: faWheatAlt, title: 'workers', color: colors.salmonAccent, to: '/' },
];

export const Sidebar = () => {
  return (
    <ul className="sidebar">
      {iconsArr.map(({ icon, title, color, to }): JSX.Element => {
        return (
          <li style={{ background: color }}>
            <Link to={to} className="sidebar__link">
              <FontAwesomeIcon icon={icon} size="lg" />
              <p style={{ display: 'none' }}>{title}</p>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};
