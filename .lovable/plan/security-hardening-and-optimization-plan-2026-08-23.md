# Security Hardening and Optimization Plan

Perform a comprehensive security audit and implement critical hardening measures for the Guild Tech Support application, focusing on authentication, authorization, data protection, and infrastructure resilience.

## Proposed Changes

### 1. Security & Hardening

#### Server-Side Validation & Sanitization
- Implement a global Zod-based validation layer for all server functions in `src/lib/admin.functions.ts` and `src/lib/catalog.functions.ts`.
- Ensure all inputs (strings, numbers, booleans) are strictly typed and sanitized before being used in database queries.

#### Authentication & Authorization
- Refine `requireSupabaseAuth` middleware in `src/integrations/supabase/auth-middleware.ts` to include robust token verification and handle expired or malformed sessions gracefully.
- Secure the `checkAdmin` role validation by ensuring it only runs on the server and uses the verified user context.
- Audit all RLS (Row Level Security) policies to ensure the "Least Privilege" principle is followed.

#### Sensitive Data Protection
- Remove any potential PII or secrets from logs.
- Configure security headers (CSP, HSTS, X-Frame-Options) to protect against XSS and Clickjacking.

### 2. Infrastructure Resilience

#### Rate Limiting
- Propose a rate-limiting strategy for authentication and high-impact administrative functions to prevent brute-force attacks.

#### Dependency Audit
- Scan for vulnerable dependencies and ensure all libraries are up-to-date with known security patches.

## Technical Details

### Security Headers
Adding a global middleware or updating the root route to include critical security headers:
- `Content-Security-Policy`: Restrict where scripts and styles can be loaded from.
- `Strict-Transport-Security`: Force HTTPS connections.
- `X-Frame-Options`: Prevent UI redressing (Clickjacking).
- `X-Content-Type-Options`: Prevent MIME sniffing.

### RLS Policy Audit (SQL)
```sql
-- Ensure admin functions are strictly scoped to the 'admin' role
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
GRANT SELECT ON public.user_roles TO authenticated;
-- Review and tighten policies for services, categories, and settings
```

### Input Sanitization (Zod)
```typescript
const CategorySchema = z.object({
  name: z.string().min(1).max(100).trim(),
  description: z.string().max(500).trim().optional(),
  display_order: z.number().int().nonnegative().default(0),
  is_active: z.boolean().default(true),
});
```

### Middleware Hardening
Refactor `requireSupabaseAuth` to use `supabase.auth.getUser()` which is more secure than `getSession()` as it re-validates the token with the Supabase auth server.
