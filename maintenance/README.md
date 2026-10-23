# Inspiro maintenance page

This is a self-contained static landing page. Deploy the **contents of this `maintenance` directory** as the web root (with `index.html` at `/`). It does not need Node.js, a database, environment variables, or a build step. The main website in `src/` is unchanged.

Before publishing, open `index.html` and check the four social links. They use the `weareinspirox` handles supplied for Facebook, Instagram, X and TikTok; the live profile destinations could not be independently verified.

To preview locally from this directory, run `npx serve .` or use any static-file server. When the full website is ready, deploy the main app in place of this static page.
