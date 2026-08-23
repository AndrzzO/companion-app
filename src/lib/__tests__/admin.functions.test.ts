
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { 
  upsertCategory, 
  deleteCategory, 
  upsertService, 
  deleteService, 
  updateSetting 
} from '../admin.functions';

describe('admin.functions', () => {
  const mockContext = {
    supabase: {
      from: vi.fn().mockReturnThis(),
      upsert: vi.fn().mockReturnThis(),
      delete: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      rpc: vi.fn(),
    },
    userId: 'test-user-id',
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  const setupAdminMock = (isAdmin: boolean) => {
    mockContext.supabase.rpc.mockResolvedValue({ data: isAdmin, error: null });
  };

  describe('upsertCategory', () => {
    it('should upsert category if user is admin', async () => {
      setupAdminMock(true);
      mockContext.supabase.upsert.mockResolvedValue({ error: null });

      const input = { name: 'Test Category', display_order: 1 };
      const result = await (upsertCategory as any)._handler({ data: input, context: mockContext });

      expect(result).toEqual({ success: true });
      expect(mockContext.supabase.from).toHaveBeenCalledWith('categories');
      expect(mockContext.supabase.upsert).toHaveBeenCalledWith(input);
    });

    it('should throw forbidden error if user is not admin', async () => {
      setupAdminMock(false);
      const input = { name: 'Test Category' };

      await expect(
        (upsertCategory as any)._handler({ data: input, context: mockContext })
      ).rejects.toThrow('Forbidden: Admin access required');
    });

    it('should throw error if database upsert fails', async () => {
      setupAdminMock(true);
      mockContext.supabase.upsert.mockResolvedValue({ error: { message: 'DB Error' } });

      const input = { name: 'Test Category' };
      await expect(
        (upsertCategory as any)._handler({ data: input, context: mockContext })
      ).rejects.toThrow('DB Error');
    });
  });

  describe('deleteCategory', () => {
    it('should delete category if user is admin', async () => {
      setupAdminMock(true);
      mockContext.supabase.delete.mockReturnThis();
      mockContext.supabase.eq.mockResolvedValue({ error: null });

      const result = await (deleteCategory as any)._handler({ data: 'cat-id', context: mockContext });

      expect(result).toEqual({ success: true });
      expect(mockContext.supabase.from).toHaveBeenCalledWith('categories');
      expect(mockContext.supabase.delete).toHaveBeenCalled();
      expect(mockContext.supabase.eq).toHaveBeenCalledWith('id', 'cat-id');
    });
  });

  describe('upsertService', () => {
    it('should upsert service successfully', async () => {
      setupAdminMock(true);
      mockContext.supabase.upsert.mockResolvedValue({ error: null });

      const input = { name: 'Test Service', price: 100 };
      const result = await (upsertService as any)._handler({ data: input, context: mockContext });

      expect(result).toEqual({ success: true });
      expect(mockContext.supabase.from).toHaveBeenCalledWith('services');
    });
  });

  describe('deleteService', () => {
    it('should delete service successfully', async () => {
      setupAdminMock(true);
      mockContext.supabase.delete.mockReturnThis();
      mockContext.supabase.eq.mockResolvedValue({ error: null });

      const result = await (deleteService as any)._handler({ data: 'serv-id', context: mockContext });

      expect(result).toEqual({ success: true });
    });
  });

  describe('updateSetting', () => {
    it('should update setting successfully', async () => {
      setupAdminMock(true);
      mockContext.supabase.upsert.mockResolvedValue({ error: null });

      const input = { key: 'whatsapp', value: 'new-link' };
      const result = await (updateSetting as any)._handler({ data: input, context: mockContext });

      expect(result).toEqual({ success: true });
      expect(mockContext.supabase.from).toHaveBeenCalledWith('settings');
    });
  });
});
