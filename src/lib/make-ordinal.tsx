export default function makeOrdinal (num: number): string {
  if (num % 100 > 10 && num % 100 < 20) return 'th';

  const digit = num % 10;

  switch (digit) {
    case 1: return 'st';
    case 2: return 'nd';
    case 3: return 'rd';
    default: return 'th';
  }
}