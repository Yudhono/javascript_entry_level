## 1. Header navigation

- [ ] 1.1 Add a "Home" `<a href="/">` link as the first item in `.site-nav` in `components/Header.tsx`
- [ ] 1.2 Extend `isActive` in `components/Header.tsx` to return `true` for `"/"` when `currentPath === "/"`
- [ ] 1.3 Apply `isActive("/")` to the new Home link's `className`

## 2. Verification

- [ ] 2.1 Run the app locally and confirm the Home link appears first in the nav on every page
- [ ] 2.2 Confirm the Home link is styled `active` on `/` and not active on `/js`, `/html-css`, `/components`
- [ ] 2.3 Confirm clicking the Home link navigates to `/`
