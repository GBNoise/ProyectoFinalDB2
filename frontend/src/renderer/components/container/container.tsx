import React from 'react';

export const Container = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  return <div className="container">{children}</div>;
};
