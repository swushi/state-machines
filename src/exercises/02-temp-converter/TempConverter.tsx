import { useMachine } from "@xstate/react";
import tempConverterMachine from "./tempConverterMachine";

const Counter = () => {
  const [state, send] = useMachine(tempConverterMachine);

  console.log(state.value, state.context)

  return (
    <div className="container">
      <input
        type="text"
        value={state.context.celcius}
        onChange={(e) => send({ type: "EDIT.CELCIUS", value: e.target.value })}
      />
      {" Celcius = "}
      <input
        type="text"
        value={state.context.fahrenheit}
        onChange={(e) => send({ type: "EDIT.FAHRENHEIT", value: e.target.value })}
      />
      {" Fahrenheit"}
    </div>
  );
};

export default Counter;
