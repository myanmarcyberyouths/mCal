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

export function brightenColor(hexColor, percent) {
  // Remove the "#" symbol and parse the hex color value to RGB
  const r = parseInt(hexColor.slice(1, 3), 16);
  const g = parseInt(hexColor.slice(3, 5), 16);
  const b = parseInt(hexColor.slice(5, 7), 16);

  // Calculate the new RGB values with the specified brightness increase
  const newR = Math.min(255, r + (percent / 100) * (255 - r));
  const newG = Math.min(255, g + (percent / 100) * (255 - g));
  const newB = Math.min(255, b + (percent / 100) * (255 - b));

  // Convert the new RGB values back to a hexadecimal color
  const newHexColor = `#${Math.round(newR).toString(16).padStart(2, "0")}${Math.round(newG).toString(16).padStart(2, "0")}${Math.round(newB).toString(16).padStart(2, "0")}`;

  return newHexColor;
}
