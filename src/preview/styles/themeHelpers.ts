import theme from './theme';

export type PrimaryColor = keyof typeof theme.colors.primary;
export type ComplementaryColor = keyof typeof theme.colors.complementary;

function isPrimaryColor(color: string): color is PrimaryColor {
  return Object.keys(theme.colors.primary).includes(color);
}
function isComplementaryColor(color: string): color is PrimaryColor {
  return Object.keys(theme.colors.primary).includes(color);
}
/**
 * Helper function that checks if the passed colorSchema exists on the theme, and if so returns it.
 * Otherwise defaults to the blue colorSchema.
 */
export const getValidColorSchema = (
  colorSchema?: string,
  variant: 'primary' | 'complementary' = 'primary',
): PrimaryColor | ComplementaryColor => {
  if (colorSchema === undefined) return 'blue';
  if (variant === 'primary' && isPrimaryColor(colorSchema)) return colorSchema;
  if (variant === 'complementary' && isComplementaryColor(colorSchema)) return colorSchema;
  return 'blue';
};
