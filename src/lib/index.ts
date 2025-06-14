// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function toAbbrev(num: any): string {
  if (!num || isNaN(num)) return '0';
  if (typeof num === 'string') num = parseInt(num);
  const decPlaces = Math.pow(10, 1);
  const abbrev = ['K', 'M', 'B', 'T'];
  for (let i = abbrev.length - 1; i >= 0; i--) {
    const size = Math.pow(10, (i + 1) * 3);
    if (size <= num) {
      num = Math.round((num * decPlaces) / size) / decPlaces;
      if (num == 1000 && i < abbrev.length - 1) {
        num = 1;
        i++;
      }
      num += abbrev[i];
      break;
    }
  }
  return num;
}

/** Could be used client-side */
export async function loadUserGuilds<
  T extends
    | Array<{
        id: string;
        name: string;
        icon: string | null;
        owner: boolean;
        permissions: string;
      }>
    | undefined
>(accessToken: string, fetch: typeof window.fetch = window.fetch): Promise<T> {
  const guilds = await (
    await fetch(`https://discord.com/api/v10/users/@me/guilds`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      }
    }).catch(console.error)
  )
    ?.json()
    .catch(console.error);

  return guilds;
}
