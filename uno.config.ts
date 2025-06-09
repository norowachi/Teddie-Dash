import { defineConfig } from 'unocss';

export default defineConfig({
  variants: [
    // hover:
    (matcher) => {
      if (!matcher.startsWith('hover:')) return matcher;
      return {
        // slice `hover:` prefix and passed to the next variants and rules
        matcher: matcher.slice(6),
        selector: (s) => `${s}:hover`
      };
    }
  ],
  rules: [
    // for diagonal borders
    [
      /b-([tblr]{2,3})-([^_]*)/,
      ([, side, color], { theme }) => {
        color = resolveColor(color, theme);
        const sides = side.split('');
        const values = sides.map((s) => {
          if (s === 't') return ['border-top-color', color];
          if (s === 'b') return ['border-bottom-color', color];
          if (s === 'l') return ['border-left-color', color];
          if (s === 'r') return ['border-right-color', color];
          return [];
        });
        return Object.fromEntries(values);
      }
    ]
  ]
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function resolveColor(color: string, theme: any) {
  // theme.colors is { "color": [ number: color ] }
  // so we have to split the color name by '-'
  // and resolve each part

  // if the color is a hex code, return it as is
  if (color.startsWith('#')) return color;

  // time for the times colors
  const parts = color.split('-');
  if (parts.length > 1) {
    const resolvedColor = theme.colors?.[parts[0]]?.[parts[1]] || color;
    return resolvedColor;
  }
  return theme.colors?.[color]?.DEFAULT;
}
