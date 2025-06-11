/* eslint-disable no-var */
declare global {
  var mongoose:
    | {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        conn: any;
        promise: any;
      }
    | undefined;
}

export {};
