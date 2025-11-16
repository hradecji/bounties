Grathwrang Completed Bounty Board – Project Spec for AI Assistant
0. Context for the AI in this repo

You are helping build a single-page React web app that displays completed bounties for the Age of Empires 2: DE streamer Grathwrang.

Key points:

Static front-end only (no backend, no auth, no cookies, no tracking).

Data comes from a local JSON file that the maintainer edits manually.

Security is important even though the surface is small. Prefer safe defaults and conservative choices.

No code generation in this file – this document is purely specification, architecture, and task planning.

When implementing, you should:

Respect this spec as the source of truth.

Keep things simple, explicit, and type-safe.

Avoid unnecessary dependencies.

1. High-level product description

Goal: A single-page web app that shows only completed bounties for Grathwrang, styled like a medieval bounty board with subtle modern touches.

Core characteristics

Built with React and TypeScript, using Vite as the bundler.

Deployed as a static site.

Uses one local JSON file for all bounty data, e.g. src/data/bounties.json.

No user accounts, no private data, no payments, no server-side logic.

Focused scope: only completed bounties. This is not a live tracker; it is a historical / completed-bounty archive.

2. Functional requirements
2.1 Data

All bounty data is stored in a single JSON file, for example:

Path: src/data/bounties.json

Each entry represents one completed bounty.

Data model (TypeScript-style description, no actual code yet):

id: string or number

Unique identifier per bounty.

title: string

Short, descriptive title (e.g. "Win with only trash units").

description: string

Longer explanation of what the bounty was, and possibly what happened.

playerName: string

Name of the player involved (e.g. "Grathwrang", "Hera", "Daut").

reward: string

Human-readable reward text (e.g. "50€", "10 gift subs", "Song request").

status: string

For now, this will always be "completed" in the data that is displayed.

Keep it as a field for potential future expansion (e.g. "open", "failed", etc.), but the UI for this version only shows completed ones.

createdAt: string (ISO 8601, e.g. "2025-02-10T20:00:00Z")

When the bounty was created or announced.

completedAt: string (ISO 8601)

When the bounty was completed.

Optional metadata:

map: string (e.g. "Arabia", "Arena", "Land Nomad").

civilization: string (e.g. "Franks", "Mongols").

category: string (e.g. "eco", "military", "troll", "challenge").

notes: string (optional extra info).

The JSON should be a flat array of these objects.

2.2 Views and filtering

The app has a single main view:

A header with title and small subtitle.

A filter / control bar.

A list or grid of cards, each representing one completed bounty.

The bounty list is driven entirely by the JSON file, not hard-coded.

Filter behavior

The user must be able to filter:

By timeframe

Timeframe refers to completedAt.

Timeframe options:

“All time”

“Last 7 days”

“Last 30 days”

“This year”

“Custom date range” (with “from” and “to” inputs)

Behavior details:

Selecting “All time” ignores date limits.

“Last 7 days” means “completedAt >= now - 7 days”.

“Last 30 days” means “completedAt >= now - 30 days”.

“This year” means “completedAt >= January 1 of the current year”.

“Custom date range” enables two date inputs (from, to) and filters completedAt inclusively.

If only from is set, filter completedAt >= from.

If only to is set, filter completedAt <= to.

By player name

A text input that filters by playerName, case-insensitive.

Ideally supports typeahead suggestions from the existing player names in the JSON.

Sorting (simple)

Default sort: completedAt descending (most recent first).

Allow toggling sort order or a simple select:

“Newest first”

“Oldest first”

All filters can be combined, e.g.:

“Completed bounties in the last 30 days, for player Hera, newest first”.

2.3 Behavior with no results

If no bounties match the filters:

Show a friendly message like “No completed bounties match these filters” and maybe a hint to clear filters.

Don’t crash or show empty layout with no explanation.

3. Design and UX
3.1 Overall style theme

Goal: medieval parchment bounty board with subtle modern touches.

Visual direction:

Background:

Soft parchment / warm beige.

Slight texture implied via subtle gradients, not heavy noisy textures.

Cards:

Parchment-like boxes with slightly darker edge, subtle drop shadow.

Borders could look like slightly worn parchment edges, but keep it clean and readable.

Typography:

Headers: medieval-ish serif font (e.g. something with a bit of flair).

Body: clean, modern sans-serif for readability.

Use a font stack with fallbacks, avoiding over-dependence on one external font.

Modern twist:

Slightly rounded corners (not hyper-modern pill shapes, but not razor sharp).

Very subtle hover effects: small elevation/shadow change, maybe slight scale (keep it minimal).

Responsive layout with grid that collapses to single column on small screens.

3.2 Theme toggle (light/dark)

There should be a theme toggle that switches between at least two themes:

Parchment Light Theme

Background: warm beige.

Cards: lighter parchment with darker text.

Text: dark brown/near-black.

Accent: deep red or muted gold for titles and small accents.

Torchlight Dark Theme

Background: very dark brown / charcoal, hint of vignette.

Cards: slightly lighter brown or desaturated gold.

Text: light beige.

Accents: ember-like orange/gold.

