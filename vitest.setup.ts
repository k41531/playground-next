import '@testing-library/jest-dom/vitest'
import { vi } from 'vitest';

global.fetch = vi.fn() as unknown as typeof fetch;