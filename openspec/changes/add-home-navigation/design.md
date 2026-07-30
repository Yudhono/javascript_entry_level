## Context

`components/Header.tsx` renders the site's top navigation using a hardcoded list of `<a>` links inside `.site-nav`, plus a small `isActive(href)` helper that compares against `router.pathname` to apply the `active` class. This is a small, single-component, client-side-only change with no new dependencies or data model.

## Goals / Non-Goals

**Goals:**
- Add a "Home" link to `.site-nav` that navigates to `/`.
- Highlight "Home" as active when the current route is `/`.
- Keep the existing link markup/style pattern so the new link is visually indistinguishable from the others.

**Non-Goals:**
- Redesigning the header, brand link, or nav styling.
- Changing routing structure or adding new pages.
- Making the nav data-driven/configurable (out of scope for this small change).

## Decisions

- **Add a literal `<a href="/">Home</a>` entry as the first item in `.site-nav`**, rather than reusing the brand link, so Home is discoverable as a nav item like the other sections. Alternative considered: rely on the existing brand link only — rejected because it's not labeled as navigation and the proposal explicitly asks for a nav entry.
- **Extend `isActive` with a `"/"` case** using the same exact-match pattern already used for `/html-css`, `/js`, and `/components`, keeping the function's existing style rather than refactoring it into a generic route array (refactor is unnecessary for one added case).

## Risks / Trade-offs

- [Home link duplicates the brand link's destination] → Acceptable; duplication is common in nav patterns (brand + explicit Home) and improves discoverability.

## Open Questions

None.
