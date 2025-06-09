import { PermissionFlagsBits } from 'discord-api-types/v10';

export function hasPermissions(base: bigint, perms: (keyof typeof PermissionFlagsBits)[]) {
  if ((base & PermissionFlagsBits.Administrator) === PermissionFlagsBits.Administrator) return true;

  for (const perm of perms) {
    // check if the member has all the required permissions
    if ((base & PermissionFlagsBits[perm]) != PermissionFlagsBits[perm]) {
      return false;
    }
  }

  return true;
}
