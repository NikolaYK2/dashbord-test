import "react-router";

declare module "react-router" {
  interface Register {
    params: Params;
  }
}

type Params = {
  "/": {};
  "/finalize/:testId": {
    "testId": string;
  };
  "/results/:testId": {
    "testId": string;
  };
};