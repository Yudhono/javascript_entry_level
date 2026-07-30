## Why

The top navigation bar (`components/Header.tsx`) currently links to JavaScript, HTML & CSS, and Components, but has no explicit "Home" link. The only way back to `/` is clicking the brand logo, which is not discoverable as a navigation action. Adding a visible Home link improves navigability and keeps the nav consistent with the site's other sections.

## What Changes

- Add a "Home" link to the `site-nav` list in `components/Header.tsx`, pointing to `/`.
- Extend the existing `isActive` logic so the Home link is highlighted as active when the current route is `/`.
- Position "Home" as the first item in the nav, before JavaScript, HTML & CSS, and Components.

## Capabilities

### New Capabilities
- `top-navigation`: Defines the top navigation bar's links, including active-state highlighting, covering the existing JavaScript/HTML & CSS/Components links plus the new Home link.

### Modified Capabilities
(none — no existing specs in this project)

## Impact

- Affected code: `components/Header.tsx` only.
- No API, dependency, or backend changes.
- No breaking changes; purely additive UI change.
