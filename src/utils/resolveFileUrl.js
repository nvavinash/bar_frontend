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
export function resolveFileUrl(path) {
  if (!path) return null;
  // Already a full URL (Cloudinary, S3, or any CDN)
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }
  // Legacy local path — prepend the backend origin
  return `${import.meta.env.VITE_API_URL}${path}`;
}
