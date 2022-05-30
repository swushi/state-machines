import { assign, createMachine } from "xstate";

type Context = { count: number }
const counterMachine = createMachine<Context>({
  context: {
    count: 0,
  },
  initial: 'active',
  states: { active: {} },
  on: {
    INC: {
      actions: assign({
        count: (ctx) => ctx.count + 1
      })
    }
  }
})

export default counterMachine