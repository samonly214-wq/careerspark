# Branding / Logo

This project supports a custom branding image for the header.

How to add your logo (quick)
1. Copy the image you attached (the PNG from your computer) into the project root (or public/static directory) at:

   branding-logo.png

   Example path (project root):
   - `c:\Users\VIOLETTE\SKIPPA\careerspark\branding-logo.png`

2. The Header component will automatically show `/branding-logo.png` in place of the small icon.

Notes & recommendations
- Optimal size: around 64x64 or 128x128 PNG with a transparent background for best results.
- If you prefer a different filename or folder (for example `public/logo.png` or `src/assets/logo.png`), copy the file and update the `src/components/Header.tsx` image `src` attribute accordingly.

Favicon (optional)
1. Create a small favicon (recommended 32x32 or 16x16) and place it at `public/favicon.ico` or `build/favicon.ico` before deployment.
2. Add the following tag to `index.html` (if you want a link):

   <link rel="icon" href="/favicon.ico" />

If you want, I can:
- Add the image into the repo for you (upload it into `branding-logo.png`) if you provide the file in the chat as an attachment (I can add it to the project files). Right now I prepared the code and instructions; drop the image and I'll place it.
