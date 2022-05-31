import { assign, createMachine } from "xstate";

type Context = {
  elapsed: number;
  duration: number;
  intervalMultiplier: number;
};
type Events =
  | { type: "UPDATE.DURATION"; value: number }
  | { type: "UPDATE.ELAPSED" }
  | { type: "RESET" };
type TypeStates =
  | { value: "paused"; context: Context }
  | { value: "playing"; context: Context };

const counterMachine = createMachine<Context, Events, TypeStates>({
  context: {
    elapsed: 0,
    duration: 5,
    intervalMultiplier: 0.1,
  },
  initial: "playing",
  states: {
    playing: {
      invoke: {
        src: (ctx) => (sendBack) => {
          const interval = setInterval(() => {
            sendBack({ type: "UPDATE.ELAPSED" });
          }, 1000 * ctx.intervalMultiplier);
          return () => {
            clearInterval(interval);
          };
        },
      },
      on: {
        "": {
          cond: (ctx) => ctx.elapsed >= ctx.duration,
          target: "paused",
        },
      },
    },
    paused: {
      on: {
        "": {
          cond: (ctx) => ctx.elapsed < ctx.duration,
          target: 'playing'
        }
      }
    },
  },
  on: {
    "UPDATE.DURATION": {
      actions: assign({
        duration: (_, evt) => evt.value
      })
    },
    "UPDATE.ELAPSED": {
      actions: assign({
        elapsed: (ctx) =>
          parseFloat((ctx.elapsed + ctx.intervalMultiplier).toFixed(2)),
      }),
    },
    RESET: {
      actions: assign({
        elapsed: (_) => 0,
      }),
    },
  },
});

export default counterMachine;
