export function engToMyanmarNumber(num: number | string) {
  const myanmarNumbers = ["၀", "၁", "၂", "၃", "၄", "၅", "၆", "၇", "၈", "၉"];
  const numStr = String(num);
  let result = "";
  for (let i = 0; i < numStr.length; i++) {
    const digit = parseInt(numStr.charAt(i));
    result += myanmarNumbers[digit];
  }
  return result;
}
