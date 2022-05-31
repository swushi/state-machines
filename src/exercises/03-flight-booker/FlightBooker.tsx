import { useMachine } from "@xstate/react";
import flightBookerMachine from "./flightBookerMachine";

const FlightBooker = () => {
  const [state, send] = useMachine(flightBookerMachine);

  console.log({value: state.value, context: state.context})

console.log('canSubmit', state.can({type: "SUBMIT"}))

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <select
        value={state.context.type}
        onChange={(e) =>
          send({
            type: "EDIT.TYPE",
            value: e.target.value as "oneway" | "return",
          })
        }
      >
        <option value="oneway">One-way Flight</option>
        <option value="return">Return Flight</option>
      </select>
      <input
        type="date"
        placeholder="04.08.1998"
        value={state.context.departure}
        onChange={(e) =>
          send({ type: "EDIT.DEPARTURE", value: e.target.value })
        }
      />
      <input
        disabled={!state.can({ type: "EDIT.RETURN", value: "" })}
        type="date"
        placeholder="04.08.1998"
        value={state.context.return}
        onChange={(e) => send({ type: "EDIT.RETURN", value: e.target.value })}
      />
      <button
        disabled={!state.can({ type: "SUBMIT" })}
        onClick={() => send({ type: "SUBMIT" })}
      >
        Submit
      </button>
    </div>
  );
};

export default FlightBooker;
