import {
  RouteBases,
  Routes
} from 'discord_api_types/v10.ts';
import {
  CookieMap,
  mergeHeaders,
  Status
} from 'http/server.ts';
import * as commands from '../commands/mod.js';

export const method = 'GET';
export const path = '/deploy';
  
export async function execute({ request, branch }) {
  const cookie = new CookieMap(request, { secure: true });
  const isAllowed = cookie.has('allowed');
    
  if (!isAllowed) {
    return new Response({
      status: Status.Found,
      headers: {
        Location: `${request.url.origin}`
      }
    });
  } else {
    const body = JSON.stringify(Object.values(commands).map(cmd => cmd.data));
    console.log(body);
      
    const deployRequest = await fetch(RouteBases.api + Routes.applicationCommands(Deno.env.get(`${branch}_ID`)), {
      method: 'PUT',
      headers: {
        Authorization: `Bot ${Deno.env.get(`${branch}_TOKEN`)}`,
        'content-type': 'application/json'
      },
      body
    });
    const deployResult = await deployRequest.json();
    
    return new Response(JSON.stringify(deployResult, null, '  '))
  }
};
