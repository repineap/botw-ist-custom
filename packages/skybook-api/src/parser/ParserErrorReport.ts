// This file was generated by [ts-rs](https://github.com/Aleph-Alpha/ts-rs). Do not edit this file manually.
import type { ParserError } from "./ParserError";

export type ParserErrorReport = {
    span: [number, number];
    isWarning: boolean;
    error: ParserError;
};
