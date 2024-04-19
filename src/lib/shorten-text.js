
export default function shortenText (text, maxlength = 100) {
  if (text.length > maxlength) {
    return text.substring(0, maxlength - 3) + "...";
  }
  return text;
}
