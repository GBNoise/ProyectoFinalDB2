import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../../axios';
import { globalContext } from 'renderer/contexts/globalContext';
import { InfoPanel } from '../infoPanel';
import { colors } from 'renderer/types/types';
import { faUser } from '@fortawesome/free-solid-svg-icons';

export const Productor = () => {
  const { productorID } = useParams();
  const { state, dispatch } = useContext(globalContext);
  const [isLoading, setIsLoading] = useState(true);

  const getData = async () => {
    await axios
      .get(`productor/${productorID}`)
      .then((res) => {
        dispatch({ type: 'setCurrentData', payload: res.data.object.rows[0] });
      })
      .catch((e) => console.log(e));

    await getFinca();

    setIsLoading(false);
  };

  const getFinca = async () => {
    await axios
      .get(`finca/productor/${productorID}`)
      .then((res) => {
        dispatch({
          type: 'setReferences',
          payload: {
            finca: {
              rows: res.data.object.rows,
              columns: res.data.object.columns,
              getData: getFinca,
            },
          },
        });
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    getData();
    dispatch({ type: 'setCurrentID', payload: { ProductorID: productorID } });
  }, []);

  return !isLoading ? (
    <InfoPanel color={colors.pinkAccent} icon={faUser} />
  ) : (
    <h1>Loading</h1>
  );
};

// <Container>
//       {Object.entries(state.currentData).map(([key, value]) => {
//         return <h1>{`${key}: ${value}`}</h1>;
//       })}
//     </Container>
