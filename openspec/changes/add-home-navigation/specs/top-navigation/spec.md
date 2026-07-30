## ADDED Requirements

### Requirement: Home link in top navigation
The top navigation bar SHALL include a "Home" link that navigates to `/`.

#### Scenario: Home link is present
- **WHEN** a user views any page with the top navigation bar
- **THEN** a "Home" link targeting `/` is displayed in the navigation, before the JavaScript, HTML & CSS, and Components links

#### Scenario: Navigating via the Home link
- **WHEN** a user clicks the "Home" link in the top navigation bar
- **THEN** the browser navigates to `/`

### Requirement: Active state for Home link
The top navigation bar SHALL visually indicate the Home link as active when the current route is `/`.

#### Scenario: Home is active on the home route
- **WHEN** the current route is `/`
- **THEN** the "Home" link has the `active` class applied

#### Scenario: Home is not active on other routes
- **WHEN** the current route is `/js`, `/html-css`, or `/components`
- **THEN** the "Home" link does not have the `active` class applied
