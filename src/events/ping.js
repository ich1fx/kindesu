import {
  InteractionType,
  InteractionResponseType
} from 'discord_api_types/v10.ts';

export const type = InteractionType.Ping;

export async function execute({ request }) {
  return new Response(JSON.stringify({
    type: InteractionResponseType.Pong,
  }));
};
