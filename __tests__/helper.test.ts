import { it, expect, vi } from 'vitest'

it('check if data is returned', () => {
   const response = vi.fn()
   expect(response).toHaveBeenCalledWith()
})
