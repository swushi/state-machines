import { assign, createMachine } from "xstate";

type Context = { type: "oneway" | "return"; departure: string; return: string };
type Events =
  | { type: "EDIT.TYPE"; value: Context["type"] }
  | { type: "EDIT.DEPARTURE"; value: string }
  | { type: "EDIT.RETURN"; value: string }
  | { type: "SUBMIT" };

type TypeStates = {
  value: "editing";
  context: Context;
};

const counterMachine = createMachine<Context, Events, TypeStates>({
  context: {
    type: "oneway",
    departure: "",
    return: "",
  },
  initial: "editing",
  states: {
    editing: {
      on: {
        "EDIT.TYPE": {
          actions: [
            assign({
              type: (_, evt) => evt.value,
            }),
          ],
        },
        "EDIT.DEPARTURE": {
          actions: [
            assign({
              departure: (_, evt) => evt.value,
            }),
          ],
        },
        "EDIT.RETURN": {
          actions: [
            assign({
              return: (_, evt) => evt.value,
            }),
          ],
          cond: (ctx) => ctx.type === "return",
        },
        SUBMIT: {
          target: "submit",
          cond: (ctx) =>
            Boolean(
              (ctx.type === "oneway" && ctx.departure) ||
                (ctx.departure && ctx.return)
            ),
          actions: (ctx) => {
            const prefix = `You have successfully booked on ${ctx.departure}`;
            const message =
              ctx.type === "oneway"
                ? prefix + "."
                : prefix + ` - ${ctx.return}.`;
            alert(message);
          },
        },
      },
    },
    submit: {},
  },
});

export default counterMachine;
