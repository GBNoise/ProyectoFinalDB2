import axios from '../../axios';
import React, { useContext, useEffect, useState } from 'react';
import { globalContext } from 'renderer/contexts/globalContext';
import { useSearchDelay } from 'renderer/hooks';
import { ServerResponse, TablePanelProps } from 'renderer/types/types';
import { Container } from '../container/container';
import { DashboardCounter } from '../dashboardCounter';
import { DataTable } from '../dataTable';
import { IconButton } from '../iconButton';
import { useNavigate } from 'react-router-dom';

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
  } = props;
  // const { state, dispatch } = useContext(globalContext);
  const [search, setSearch] = useState('');
  const value = useSearchDelay(search, 1000);
  const [searchData, setSearchData] = useState<ServerResponse>(
    {} as ServerResponse
  );
  const handleChange = (e: any) => setSearch(e.target.value);
  const navigate = useNavigate();

  const getSearchData = async () => {
    if (!search) return;
    axios
      .get(`${endpoint}/nombre/${search}`)
      .then((res) => setSearchData(res.data))
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    getSearchData();
  }, [value]);

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
            <div className="search">
              <input
                type="text"
                placeholder="search"
                spellCheck={false}
                onChange={handleChange}
                style={{ backgroundColor: color }}
              />
              {searchData.object && (
                <ul className="search__list" style={{ backgroundColor: color }}>
                  {searchData.object.rows.map((row: any) => {
                    const id = Object.values(row)[0];
                    return (
                      <li onClick={() => navigate(`${endpoint}/${id}`)}>
                        {id}: {row['Nombre']}
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          </div>

          <DataTable
            data={data}
            columns={columns}
            endpoint={endpoint}
            getData={getData}
            color={color}
          />

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
