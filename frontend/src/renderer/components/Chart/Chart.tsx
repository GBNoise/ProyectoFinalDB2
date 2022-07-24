import React from 'react';
import chart from './chart.svg';
import { Container } from '../container/container';

export const Chart: React.FC = (): JSX.Element => {
  return (
    <Container>
      <img src={chart} alt="chart" />
    </Container>
  );
};
