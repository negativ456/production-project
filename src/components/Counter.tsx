import React, {useState} from 'react';
import classes from "./style.module.scss"
export const Counter = () => {
  const [count, setCount] = useState(0)
  return (
      <div>
        <h1>{count}</h1>
        <button className={classes.button} onClick={() => setCount(count + 1)}>inc</button>
      </div>
  );
};
