import { serve } from "http/server.ts";
import * as routes from './routes/mod.js';

serve(async (request) => {
  const branch = request.url.host.includes('--') ? request.url.host.split('--')[1].split('.deno.dev')[0] : "PROD";
  
  const route = Object.values(routes).find(ctx => ctx.method === request.method && ctx.path === request.url.pathname);
  if (route) return await route.execute({ request, branch });
});
