import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext } from 'react';
import { DataTableProps } from '../../types/types';
import { Modal } from '../modal';
import { globalContext } from 'renderer/contexts/globalContext';
import axios from '../../axios';
import { useNavigate } from 'react-router-dom';

export const DataTable: React.FC<DataTableProps> = (props): JSX.Element => {
  const { data, columns, endpoint, getData, color } = props;
  const { state, dispatch } = useContext(globalContext);
  const navigate = useNavigate();

  const handleDelete = async (id: number) => {
    await axios
      .delete(`${endpoint}/delete/${id}`)
      .then((res) => console.log(res))
      .catch((e) => console.log(e));

    await getData();
  };

  return (
    <div className="dataTableContainer">
      <ul className="dataTable">
        <li className="dataTable__columns">
          {columns.map((column) => {
            return <span className="dataTable__column">{column}</span>;
          })}
        </li>
        {data.map((object) => {
          return (
            <li
              onClick={() =>
                navigate(`${endpoint}/${Object.values(object)[0]}`)
              }
            >
              {Object.entries(object).map(([key, value], i) => (
                <span>
                  {value}

                  {i === Object.keys(object).length - 1 && (
                    <span>
                      <FontAwesomeIcon
                        icon={faPen}
                        size="sm"
                        className="dataTable__btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          dispatch({
                            type: 'open modal',
                            payload: { action: 'update', update: object },
                          });
                        }}
                      />
                      <FontAwesomeIcon
                        icon={faTrash}
                        size="sm"
                        className="dataTable__btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(Object.values(object)[0]);
                        }}
                      />
                    </span>
                  )}
                </span>
              ))}
            </li>
          );
        })}
      </ul>
      <button
        className="dataTableContainer__create"
        style={{ backgroundColor: color }}
        onClick={() => dispatch({ type: 'open modal', payload: 'create' })}
      >
        CREATE
      </button>
      {state.isModalOpen && (
        <Modal columns={columns} endpoint={endpoint} getData={getData} />
      )}
    </div>
  );
};
