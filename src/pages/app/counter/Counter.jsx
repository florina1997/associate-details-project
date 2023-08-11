import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Typography, Button } from "antd";
import { counterActions } from "./Store";

const { Title } = Typography;

const Counter = () => {
  const dispatch = useDispatch();
  const { count } = useSelector((state) => state.counter);

  const handleIncrement = () => {
    dispatch(counterActions.incrementCounter());
  };

  const handleDecrement = () => {
    dispatch(counterActions.decrementCounter());
  };

  return (
    <div>
      <Title>{count}</Title>
      <Button type="primary" onClick={handleIncrement}>
        Increment
      </Button>
      <Button type="primary" onClick={handleDecrement}>
        Decrement
      </Button>
    </div>
  );
};

export default Counter;
