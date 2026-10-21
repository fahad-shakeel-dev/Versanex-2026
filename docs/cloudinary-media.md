# Website media delivery

All 154 local image and video paths and the 44 source-managed Unsplash photo URLs have been uploaded to Cloudinary. Identical local files share uploads: 198 source URLs resolve to 188 unique Cloudinary assets in `versanex-2026/media`.

`data/cloudinary-media.json` contains only public HTTPS delivery URLs. `lib/media-url.js` resolves existing source paths, including encoded filenames and cache-busting queries, without changing route links or unknown image paths. Existing Cloudinary-hosted project and team photos continue using their existing URLs. Third-party video embeds remain on their original providers.

The shared image component resolves CDN URLs after determining its original crop, fit, and background styles. Cloudinary serves responsive widths and automatic formats through the existing image loader. Local image files remain available as fallbacks. The intro, hero, later video panel, gallery previews, sharing metadata, favicons, and web manifest icons use CDN delivery. The hero retains the complete optimized video copies, eager loading, and inline muted autoplay; it retries the local video if CDN loading fails.

No database records, visible text, gallery ordering, source images, or source video files were changed. Fonts remain local and preloaded. Cloudinary credentials stay in environment variables and are never included in the delivery manifest.

## Updating media

With the Cloudinary environment variables configured locally, run:

```powershell
node scripts/sync-cloudinary-media.mjs --plan
node scripts/sync-cloudinary-media.mjs
```

The script hashes local files, reuses existing content-versioned uploads, checkpoints the URL manifest, updates browser manifest icons, and records upload failures under the ignored `artifacts/cloudinary-migration/` directory. It does not delete or overwrite existing Cloudinary assets. Commit the updated URL manifest and any changed source assets after verification.

## Verification

- All 188 unique original CDN URLs and four representative responsive variants returned HTTP 200.
- Mapping checks cover all 198 sources, encoded paths, query parameters, SVG fragments, missing-media fallbacks, and unchanged navigation URLs.
- Production build passes. Browser checks cover nine public routes at 390 and 2600 pixels, including the four named case studies, responsive project previews, canonical URLs, CDN video playback, loaded visible images, and no horizontal overflow or JavaScript errors. Normal loading made no local media requests. Blocking CDN requests verified local image and video recovery on both viewport sizes, including failures before hydration.
- Browser verification reports and screenshots are kept under `artifacts/cloudinary-migration/`. Project API responses were supplied from the source-managed inventory and writes were blocked during these browser checks; database mutation and form submission were not part of the test.
