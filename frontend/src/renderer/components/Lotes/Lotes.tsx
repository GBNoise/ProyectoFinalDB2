import {
  faTractor,
  faUser,
  faWheatAlt,
} from '@fortawesome/free-solid-svg-icons';
import React, { useContext, useEffect, useState } from 'react';
import { globalContext } from 'renderer/contexts/globalContext';
import { colors, IconButtonProps } from 'renderer/types/types';
import axios from '../../axios';
import { TablePanel } from '../tablePanel';

const icons: IconButtonProps[] = [
  { color: colors.pinkAccent, size: '2x', icon: faUser, to: '/productores' },
  { color: colors.redAccent, size: '2x', icon: faTractor, to: '/finca' },
  { color: colors.salmonAccent, size: '2x', icon: faWheatAlt, to: '/other' },
];

export const Lotes = () => {
  const { state, dispatch } = useContext(globalContext);
  const [isLoading, setIsLoading] = useState(true);

  const getData = async () => {
    await axios
      .get('/lote')
      .then((res) => {
        dispatch({ type: 'setCurrentData', payload: res.data });
      })
      .catch((e) => console.log(e));

    await getDependencies();
    setIsLoading(false);
  };

  const getDependencies = async () => {
    await axios
      .get('/tipodesuelo')
      .then((res) =>
        dispatch({
          type: 'setDependencies',
          payload: { TipoDeSuelo: res.data.object.rows },
        })
      )
      .catch((e) => console.log(e));

    await axios
      .get('/tipoderiego')
      .then((res) =>
        dispatch({
          type: 'setDependencies',
          payload: { TipoDeRiego: res.data.object.rows },
        })
      )
      .catch((e) => console.log(e));

    await axios
      .get('/producto')
      .then((res) =>
        dispatch({
          type: 'setDependencies',
          payload: { Producto: res.data.object.rows },
        })
      )
      .catch((e) => console.log(e));

    await axios
      .get('/finca')
      .then((res) =>
        dispatch({
          type: 'setDependencies',
          payload: { Finca: res.data.object.rows },
        })
      )
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    getData();

    return () => dispatch({ type: 'dismiss dependencies' });
  }, []);

  return !isLoading ? (
    <TablePanel
      references={icons}
      data={state.currentData.object.rows}
      columns={state.currentData.object.columns}
      count={state.currentData.object.rows.length}
      icon={faUser}
      color={colors.salmonAccent}
      title="Lotes"
      endpoint="/lote"
      getData={getData}
    />
  ) : (
    <h1>Loading</h1>
  );
};
