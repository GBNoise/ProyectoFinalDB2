import {
  faTractor,
  faUser,
  faWheatAlt,
} from '@fortawesome/free-solid-svg-icons';
import { IconButtonProps, colors } from 'renderer/types/types';
import { useState, useEffect, useContext } from 'react';
import axios from '../../axios';
import { TablePanel } from '../tablePanel';
import { globalContext } from 'renderer/contexts/globalContext';

const icons: IconButtonProps[] = [
  { color: colors.pinkAccent, size: '2x', icon: faUser, to: '/productores' },
  { color: colors.redAccent, size: '2x', icon: faTractor, to: '/finca' },
  { color: colors.salmonAccent, size: '2x', icon: faWheatAlt, to: '/lote' },
];

export const Finca = () => {
  const { state, dispatch } = useContext(globalContext);
  const [isLoading, setIsLoading] = useState(true);

  const getData = async () => {
    await axios
      .get('/finca')
      .then(async (res) => {
        dispatch({ type: 'setCurrentData', payload: res.data });
      })
      .catch((e) => console.log(e));


    await getDependencies();
    setIsLoading(false);
  };

  const getDependencies = async () => {
    await axios
      .get('/productor')
      .then((res) =>
        dispatch({
          type: 'setDependencies',
          payload: { Productor: res.data.object.rows },
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
      color={colors.redAccent}
      title="Fincas"
      endpoint="/finca"
      getData={getData}
    />
  ) : (
    <h1>Loading</h1>
  );
};
