import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useEffect } from 'react';
import { globalContext } from 'renderer/contexts/globalContext';
import { colors, InfoPanelProps } from 'renderer/types/types';
import { Container } from '../container/container';
import { DataTable } from '../dataTable';

export const InfoPanel: React.FC<InfoPanelProps> = (props): JSX.Element => {
  const { color, icon } = props;
  const { state, dispatch } = useContext(globalContext);

  useEffect(() => {
    return () => {
      dispatch({ type: 'dismiss currentID' });
    };
  }, []);

  return (
    <Container>
      <div className="infoPanel">
        <div className="infoPanel__profile" style={{ backgroundColor: color }}>
          <span className="infoPanel__icon">
            <FontAwesomeIcon icon={icon} size="4x" />
          </span>
          <span className="infoPanel__data">
            {Object.entries(state.currentData).map(([key, value]) => {
              return <p>{`${key}: ${value}`}</p>;
            })}
          </span>
        </div>
        <div className="infoPanel__references">
          <h1>Referenced In</h1>
          {Object.entries(state.references).map(([key, value]: [any, any]) => {
            return (
              <DataTable
                columns={value.columns}
                getData={value.getData}
                data={value.rows}
                endpoint={`/${key}`}
                color={colors.pinkAccent}
              />
            );
          })}
        </div>
      </div>
    </Container>
  );
};
