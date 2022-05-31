import { useMachine } from "@xstate/react";
import timerMachine from "./timerMachine";

const Timer = () => {
  const [state, send] = useMachine(timerMachine);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <progress value={state.context.elapsed} max={state.context.duration} />
      <label>{state.context.elapsed + "s"}</label>
      <input
        type="range"
        max={30}
        value={state.context.duration}
        onChange={(e) =>
          send({ type: "UPDATE.DURATION", value: parseFloat(e.target.value) })
        }
      />
      <button onClick={() => send('RESET')} >reset</button>
    </div>
  );
};

export default Timer;
