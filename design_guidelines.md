# SOC Outbound Dispatch Portal - Design Guidelines

## Design Approach

**Selected Approach:** Design System + Reference Hybrid

Drawing inspiration from Linear's professional minimalism and Notion's data organization excellence, combined with Carbon Design System principles for enterprise data applications. This approach prioritizes clarity, efficiency, and professional polish suitable for high-stakes operations management.

**Design Principles:**
1. **Clarity First:** Information hierarchy must be immediately scannable
2. **Speed of Use:** Every interaction optimized for rapid data entry and verification
3. **Status Transparency:** Visual states must be unambiguous and instantly recognizable
4. **Professional Polish:** Refined details without decorative excess

---

## Typography

**Font Stack:** Inter (primary), SF Mono (data/monospace)

**Hierarchy:**
- **Page Titles:** 32px/2rem, font-weight 700, tracking -0.02em
- **Section Headers:** 24px/1.5rem, font-weight 600, tracking -0.01em  
- **Card Titles:** 18px/1.125rem, font-weight 600
- **Body Text:** 15px/0.9375rem, font-weight 400, line-height 1.6
- **Table Headers:** 13px/0.8125rem, font-weight 600, uppercase, tracking 0.03em
- **Table Data:** 14px/0.875rem, font-weight 400, tabular-nums
- **Labels:** 13px/0.8125rem, font-weight 500
- **Helper Text:** 12px/0.75rem, font-weight 400, opacity 0.7
- **Monospace Data:** SF Mono 14px (OPS IDs, timestamps, technical codes)

---

## Layout System

**Spacing Primitives:** Tailwind units of 1, 2, 3, 4, 6, 8, 12, 16, 20

**Grid Structure:**
- Container max-width: 1440px (max-w-7xl)
- Dashboard layout: 240px fixed sidebar + fluid content area
- Content padding: px-6 py-4 (mobile), px-8 py-6 (desktop)
- Card spacing: gap-4 for dense data, gap-6 for section separation
- Form spacing: space-y-4 for form fields, space-y-6 for field groups

**Vertical Rhythm:**
- Section separation: mb-12 to mb-16
- Card internal padding: p-6
- Table cell padding: px-4 py-3
- Compact mode (data tables): px-3 py-2

---

## Core Components

### Navigation & Layout

**Top Navigation Bar:**
- Height: 64px, fixed position
- Left: Logo + Portal name (20px font-weight 600)
- Center: Global search bar (max-w-md)
- Right: Role badge, notifications icon, user menu dropdown
- Subtle bottom border (1px opacity 0.1)

**Sidebar Navigation:**
- Width: 240px, fixed on desktop, drawer on mobile
- Item height: 40px with 8px border-radius
- Active state: subtle background fill + left accent bar (4px width)
- Icon + label layout with 12px gap
- Collapsible section groups with chevron indicators

**Role Badge:**
- Pill shape with role-specific styling
- BACKROOM: Subtle blue treatment
- DATA TEAM: Subtle purple treatment  
- FTE: Subtle green treatment
- ADMIN: Subtle orange treatment
- 11px font-size, 600 weight, px-3 py-1

### Spreadsheet Grid Interface

**Grid Container:**
- Full-width with horizontal scroll
- Sticky header row (top: 0, z-index: 10)
- Row hover state with subtle background shift
- Alternating row backgrounds for improved scannability
- Cell borders: 1px solid with low opacity

**Cell Types:**
- Editable: White background, cursor text, focus ring (2px)
- Readonly: Slightly muted background, cursor default
- Dropdown: Chevron icon on right, opens below with 4px offset
- Date/Time: Calendar icon trigger, picker overlay
- Validation error: Left accent bar (3px red), shake animation on submit

**Grid Controls:**
- Top toolbar: Add row (+), Delete selected, Export draft, Column visibility toggle
- Column headers: Click to sort (arrow indicators), right-click for menu
- Row actions: Inline on hover (right side), Edit/Delete/Duplicate icons
- Batch selection: Checkboxes on left with header "Select all"

**Auto-save Indicator:**
- Top-right corner of grid
- States: "Saving..." (pulse), "Saved" (checkmark + fade), "Error" (alert)
- 13px font-size with icon (16px)

### Dashboard & Data Tables

**Filter Bar:**
- Horizontal layout above table
- Filter chips: Removable with × icon, 32px height
- Add filter dropdown: Group by category (Status, Date, Region, etc.)
- Quick filters: Row of preset buttons (Today, This Week, Pending, etc.)
- Search input: 320px width with search icon prefix

**Data Table:**
- Compact row height: 48px
- Sortable columns: Arrow indicators on hover/active
- Status column: Colored dot + text label
  - Pending: Yellow/amber dot
  - Ongoing: Blue dot  
  - Done: Green dot
- Action column: Always right-aligned, icons on row hover
- Expandable rows: Chevron indicator, slide-down detail panel

**Status Cards (Dashboard Overview):**
- Grid layout: 4 columns on desktop, 2 on tablet, 1 on mobile
- Card height: 120px with p-6
- Top: Metric label (13px uppercase tracking wide)
- Center: Large number (36px font-weight 700 tabular-nums)
- Bottom: Trend indicator (↑/↓ arrow + percentage, 13px)
- Subtle left accent bar (4px) color-coded by metric type

