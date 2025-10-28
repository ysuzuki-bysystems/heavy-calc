import { calc } from "@/lib/calc";

addEventListener("message", (event) => {
  const data = event.data;
  if (typeof data !== "number") {
    throw new Error();
  }

  (async () => {
    calc(data);
    postMessage("DONE");
  })();
});
