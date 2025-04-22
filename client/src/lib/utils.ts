export function shortenAddress(address: string | null | undefined, chars = 4): string {
  if (!address) return '';
  if (address.length <= chars * 2) return address; // Return original if too short to shorten
  
  const start = address.slice(0, chars);
  const end = address.slice(-chars);
  return `${start}...${end}`;
}