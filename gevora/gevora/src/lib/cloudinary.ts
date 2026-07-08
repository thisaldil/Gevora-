// Cloudinary integration point. Once NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME and an
// unsigned upload preset are configured, propertyImageUrl() and the upload
// helper below become the single place that needs to change — every
// component currently reads image URLs straight off the mock Property
// objects, so swapping mock URLs for Cloudinary URLs doesn't touch UI code.

const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

/** Build a delivery URL for an already-uploaded Cloudinary asset. */
export function cloudinaryUrl(publicId: string, opts: { width?: number; height?: number } = {}): string {
  if (!CLOUD_NAME) return publicId; // fall back to whatever URL was passed in (e.g. mock data)
  const { width = 1200, height } = opts;
  const transform = height ? `w_${width},h_${height},c_fill,q_auto,f_auto` : `w_${width},q_auto,f_auto`;
  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${transform}/${publicId}`;
}

/** Unsigned client-side upload — requires NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET. */
export async function uploadPropertyImage(file: File): Promise<string> {
  const preset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
  if (!CLOUD_NAME || !preset) {
    throw new Error("Cloudinary is not configured — set NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME and _UPLOAD_PRESET");
  }
  const form = new FormData();
  form.append("file", file);
  form.append("upload_preset", preset);

  const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
    method: "POST",
    body: form,
  });
  if (!res.ok) throw new Error("Cloudinary upload failed");
  const data = await res.json();
  return data.secure_url as string;
}
