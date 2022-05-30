import { assign, createMachine } from "xstate";

type Context = { fahrenheit: number; celcius: number };
const counterMachine = createMachine<Context>({
  context: {
    celcius: 0,
    fahrenheit: 32,
  },
  initial: "active",
  states: { active: {} },
  on: {
    "EDIT.CELCIUS": [
      {
        cond: (_, evt) => isNaN(evt.value), // If the value isNan, then don't attempt the calculation.
        actions: assign({ celcius: (_, evt) => evt.value }),
      },
      {
        actions: assign({
          celcius: (_, evt) => +evt.value,
          fahrenheit: (_, evt) => +evt.value * (9 / 5) + 32,
        }),
      },
    ],
    "EDIT.FAHRENHEIT": [
      {
        cond: (_, evt) => isNaN(evt.value), // If the value isNan, then don't attempt the calculation.
        actions: assign({ fahrenheit: (_, evt) => evt.value }),
      },
      {
        actions: assign({
          fahrenheit: (_, evt) => +evt.value,
          celcius: (_, evt) => (+evt.value - 32) * (5 / 9),
        }),
      },
    ],
  },
});

export default counterMachine;
