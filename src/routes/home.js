import {
  CookieMap
} from 'http/mod.ts';
import * as routes from './mod.js';

export const method = "GET";
export const path = "/";

export async function execute({ request, branch }) {
  const cookie = new CookieMap(request, { secure: true });
  const isAllowed = cookie.has('allowed');
    
  if (isAllowed) {
    const routesPaths = Object.entries(routes).filter(([route, data]) => (data.method === 'GET') && !['/', `/${Deno.env.get('SECRET')}`].includes(data.path));
    return new Response(JSON.stringify(Object.fromEntries(routesPaths.map(([route, data]) => [route, data.path])), null, '  '));
  } else {
    console.log(`[secret request: ${ctx.request.ip}]: ${Deno.env.get('SECRET')}`)
    return new Response(JSON.stringify({ message: `Kamu tidak terautentikasi nih, masukkan kode secret pada url ini (${ctx.request.url.origin + "/<secret>"})` }, null, "  "));
  }
};
