"use client";

import { useEffect } from "react";


declare global {
  interface Window {
    voiceflow?: {
      chat: {
        load: (config: {
          verify: { projectID: string };
          url: string;
          versionID: string;
          voice: { url: string };
        }) => void;
      };
    };
  }
}

const HrBot = () => {
  useEffect(() => {
    if (!document.getElementById("voiceflow-floating-widget")) {
      const script = document.createElement("script");
      script.id = "voiceflow-floating-widget";
      script.type = "text/javascript";
      script.src = "https://cdn.voiceflow.com/widget-next/bundle.mjs";
      script.async = true;

      script.onload = () => {
        window.voiceflow?.chat?.load({
          verify: { projectID: "680691e9e18668c083d4d176" },
          url: "https://general-runtime.voiceflow.com",
          versionID: "production",
          voice: { url: "https://runtime-api.voiceflow.com" },
        });
      };

      document.body.appendChild(script);
    }
  }, []);

  return null; 
};

export default HrBot;
