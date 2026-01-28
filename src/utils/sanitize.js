const stripTags = value => value.replace(/<[^>]*>?/gm, '');

export const sanitizeString = value => {
  if (typeof value !== 'string') return '';
  return stripTags(value).trim();
};

export const sanitizeTags = tags => {
  if (!Array.isArray(tags)) return [];
  const map = new Map();
  for (const raw of tags) {
    const clean = sanitizeString(raw);
    if (!clean) continue;
    const key = clean.toLowerCase();
    if (!map.has(key)) map.set(key, clean);
    if (map.size >= 5) break;
  }
  return Array.from(map.values());
};
