
export default function shortenText (text: string, maxlength: number = 100): string  {
  if (text.length > maxlength) {
    return text.substring(0, maxlength - 3) + "...";
  }
  return text;
}
