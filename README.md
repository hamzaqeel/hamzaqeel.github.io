# Hamza Aqeel — GitHub Pages Portfolio

A complete static version of the deployed cyber-pop portfolio. The HTML contains the original rendered content and SVG icons. The original stylesheet, responsive breakpoints, animation keyframes, fonts, game artwork, gameplay video, and official résumé are included.

No installation, compilation, framework, server, API key, or ChatGPT account is needed. The files in this folder are the editable source and the deployment files.

## Publish on GitHub Pages

1. Create a GitHub repository, for example `portfolio`. A public repository works with GitHub Free.
2. Extract the ZIP on your computer.
3. Upload the **contents** of the extracted project to the repository's `main` branch. `index.html` and `assets/` must appear at the repository root. Do not upload only the ZIP or place everything inside another folder.
4. Open **Settings → Pages**.
5. Under **Build and deployment**, select **Deploy from a branch**.
6. Select **main** and **/ (root)**, then click **Save**.
7. When publication finishes, open the URL displayed in the Pages settings.

For a repository named `portfolio`, the address is normally `https://YOUR-USERNAME.github.io/portfolio/`. A repository named `YOUR-USERNAME.github.io` uses `https://YOUR-USERNAME.github.io/`. Both work without editing asset paths. Keep the included `.nojekyll` file at the root when using Git to upload.

Official instructions: [Creating a GitHub Pages site](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site) and [Configuring a publishing source](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).

## Project files

| Path | Purpose |
| --- | --- |
| `index.html` | Complete page, content, game cards, links, inline UI icons, contact form |
| `assets/css/style.css` | Original design, local font declarations, responsive styles and animations |
| `assets/js/main.js` | Scroll reveals, parallax, cursor glow, card tilt, cyber-pop bursts, video setup and email composition |
| `assets/images/` | Original game art, 1024px replacement icons, poster and favicon |
| `assets/videos/forest-nights-gameplay.mp4` | Original optimized gameplay video |
| `assets/documents/Hamza_Aqeel_Game_Developer_Resume.pdf` | Your official résumé, unchanged |
| `assets/fonts/` | Local Bowlby One and Sora font files and licenses |
| `.nojekyll` | Disables Jekyll processing |

## Contact form

The form retains its fields, appearance, validation, and Send message button. Submission opens the visitor's email application with the subject, message, name, and reply address already filled in for `hamzaaaqeeel@gmail.com`. The visitor must send that email from their mail application. The form keeps its contents if no mail application is configured; the direct email and phone links remain available.

This is the intentional functional change needed to eliminate the original external FormSubmit email service. A static page cannot deliver email automatically without an external delivery service or backend. No message is uploaded by this website and no email service activation is needed.

## Preserved behavior

- All 12 selected-work cards, including the four Drive APK links and upgraded icons.
- Four major-update cards with their existing Google Play links and content.
- Original App Store, Google Play, LinkedIn, phone, email, gameplay anchor, and CV links.
- Autoplay-muted, looping, inline gameplay video with controls and poster fallback. Browser autoplay policies can require visitors to press Play.
- Original desktop/mobile layout and typography, animated marquee, hero entrance and parallax, hover tilt and shine, orbit/glow effects, scroll reveals, progress bar and click/tap cyber-pop effects.
- Original reduced-motion styling, focus indicators, form labels, and accessible status messages. Content and navigation remain available with JavaScript disabled.

All required visual assets load from this project. External store and social destinations still require internet access when opened. No asset references the previous hosting domain or an image optimization API.

## Editing and local preview

Open `index.html` directly in a browser to preview the static page. Edit page text and links in `index.html`, appearance in `assets/css/style.css`, and interaction behavior in `assets/js/main.js`. Upload changed files to publish updates.

Keep filenames and letter case consistent. HTML asset paths are relative to `index.html`; font paths in the stylesheet are relative to `assets/css/style.css`. Retain the original image styles when changing artwork so the card presentation stays consistent.

Font redistribution licenses are included beside the font files. The license for the embedded Lucide UI icons is included in `assets/images/Lucide-LICENSE.txt`. Game artwork, video, résumé, and portfolio content retain their respective ownership.
