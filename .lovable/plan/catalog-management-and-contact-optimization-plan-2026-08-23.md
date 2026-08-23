# Catalog Management and Contact Optimization Plan

Refine the recently implemented administrative dashboard and dynamic WhatsApp integration to ensure robust security, professional UI behavior, and perfect functionality.

## Technical Details

### Security & Server Logic
- **Admin Authentication**: Refactor `src/lib/admin.functions.ts` to use `context.supabase` from the `requireSupabaseAuth` middleware instead of the client-side `supabase` instance. This ensures role checks are performed against a verified server-side session.
- **Service Role for Admin Tasks**: Use `supabaseAdmin` (imported inside handlers) for write operations to bypass RLS, while strictly verifying the user's role using the authenticated client.
- **CSRF & Middleware**: Verify `src/start.ts` configuration to ensure `attachSupabaseAuth` and `csrfMiddleware` are correctly protecting server functions.

### Admin Dashboard Enhancements
- **Form Validation**: Add more robust client-side validation for category and service creation (e.g., ensuring numeric fields are valid).
- **UI State Management**: Fix potential race conditions or hydration mismatches in the dashboard.
- **Deletion Safeguards**: Add confirmation dialogs and handle cascading impacts (e.g., services orphaned by deleted categories).

### User Experience Refinements
- **Dynamic Contact Linking**: Ensure the global WhatsApp link from the `settings` table is seamlessly injected into the `Hero`, `Navbar`, and `Footer` components without redundant API calls.
- **Micro-interactions**: Add loading states to admin actions (saving/deleting) to improve responsiveness.

## Proposed Changes

### 1. Security Refactoring
- Modify `src/lib/admin.functions.ts` to use `.middleware([requireSupabaseAuth])`.
- Update `checkAdmin` to use `context.supabase`.

### 2. UI/UX Polishing
- Update `Navbar` and `Footer` to use the cached `catalog` query data for the WhatsApp link to avoid flashes of hardcoded values.
- Add error handling for failed admin operations with toast notifications.

### 3. Verification
- Test admin CRUD operations.
- Verify the global WhatsApp link updates immediately across the site when changed in the dashboard.
