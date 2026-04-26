import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import session from "express-session";
import cookieParser from "cookie-parser";
import axios from "axios";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());
  app.use(cookieParser());
  app.use(
    session({
      secret: "kayan-code-secret-key-12345",
      resave: false,
      saveUninitialized: false,
      cookie: {
        secure: true, // Required for SameSite=None
        sameSite: "none", // Required for cross-origin iframe
        httpOnly: true,
      },
    })
  );

  // API Routes
  
  // 1. Get GitHub OAuth URL
  app.get("/api/auth/github/url", (req, res) => {
    const origin = req.headers.origin || `https://${req.headers.host}`;
    const redirectUri = `${origin}/auth/github/callback`;
    
    const params = new URLSearchParams({
      client_id: process.env.GITHUB_CLIENT_ID || "",
      redirect_uri: redirectUri,
      scope: "repo,user",
      state: Math.random().toString(36).substring(7),
    });

    res.json({ url: `https://github.com/login/oauth/authorize?${params.toString()}` });
  });

  // 2. GitHub Callback handler
  app.get(["/auth/github/callback", "/auth/github/callback/"], async (req, res) => {
    const { code } = req.query;
    
    if (!code) {
      return res.send("No code provided");
    }

    try {
      const response = await axios.post(
        "https://github.com/login/oauth/access_token",
        {
          client_id: process.env.GITHUB_CLIENT_ID,
          client_secret: process.env.GITHUB_CLIENT_SECRET,
          code,
        },
        {
          headers: {
            Accept: "application/json",
          },
        }
      );

      const data = response.data;
      if (data.access_token) {
        // In a real app, we'd store this in a database or secure session
        // For the demo/preview, we'll pass it back to the client via postMessage
        res.send(`
          <html>
            <body>
              <script>
                if (window.opener) {
                  window.opener.postMessage({ 
                    type: 'GITHUB_AUTH_SUCCESS', 
                    accessToken: '${data.access_token}' 
                  }, '*');
                  window.close();
                } else {
                  window.location.href = '/';
                }
              </script>
              <div style="font-family: sans-serif; text-align: center; margin-top: 50px;">
                <h2>تم الاتصال بنجاح!</h2>
                <p>يتم الآن غلق هذه النافذة...</p>
              </div>
            </body>
          </html>
        `);
      } else {
        res.status(500).send("Failed to exchange code for token: " + JSON.stringify(data));
      }
    } catch (error) {
      console.error("GitHub Auth Error:", error);
      res.status(500).send("Internal Server Error");
    }
  });

  // 3. GitHub Proxy Routes (optional, but good for keeping tokens on server)
  app.get("/api/github/user", async (req, res) => {
    const token = req.headers.authorization;
    if (!token) return res.status(401).json({ error: "Unauthorized" });

    try {
      const response = await axios.get("https://api.github.com/user", {
        headers: { Authorization: `token ${token}` },
      });
      res.json(response.data);
    } catch (e) {
      res.status(500).json({ error: "Failed to fetch user" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
