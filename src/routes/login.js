import {
  CookieMap,
  mergeHeaders
} from 'http/server.ts';

export const method = "GET";
export const path = `/${Deno.env.get('SECRET')}`;
  
export async function execute({ request, branch }) {
  const cookie = new CookieMap(request, { secure: true });
  await cookie.set('allowed', 'true');
 
  return new Response("Redirecting",
    status: Status.Found,
    headers: mergeHeaders({ Location: request.url.origin }, cookie)
  });
};
