import { resolve } from "path";
import { bgCyan, black } from "kolorist";

export const port = parseInt(process.env.PORT || "") || 3303;

export const r = (...args: string[]) => resolve(__dirname, "..", ...args);

export const isDev: boolean = process.argv[2] === "dev";

export const isFirefox: boolean = !!process.env.FIREFOX;
export const isFirefoxInArg: boolean = process.argv.includes("--firefox");

export function log(name: string, message: string) {
  // eslint-disable-next-line no-console
  console.log(black(bgCyan(` ${name} `)), message);
}
