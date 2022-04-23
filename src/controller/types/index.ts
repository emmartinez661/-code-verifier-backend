import { NodeWorker } from "inspector";
import { TimerOptions } from "timers";

/**
 *  Basic JSON response for Controllers
 */
export type BasicResponse = {
  message: string;
}

/**
 * Response for controller GoodByeController
 */
export type GoodByeResponse = {
  message: string,
  datetime: string
}

/**
 *  Error JSON response for Controllers
 */
export type ErrorResponse = {
    error: string,
    message: string;
}
