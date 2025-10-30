import { z } from 'zod';

// Basic schemas
export const userSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  name: z.string().min(2),
  role: z.enum(['admin', 'user', 'manager']),
});

export const dispatchSchema = z.object({
  id: z.string(),
  title: z.string().min(3),
  description: z.string(),
  status: z.enum(['pending', 'in-progress', 'completed', 'cancelled']),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  assignedTo: z.string().optional(),
});

// Type inference
export type User = z.infer<typeof userSchema>;
export type Dispatch = z.infer<typeof dispatchSchema>;