import { faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useEffect, useState } from 'react';
import { globalContext } from 'renderer/contexts/globalContext';
import { ModalProps } from 'renderer/types/types';
import axios from '../../axios';

export const Modal: React.FC<ModalProps> = (props): JSX.Element => {
  const { state, dispatch } = useContext(globalContext);
  const { columns, endpoint, getData } = props;

  const [data, setData] = useState<object>(() => {
    return columns.reduce((prev: any, act, index) => {
      return index !== 1 ? { ...prev, [act]: '' } : { [act]: '' };
    });
  });

  const handleChange = (e: any) => {
    let value = e.target.value;
    const name = e.target.name;

    if (e.target.className === 'modal__select')
      value = value.replace(/:.*/, '');

    setData({ ...data, [name]: value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (state.modalAction === 'create')
      await axios
        .post(`${endpoint}/${state.modalAction}`, data)
        .then((res) => {
          console.log(res);
        })
        .catch((e) => {
          console.log(e);
        });
    else
      await axios
        .put(`${endpoint}/update`, {
          ...state.updateFields,
          ...data,
        })
        .then((res) => console.log(res))
        .catch((e) => console.log(e));

    await getData();

    dispatch({ type: 'close modal' });
  };

  return (
    <div className="modal">
      <FontAwesomeIcon
        onClick={() => dispatch({ type: 'close modal' })}
        className="modal__close"
        size="2x"
        icon={faClose}
      />
      <form className="modal__center" onSubmit={handleSubmit}>
        <h2>
          {state.modalAction === 'create' ? 'CREATE' : 'UPDATE'}{' '}
          {endpoint.replace('/', '').toUpperCase()}
        </h2>
        {columns.map((col, index) => {
          const isIDPresent = col === Object.keys(state.currentID)[0];
          if (isIDPresent) {
            const id = Object.values(state.currentID)[0];
            data[col] = id;
          }
          return (
            index > 0 && (
              <span className="modal__inputContainer">
                <label htmlFor={col}>{col}</label>
                {!col.includes('ID') || isIDPresent ? (
                  <input
                    type="text"
                    placeholder={
                      state.modalAction === 'create'
                        ? col
                        : state.updateFields[col]
                    }
                    value={data[col]}
                    onChange={handleChange}
                    name={col}
                    disabled={isIDPresent}
                  />
                ) : (
                  <select
                    className="modal__select"
                    onChange={handleChange}
                    name={col}
                    defaultValue="default"
                  >
                    <option value="default" hidden>
                      SELECT AN OPTION
                    </option>
                    {state.dependencies &&
                      state.dependencies[col.replace('ID', '')].map(
                        (item: any) => {
                          const arr = Object.values(item);
                          const id = arr[0];
                          const name = arr[1];
                          return (
                            <option style={{ color: 'black' }}>
                              {/* {JSON.stringify(item).replace(/({|"|})/gm, '')} */}
                              {`${id}: ${name}`}
                            </option>
                          );
                        }
                      )}
                  </select>
                )}
              </span>
            )
          );
        })}
        <button type="submit" className="modal__submit">
          {state.modalAction === 'create' ? 'CREATE' : 'UPDATE'}
        </button>
      </form>
    </div>
  );
};

// {!col.includes('ID') ? (
//   <input
//     type="text"
//     placeholder={
//       state.modalAction === 'create'
//         ? col
//         : state.updateFields[col]
//     }
//     value={data[col]}
//     onChange={handleChange}
//     name={col}
//   />
// ) : (
// <select style={{ color: 'black' }}>
//   {dependencies &&
//     dependencies[
//       col.replace('ID', '').toLowerCase()
//     ].object.rows.map((item: any) => {
//       return (
//         <option>
//           {JSON.stringify(item).replace(/({|"|})/gm, '')}
//         </option>
//       );
//     })}
// </select>
// )}
