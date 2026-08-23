
import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mock TanStack Start createServerFn
vi.mock('@tanstack/react-start', () => ({
  createServerFn: vi.fn(() => ({
    middleware: vi.fn().mockReturnThis(),
    validator: vi.fn().mockReturnThis(),
    handler: vi.fn((fn) => {
      const serverFn = async (input: any) => {
        // Simple mock context
        const context = {
          supabase: {
            from: vi.fn().mockReturnThis(),
            select: vi.fn().mockReturnThis(),
            order: vi.fn().mockReturnThis(),
            upsert: vi.fn().mockReturnThis(),
            delete: vi.fn().mockReturnThis(),
            eq: vi.fn().mockReturnThis(),
            rpc: vi.fn().mockReturnThis(),
          },
          userId: 'test-user-id',
        };
        return fn({ data: input, context });
      };
      // Attach metadata for testing
      (serverFn as any)._handler = fn;
      return serverFn;
    }),
  })),
}));

// Mock Supabase client
vi.mock('@/integrations/supabase/client', () => ({
  supabase: {
    from: vi.fn().mockReturnThis(),
    select: vi.fn().mockReturnThis(),
    order: vi.fn().mockReturnThis(),
    upsert: vi.fn().mockReturnThis(),
    delete: vi.fn().mockReturnThis(),
    eq: vi.fn().mockReturnThis(),
    rpc: vi.fn().mockReturnThis(),
  },
}));

// Mock auth middleware
vi.mock('@/integrations/supabase/auth-middleware', () => ({
  requireSupabaseAuth: vi.fn(),
}));
