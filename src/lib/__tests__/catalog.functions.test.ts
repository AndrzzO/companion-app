
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getCatalog, getSettings } from '../catalog.functions';
import { supabase } from '@/integrations/supabase/client';

describe('catalog.functions', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getCatalog', () => {
    it('should fetch categories, services and settings successfully', async () => {
      const mockCategories = [{ id: '1', name: 'Web' }];
      const mockServices = [{ id: '1', name: 'Site' }];
      const mockSettings = [{ key: 'whatsapp', value: 'link' }];

      const fromSpy = vi.spyOn(supabase, 'from');
      
      // Mocking sequential calls to supabase.from()
      fromSpy.mockImplementation((table: string) => {
        let data: any = [];
        if (table === 'categories') data = mockCategories;
        if (table === 'services') data = mockServices;
        if (table === 'settings') data = mockSettings;

        return {
          select: vi.fn().mockReturnThis(),
          order: vi.fn().mockReturnThis(),
          then: (resolve: any) => resolve({ data, error: null })
        } as any;
      });

      const result = await (getCatalog as any)();

      expect(result.categories).toEqual(mockCategories);
      expect(result.services).toEqual(mockServices);
      expect(result.settings).toEqual(mockSettings);
    });

    it('should throw error if any database call fails', async () => {
      vi.spyOn(supabase, 'from').mockReturnValue({
        select: vi.fn().mockReturnThis(),
        order: vi.fn().mockReturnThis(),
        then: (resolve: any) => resolve({ data: null, error: { message: 'Database error' } })
      } as any);

      await expect((getCatalog as any)()).rejects.toThrow('Database error');
    });
  });

  describe('getSettings', () => {
    it('should fetch settings successfully', async () => {
      const mockSettings = [{ key: 'whatsapp', value: 'link' }];
      vi.spyOn(supabase, 'from').mockReturnValue({
        select: vi.fn().mockReturnThis(),
        then: (resolve: any) => resolve({ data: mockSettings, error: null })
      } as any);

      const result = await (getSettings as any)();
      expect(result).toEqual(mockSettings);
    });
  });
});