Theme toggle behavior:

A simple toggle (switch or button) in the header.

Implemented via CSS custom properties so:

Tokens like --color-background, --color-card, --color-text are defined for each theme.

Root element (e.g. html or body or a top-level React root) gets a class like theme-light or theme-dark.

Optionally remember theme in localStorage for convenience (but this is not mandatory; spec is fine either way).

3.3 Layout

Max width for content, e.g. a central column (like 960–1200px max), centered with padding.

Header at top, then filters, then the card list.

Cards in:

Single column on small screens.

Two or three columns on larger screens (responsive CSS grid).

4. Architecture and components
4.1 Folder structure (conceptual)

Suggested structure:

src/

main entry file

App root component

components/

Reusable UI building blocks (Header, ThemeToggle, etc.).

features/

bounties/

Data loading module.

Filtering and sorting logic (pure functions).

Feature-specific components (BountyList, BountyCard, BountyFilters).

data/

bounties.json (static data file).

styles/

tokens.css (CSS variables for colors, spacing, typography).

global.css (resets, base typography, body background).

Tests (if used), e.g. src/features/bounties/__tests__/....

This is conceptual; concrete file paths and names can be adjusted, but this structure should be followed.

4.2 React component responsibilities

Root: App

Loads all bounty data (through a dedicated data module, not directly from JSON in the component if possible).

Holds filter state and theme state.

Passes:

Filter state and callbacks to BountyFilters.

Filtered, sorted list of bounties to BountyList.

Theme toggle state and handler to Header or ThemeToggle.

Header

Displays app title, subtitle.

Displays the theme toggle control.

Responsible only for rendering, not for managing theme state (that lives in App).

ThemeToggle

Small component that:

Shows current theme.

Triggers a callback from App to flip theme.

BountyFilters

Displays timeframe control, custom date range inputs, player name filter, and sort controls.

Accepts current filter values and a callback to update them.

Emits a single filters object when any sub-control changes, rather than many separate props if possible.

BountyList

Receives a list of filtered/sorted bounties and renders them.

Responsible for “no results” message if the array is empty.

BountyCard

Renders a single bounty.

Shows:

Title

Player name

Reward

Completed date (formatted nicely)

Optional map, civilization, category, notes

Uses styling that matches the medieval theme and current theme mode.

4.3 Data and filtering logic (non-React)

Under features/bounties, create:

A module that:

Imports bounties.json.

Exposes a function that returns all bounties as typed objects.

Exposes pure functions for:

Filtering by timeframe and custom date range.

Filtering by player name.

Sorting by completedAt.

These functions should:

Take plain arrays and parameter objects, and return new arrays.

Perform no side effects.

Be easily testable.

5. Filter logic: detailed behavior
5.1 Time-related filtering

Define a “filter params” object conceptually like:

timeframe: "all" | "last7" | "last30" | "thisYear" | "custom"

dateFrom: optional date string.

dateTo: optional date string.

Rules:

If timeframe is "all":

Ignore dateFrom/dateTo for automatic timeframe, but still apply if the user sets custom range explicitly and timeframe is "custom".

If timeframe is "last7":

Calculate now - 7 days and filter completedAt >= that.

If timeframe is "last30":

Calculate now - 30 days and filter completedAt >= that.

If timeframe is "thisYear":

Calculate first day of current year and filter completedAt >= that.

If timeframe is "custom":

Use dateFrom and dateTo directly to filter.

5.2 Player filtering

playerNameFilter: string.

Filtering should be:

Case-insensitive.

Applied to playerName field.

If filter string is empty, do not filter by player.

5.3 Sorting

Default sort: completedAt descending.

If user selects “Oldest first”, sort ascending.

Sorting happens after filtering.

6. Styling and theme system
6.1 CSS tokens (conceptual)

Use CSS variables to drive theming, defined in something like tokens.css.

Examples of tokens:

--color-background

--color-surface

--color-surface-alt

--color-text-primary

--color-text-muted

--color-accent

--color-border

--shadow-card

--radius-card

--font-heading

--font-body

--space-1, --space-2, --space-3, etc.

Define two theme scopes:

.theme-light with parchment-based colors.

.theme-dark with torchlight-based colors.

The root React component or the HTML/body element should have the appropriate .theme-light or .theme-dark class applied.

6.2 Global styles

global.css should contain:

CSS reset or normalize.

Base styles for body (background color from tokens, font-family).

Basic layout constraints for main container.

6.3 Component-scoped styles

Use CSS Modules (or similar) so each component has its own style file:

Header.module.css

BountyFilters.module.css

BountyList.module.css

BountyCard.module.css

These should:

Use tokens defined in tokens.css.

Avoid hard coding raw color values outside tokens.

Keep layout decisions straightforward: flexbox/ grid for layout, no unnecessary complexity.

7. Accessibility and UX requirements

Use semantic HTML:

<header> for header.

<main> for main content.

<section> for groupings if needed.

<ul>/<li> or <div role="list">/<div role="listitem"> patterns for lists.

Filters:

Use <label> elements for inputs.

Ensure each input is reachable via keyboard.

