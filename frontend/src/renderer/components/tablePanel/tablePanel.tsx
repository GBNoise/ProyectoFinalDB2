import React, { useContext } from 'react';
import { globalContext } from 'renderer/contexts/globalContext';
import { TablePanelProps } from 'renderer/types/types';
import { Container } from '../container/container';
import { DashboardCounter } from '../dashboardCounter';
import { DataTable } from '../dataTable';
import { IconButton } from '../iconButton';

export const TablePanel: React.FC<TablePanelProps> = (props): JSX.Element => {
  const {
    data,
    columns,
    references,
    count,
    icon,
    color,
    title,
    endpoint,
    getData,
    dependencies,
  } = props;
  const { state, dispatch } = useContext(globalContext);

  return (
    <>
      <Container>
        <div className="productores">
          <div className="stats">
            <DashboardCounter
              count={count}
              icon={icon}
              color={color}
              title={title}
            />
          </div>

          <div className="dataTableContainer">
            <DataTable
              data={data}
              columns={columns}
              endpoint={endpoint}
              getData={getData}
              dependencies={dependencies}
            />
            <button
              className="dataTableContainer__create"
              style={{ backgroundColor: color }}
              onClick={() =>
                dispatch({ type: 'open modal', payload: 'create' })
              }
            >
              CREATE
            </button>
          </div>

          <div className="references">
            {references.map(({ color, size, icon, to }) => {
              return (
                <IconButton color={color} size={size} icon={icon} to={to} />
              );
            })}
          </div>
        </div>
      </Container>
    </>
  );
};
