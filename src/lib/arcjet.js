
import arcjet, { shield, detectBot, tokenBucket } from "@arcjet/node";
import { ENV } from "./env.js";

export const aj = arcjet({
  key: ENV.ARCJET_KEY,

  characteristics: [  "http.request.headers.x-forwarded-for",
 , "http.request.headers.user-agent"],

  rules: [
    shield({ mode: "LIVE" }),

    detectBot({
      mode: "LIVE",
      allow: ["CATEGORY:SEARCH_ENGINE",
                "CATEGORY:PREVIEW",
        "CATEGORY:MONITOR",

      ],
    }),

    tokenBucket({
      mode: "LIVE",
      refillRate: 5,
      interval: 10,
      capacity: 10,
    }),
  ],
});
 export default aj;
