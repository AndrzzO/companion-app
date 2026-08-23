# Plan: Admin Catalog Management and WhatsApp Link Configuration

I will implement a comprehensive admin area for managing the catalog (categories and services) and a global setting for the contact WhatsApp link, ensuring all requests are met with a professional engineering aesthetic.

## User Review Required

> [!IMPORTANT]
> The admin area will be accessible at `/dashboard` after logging in at `/auth`. I will add a "Settings" section to manage the global WhatsApp link.

- **WhatsApp Link**: Should I add a field in the database for a "Global WhatsApp Link" or should I use an environment variable? A database table `settings` is better for runtime editing without code changes.

## Proposed Changes

### Database & Schema
- Create a new migration for a `settings` table:
  - `key` (text, primary key): e.g., 'whatsapp_link'
  - `value` (text)
  - `updated_at` (timestamptz)
- Add RLS to `settings`: `anon/authenticated` can read, only `admin` can update.
- Seed the initial `whatsapp_link`.

### Server Functions
- Create `src/lib/admin.functions.ts` for admin operations:
  - `updateSettings(key, value)`
  - `upsertCategory(category)`
  - `deleteCategory(id)`
  - `upsertService(service)`
  - `deleteService(id)`
- Add `getSettings()` to `src/lib/catalog.functions.ts`.

### UI & Components
- **Admin Dashboard (`src/routes/_authenticated/dashboard.tsx`)**:
  - Replace placeholder with a full management interface.
  - Tabbed interface: "Services", "Categories", "Settings".
  - Forms for adding/editing services and categories.
  - List views with "Delete" and "Edit" actions.
  - Simple form in "Settings" to change the WhatsApp link.
- **Dynamic WhatsApp Link**:
  - Update `Solutions.tsx` and any other component using the link to fetch it from the database/context instead of hardcoding.
- **Navbar update**: Add a link to the dashboard if the user is an admin (optional, or just keep it hidden).

## Technical Details
- Use `shadcn/ui` components (Table, Dialog, Form, Input, etc.) for a consistent look.
- Use `TanStack Query` for state management and optimistic updates in the admin panel.
- Implement server-side validation using Zod in server functions.
- Ensure the WhatsApp link redirection works correctly by fetching the latest value from the `settings` table.

---
*Note: I will start by creating the database migration and the admin UI.*
