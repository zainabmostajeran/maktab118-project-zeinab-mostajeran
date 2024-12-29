export function extractErrorMessage(html: string): string {
  const regex = /<pre>Error:\s*(.*?)<br>/;
  const match = html.match(regex);
  return match && match[1] ? match[1].trim() : "خطای نامشخص رخ داد.";
}
