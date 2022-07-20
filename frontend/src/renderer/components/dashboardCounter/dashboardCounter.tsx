import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { DashboardCounterProps } from '../../types/types';

export const DashboardCounter: React.FC<DashboardCounterProps> = (props) => {
  const { count, style, color, className, icon, title } = props;
  return (
    <div
      className={`dashboardCounter ${className}`}
      style={{ ...style, backgroundColor: color }}
    >
      <FontAwesomeIcon
        icon={icon}
        size="6x"
        className="dashboardCounter__icon"
      />
      <p>{count}</p>
      <h3>{title}</h3>
    </div>
  );
};
