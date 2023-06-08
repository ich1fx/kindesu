import {
  sign
} from 'tweetnacl';
import {
  Status
} from 'http/server.ts';
import * as events from '../events/mod.js';

export const path = "/interaction";
export const method = "POST";
  
export async function execute({ request, branch }) {
  const body = await request.text();
  const timestamp = request.headers.get('x-signature-timestamp');
  const signature = request.headers.get('x-signature-ed25519');
    
  const valid = await sign.detached.verify(
    new TextEncoder().encode(timestamp + body),
    hexEncode(signature),
    hexEncode(Deno.env.get(`${branch}_PUBLIC_KEY`))
  );
  if (!valid) {
    return new Response('Invalid Request!', {
      status: Status.Unauthorized
    });
  } else {
    const interaction = JSON.parse(body);
    const event = Object.values(events).find(evt => evt.type === interaction.type);
    if (event) return await event.execute({ request, branch, interaction });
  }
};

function hexEncode(hex) {
  return new Uint8Array(
    hex.match(/.{1,2}/g)
      .map(ctx => parseInt(ctx, 16))
  )
}