Provide visible focus outlines.

Theme toggle:

Should be reachable via keyboard and screen reader friendly.

Use aria-pressed or similar if appropriate.

Color contrast:

Text should meet reasonable contrast on parchment backgrounds and dark theme surfaces.

No flashing or aggressive animations.

Accessibility checklist (for later verification):

All inputs have labels.

Tab order flows logically from header to filters to list.

Theme toggle is accessible by keyboard and screen readers.

Color contrast is adequate in both themes for body and headings.

No content is only distinguishable by color alone (e.g. don’t use color as the only status indicator).

8. Security requirements

Even though this is a static app with no auth and no backend, apply the following security rules:

8.1 Front-end code rules

No dynamic code execution

Do not use eval.

Do not use new Function.

Do not use setTimeout or setInterval with string arguments.

No HTML injection from JSON

Bounty text from JSON must always be rendered as plain text, not interpolated as HTML.

Do not use dangerouslySetInnerHTML anywhere by default.

If there is ever a future justified case, it must go through explicit sanitization (not needed in this version).

Limit external resources

Only load external fonts or assets from a small set of trusted domains.

Do not load arbitrary third-party scripts or iframes.

No tracking

No analytics scripts by default.

No cookies or localStorage for anything sensitive.

LocalStorage can be used only for theme preference if desired; no secrets or personal data stored.

Dependency hygiene

Use minimal dependencies (React, React DOM, Vite, testing libraries).

Avoid installing random third-party UI libraries unless necessary.

Keep dependencies up to date using a package manager lockfile.

8.2 Deployment / hosting hardening

Assuming static hosting (e.g. Netlify, Vercel, or a static file server):

Content Security Policy (conceptually)

Enforce a CSP such as:

default-src 'self';

script-src 'self';

style-src 'self' 'unsafe-inline';

img-src 'self' data:;

font-src 'self' <font-hosts-if-any>;

Adjust to specific needs based on actual external resources used.

Other headers

X-Frame-Options: DENY or equivalent (or same via CSP frame-ancestors 'none') to avoid clickjacking.

Referrer-Policy: no-referrer-when-downgrade or stricter.

X-Content-Type-Options: nosniff.

HTTPS

Always serve over HTTPS.

No server-side secrets

There are no secrets needed for this app.

Ensure build or deploy steps don’t inject environment variables with secrets.

8.3 Security checklist for code review

Before considering the app “done”:

 There is no eval, new Function, or string-based setTimeout/setInterval in the repo.

 No use of dangerouslySetInnerHTML (or, if used later for something else, it is properly sanitized and justified).

 All JSON data is treated as plain text content.

 No third-party scripts except what’s strictly needed.

 Dependencies are reasonably up to date and there are no critical unresolved security warnings.

 Deployment config includes some form of CSP and safe defaults for headers.

9. Implementation tasks for the AI (high-level plan)

The following tasks describe how the AI should proceed when asked to generate code or configuration. Each task can be turned into a prompt.

Task 1 – Project setup

Scaffold a Vite + React + TypeScript project.

Configure TypeScript with strict mode.

Set up ESLint and Prettier with sensible defaults.

Task 2 – Folder and data model

Create the folder structure under src as outlined above.

Define the TypeScript interfaces for the bounty data model.

Document the expected shape of bounties.json.

Task 3 – Data module and pure filtering logic

Implement a data module that imports bounties.json and returns typed bounty data.

Create pure functions:

filterByTimeframe / filterByDateRange

filterByPlayerName

sortByCompletedAt

Ensure functions are side-effect free and easily testable.

Task 4 – React component skeletons

Implement skeleton versions of:

App

Header

ThemeToggle

BountyFilters

BountyList

BountyCard

Wire props and basic structure, but initially keep styling minimal.

Task 5 – Wiring filters and state

Implement filter state in App.

Connect BountyFilters to update filter state.

Use useMemo (or similar) to derive filtered and sorted bounties from the data and filters.

Pass that list to BountyList.

Task 6 – Theme toggle implementation

Implement theme state in App.

Implement a theme toggle UI in Header / ThemeToggle.

Apply .theme-light / .theme-dark class to a root element.

Define CSS variables for both themes in tokens.css and ensure the UI updates correctly when toggling.

Task 7 – Styles and polish

Implement base layout and responsive design.

Style BountyCard and other components according to the medieval + progressive design.

Ensure typography, spacing, and hover effects look cohesive.

Verify both themes look good and are readable.

Task 8 – Accessibility pass

Check semantic tags.

Ensure all inputs have labels and are keyboard navigable.

Add any necessary ARIA attributes, especially around the theme toggle and filters.

Verify color contrast in both themes.

Task 9 – Security and final review

Scan the code for compliance with the security rules above.

Confirm no forbidden patterns exist.

Ensure that JSON data is not used in any unsafe way.

Double-check that external resources (if any) are minimal and trusted.

10. Non-goals (for clarity)

The app does not need:

Live data fetching from APIs.

User authentication / authorization.

Payment integration.

Commenting or user-generated content.

Complex routing (only one main page).