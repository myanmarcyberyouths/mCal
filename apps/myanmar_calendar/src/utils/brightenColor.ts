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
