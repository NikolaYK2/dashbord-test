import "react-router";

declare module "react-router" {
  interface Register {
    params: Params;
  }
}

type Params = {
  "/": {};
  "/finalized/:testId": {
    "testId": string;
  };
  "/result/:testId": {
    "testId": string;
  };
};