# Images

This concept currently hotlinks photography from the client's own live sites
(7-arte.org, mitrovicagreenfest.com, visittrepca.com, mitro.run).

That is fine for an internal concept review. It is not fine for anything public:

- the client can move or delete those files at any time, breaking the page
- it puts load on their servers
- the files are full-size originals, so the page is far heavier than it needs to be

## Before publishing

1. Export the originals from the client's media libraries.
2. Resize to 1600px on the long edge, convert to WebP, keep JPG fallbacks.
3. Drop them in this folder.
4. Run a find-and-replace across `index.html` from the remote URLs to `assets/img/…`.
