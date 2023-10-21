export function modifyColorOpacity(hexColor, targetOpacity) {
  hexColor = hexColor.replace("#", "");

  const r = parseInt(hexColor.slice(0, 2), 16);
  const g = parseInt(hexColor.slice(2, 4), 16);
  const b = parseInt(hexColor.slice(4, 6), 16);

  // Ensure the opacity is in the valid range [0, 1]
  targetOpacity = Math.max(0, Math.min(1, targetOpacity));

  // Create the RGBA color string
  const rgbaColor = `rgba(${r}, ${g}, ${b}, ${targetOpacity})`;

  return rgbaColor;
}
