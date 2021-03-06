import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconButtonProps, SizesProps } from '../../types/types';
import { Link } from 'react-router-dom';

const sizes: SizesProps = {
  sm: { width: '150px', height: '170px' },
  '1x': { width: '170px', height: '190px' },
  '2x': { width: '190px', height: '210px' },
};

export const IconButton: React.FC<IconButtonProps> = (props): JSX.Element => {
  const { color, size, style, className, icon, to } = props;
  return (
    <Link
      to={to}
      className={`iconButton ${className ? className : ''}`}
      style={{ ...style, ...sizes[size], backgroundColor: color }}
    >
      <FontAwesomeIcon icon={icon} size="2x" />
    </Link>
  );
};
