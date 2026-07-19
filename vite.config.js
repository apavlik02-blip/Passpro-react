import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { generateScript, synthesizeSpeech } from "./server/audioBrief/handlers.ts";

function readJsonBody(req) {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
    });
    req.on("end", () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (error) {
        reject(error);
      }
    });
    req.on("error", reject);
  });
}

function audioBriefDevApi(env) {
  return {
    name: "audio-brief-dev-api",
    configureServer(server) {
      server.middlewares.use("/api/generate-script", async (req, res, next) => {
        if (req.method !== "POST") {
          return next();
        }

        try {
          const { weakSpots } = await readJsonBody(req);
          if (!Array.isArray(weakSpots) || weakSpots.length === 0) {
            res.statusCode = 400;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({ error: "weakSpots array is required" }));
            return;
          }

          const apiKey = env.ANTHROPIC_API_KEY;
          if (!apiKey) {
            res.statusCode = 500;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({ error: "ANTHROPIC_API_KEY is not configured" }));
            return;
          }

          const scriptText = await generateScript(weakSpots, apiKey);
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify({ scriptText }));
        } catch {
          res.statusCode = 500;
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify({ error: "Failed to synthesize script framework" }));
        }
      });

      server.middlewares.use("/api/audio-brief", async (req, res, next) => {
        if (req.method !== "POST") {
          return next();
        }

        try {
          const { scriptText } = await readJsonBody(req);
          if (!scriptText || typeof scriptText !== "string") {
            res.statusCode = 400;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({ error: "scriptText is required" }));
            return;
          }

          const apiKey = env.OPENAI_API_KEY;
          if (!apiKey) {
            res.statusCode = 500;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({ error: "OPENAI_API_KEY is not configured" }));
            return;
          }

          const buffer = await synthesizeSpeech(scriptText, apiKey);
          res.statusCode = 200;
          res.setHeader("Content-Type", "audio/mpeg");
          res.setHeader("Content-Disposition", 'inline; filename="daily_brief.mp3"');
          res.end(buffer);
        } catch {
          res.statusCode = 500;
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify({ error: "Audio processing engine down" }));
        }
      });
    },
  };
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [react(), tailwindcss(), audioBriefDevApi(env)],
  };
});
