import { inspect } from "util";

export const logs = (arg: any) => {
  // if (process.env["ENVIRONMENT"] === "DEV")c
  console.log(inspect(arg, false, null, false));
};
