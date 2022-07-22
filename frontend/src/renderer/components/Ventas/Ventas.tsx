import {
  faTractor,
  faUser,
  faWheatAlt,
} from '@fortawesome/free-solid-svg-icons';
import { colors, IconButtonProps } from 'renderer/types/types';
import { useContext, useEffect, useState } from 'react';
import axios from '../../axios';
import { TablePanel } from '../tablePanel';
import { globalContext } from 'renderer/contexts/globalContext';

const icons: IconButtonProps[] = [
  { color: colors.pinkAccent, size: '2x', icon: faUser, to: '/productores' },
  { color: colors.redAccent, size: '2x', icon: faTractor, to: '/finca' },
  { color: colors.salmonAccent, size: '2x', icon: faWheatAlt, to: '/lote' },
];

export const Ventas = () => {
  const { state, dispatch } = useContext(globalContext);
  const [isLoading, setIsLoading] = useState(true);

  const getData = async () => {
    await axios
      .get('/venta')
      .then((res) => {
        console.log(res);
        dispatch({ type: 'setCurrentData', payload: res.data });
      })
      .catch((e) => console.log(e));

    await getDependencies();
    setIsLoading(false);
  };

  const getDependencies = async () => {
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
      .get('/proveedor')
      .then((res) =>
        dispatch({
          type: 'setDependencies',
          payload: { Proveedor: res.data.object.rows },
        })
      )
      .catch((e) => console.log(e));
    await axios
      .get('/cliente')
      .then((res) =>
        dispatch({
          type: 'setDependencies',
          payload: { Cliente: res.data.object.rows },
        })
      )
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    getData();
  }, []);

  return !isLoading ? (
    <TablePanel
      references={icons}
      data={state.currentData.object.rows}
      columns={state.currentData.object.columns}
      count={state.currentData.object.rows.length}
      icon={faUser}
      color={colors.pinkAccent}
      title="Ventas"
      endpoint="/venta"
      getData={getData}
    />
  ) : (
    <h1>Loading</h1>
  );
};
