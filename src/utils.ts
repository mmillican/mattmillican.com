import { DateTime } from 'luxon';

export function getPostSlugFromFilename(filename: string): string {
  const slugRegex = /(?<=\d{4}-\d{2}-\d{2}-)(?:[\w-]*)/;
  const slug = slugRegex.exec(filename)[0];
  return slug;
};

export function formatDate(input: string): string {
  const date = DateTime.fromISO(input);

  const formatted = date.toFormat('LLLL dd, yyyy');
  return formatted;
}
