/**
 * resolveFileUrl
 *
 * Handles two cases so old data and new Cloudinary data both work:
 *  - New uploads  → Cloudinary stores the full URL (https://res.cloudinary.com/...)
 *  - Old uploads  → MongoDB still holds a relative path (/uploads/photo_xxx.jpg)
 *
 * Usage:
 *   import { resolveFileUrl } from '../utils/resolveFileUrl';
 *   <img src={resolveFileUrl(member.photo)} />
 */
export function resolveFileUrl(filePath) {
  if (!filePath) return null;

  // Fix malformed Cloudinary URLs
  if (filePath.startsWith("https//")) {
    filePath = filePath.replace("https//", "https://");
  }

  if (
    filePath.startsWith("http://") ||
    filePath.startsWith("https://")
  ) {
    return filePath;
  }

  const normalizedPath = filePath.startsWith("/")
    ? filePath
    : `/${filePath}`;

  // return `${import.meta.env.VITE_API_URL}${normalizedPath}`;
  return `${normalizedPath}`
}