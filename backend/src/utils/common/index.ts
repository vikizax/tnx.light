import { inspect } from "util";

export const logs = (arg: any) => {
  if (process.env["ENVIRONMENT"] === "DEV")
    console.log(inspect(arg, false, null, false));
};
