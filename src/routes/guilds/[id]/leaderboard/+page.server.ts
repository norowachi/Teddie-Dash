import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
  // TODO
  const data = await getLeaderboardDetails(params.id);

  if (data) {
    return data;
  }

  error(404, 'Not found');
};
