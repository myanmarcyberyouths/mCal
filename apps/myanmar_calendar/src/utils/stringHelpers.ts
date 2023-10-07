export function camelToSentenceCase(inputString: string) {
  // Replace each uppercase letter with a space followed by the lowercase version of the letter
  const sentenceCaseString = inputString.replace(/([A-Z])/g, " $1");

  // Remove leading space if any and convert to lowercase
  return sentenceCaseString.trim().toLowerCase();
}