### Forms & Inputs

**Input Fields:**
- Height: 40px (default), 48px (prominent contexts)
- Border: 1.5px solid, rounded-lg (8px)
- Focus: 2.5px ring with offset
- Label: Above input, 13px font-weight 500, mb-2
- Helper text: Below input, 12px opacity 0.7, mt-1
- Error state: Border color shift + message below

**Dropdown/Select:**
- Chevron icon right-aligned
- Menu: 8px border-radius, max-height 320px with scroll
- Options: 40px height, hover background shift
- Multi-select: Checkboxes on left, selected count badge in trigger

**Date/Time Picker:**
- Calendar overlay: 320px width, shadow-lg
- Header: Month/year selectors with nav arrows
- Grid: 7-column week layout, today highlighted
- Time selector: Hour/minute spinners or input

**Button Hierarchy:**
- Primary: 40px height, px-6, font-weight 600, rounded-lg
- Secondary: Same size, outlined style (2px border)
- Tertiary: Text only with hover background
- Icon buttons: 40px × 40px, rounded-lg, icon centered
- Loading state: Spinner replaces text, button disabled

### Verification Workflow

**Verification Panel (Data Team):**
- Split layout: Left = row details table (60%), Right = actions (40%)
- Row-by-row display with checkbox per row
- Validation results: Inline badges (Success/Error/Warning)
- Per-row notes textarea (expandable)
- Bottom action bar: "Verify Selected" (primary), "Reject" (destructive), "Save Draft"

**Batch Actions Bar:**
- Sticky bottom position when rows selected
- Count indicator: "X rows selected"
- Actions: Verify, Generate CSV, Send to Seatalk, Clear selection
- Shadow-lg for prominence

**Validation Feedback:**
- Success: Checkmark icon + green accent
- Warning: Alert triangle + amber accent  
- Error: X icon + red accent
- Each with descriptive message text

### Modals & Overlays

**Modal Structure:**
- Max-width: 600px (default), 800px (data-heavy)
- Backdrop: Semi-transparent with blur effect
- Container: Rounded-xl (12px), shadow-2xl
- Header: p-6, title (20px font-weight 600), close button top-right
- Body: p-6, max-height with scroll
- Footer: p-6, border-top, actions right-aligned

**Toast Notifications:**
- Bottom-right position, stack vertically
- Width: 360px, p-4, rounded-lg
- Icon (24px) + message + close button
- Auto-dismiss: 5s with progress bar
- Types: Success (green accent), Error (red), Info (blue), Warning (amber)

### Admin Tools

**User Management Table:**
- Columns: OPS ID, Name, Role, Email, Status, Actions
- Inline editing: Click to edit, ESC to cancel, Enter to save
- Role selector: Dropdown with badge preview
- Reset password: Icon button → confirmation modal

**Allowlist Management:**
- Search/filter bar at top
- List view with add/remove actions
- Bulk import: Upload CSV → preview → confirm

---

## Animation & Transitions

**Principles:** Purposeful motion that enhances clarity, never distracts from data tasks.

**Micro-interactions:**
- Button press: Scale down to 0.98 on active (duration-75)
- Dropdown open: Slide-down with fade (duration-200 ease-out)
- Toast enter: Slide-left + fade (duration-300)
- Modal: Fade backdrop + scale content 0.95→1 (duration-200)
- Row hover: Background transition (duration-150)

**Data Transitions:**
- Status change: Color crossfade (duration-300)
- Number updates: Count-up animation for metrics (duration-500)
- Table sort: Rows reorder with stagger (duration-200 per row, max 50ms stagger)

**Loading States:**
- Skeleton screens: Pulse animation on placeholder blocks
- Spinner: Rotate animation (duration-1000 linear infinite)
- Progress bar: Indeterminate slide (duration-1500)

**Focus Indicators:**
- Ring appearance: duration-200 ease-out
- Ring should always be visible, never subtle

---

## Responsive Breakpoints

- Mobile: < 768px (sm:)
- Tablet: 768px - 1024px (md:)  
- Desktop: 1024px - 1440px (lg:)
- Wide: > 1440px (xl:)

**Mobile Adaptations:**
- Sidebar becomes drawer (slide from left)
- Grid switches to card list view (stack vertically)
- Filter bar stacks filters vertically  
- Status cards: 1 column
- Reduce padding: p-4 instead of p-6

---

## Accessibility Standards

- Keyboard navigation: All interactive elements accessible via Tab, Enter, Space, Esc
- Focus indicators: 2.5px visible ring on all focusable elements
- ARIA labels: Proper roles, labels, and descriptions for screen readers
- Color contrast: Minimum WCAG AA (4.5:1 for text, 3:1 for UI components)
- Form validation: Clear error messages associated with fields via aria-describedby
- Skip links: "Skip to main content" for keyboard users

---

## Images

**No hero image required.** This is a data-centric enterprise application.

**Icon Usage:**
- Use Heroicons (outline style for navigation, solid for actions)
- Size: 20px for buttons/nav, 24px for section headers, 16px for table cells
- Always maintain consistent stroke-width

**Placeholder States:**
- Empty states: Simple line illustration (max 200px) + helpful text
- No data: Icon + "No records found" message centered in table