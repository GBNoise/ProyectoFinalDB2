import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-common-types';
import {
  faUser,
  faTractor,
  faWheatAlt,
} from '@fortawesome/free-solid-svg-icons';
import { colors } from '../../types/types';

interface icons {
  icon: IconDefinition;
  title: string;
  color: string;
}

const iconsArr: icons[] = [
  { icon: faUser, title: 'workers', color: colors.pinkAccent },
  { icon: faTractor, title: 'workers', color: colors.redAccent },
  { icon: faWheatAlt, title: 'workers', color: colors.salmonAccent },
];

export const Sidebar = () => {
  return (
    <ul className="sidebar">
      {iconsArr.map(({ icon, title, color }): JSX.Element => {
        return (
          <li style={{ background: color }}>
            <FontAwesomeIcon icon={icon} size="lg" />
            <p style={{ display: 'none' }}>{title}</p>
          </li>
        );
      })}
    </ul>
  );
};
