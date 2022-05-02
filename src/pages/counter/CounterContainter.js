import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CounterButtons from './CounterButtons';
import { ApiClient } from '../../utils/ApiClient';
import { incrementAsync, selectCount } from '../../services/features/counter';
import Container from '../../components/layouts/Container';

const CounterContainer = () => {
  const count = useSelector(selectCount);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(incrementAsync(30));
  }, []);

  const client = new ApiClient('http://localhost');

  console.log(client.host);

  return (
    <Container header={'Counter'} subject={'Counter'}>
      <div>count: {count}</div>
      <CounterButtons />
    </Container>
  );
};

export default CounterContainer;