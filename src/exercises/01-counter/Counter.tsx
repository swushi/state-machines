import { useMachine } from "@xstate/react";
import counterMachine from "./counterMachine";

const Counter = () => {
  const [state, send] = useMachine(counterMachine);

  return (
    <div>
      <input type='text' value={state.context.count} readOnly />
      <button onClick={() => send('INC')} >Count</button>
    </div>
  );
};

export default Counter;
