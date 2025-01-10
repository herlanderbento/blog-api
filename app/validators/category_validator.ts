import vine from '@vinejs/vine'

export const createCategoryValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(6),
    description: vine.string().trim().escape(),
    is_active: vine.boolean().optional(),
  })
)

export const listCategoriesValidator = vine.compile(
  vine.object({
    page: vine.number().optional(),
    per_page: vine.number().optional(),
    sort: vine.string().optional(),
    sort_dir: vine.enum(['asc', 'desc']).optional(),
    filter: vine.string().optional(),
  })
)
export const getCategoryValidator = vine.compile(
  vine.object({
    id: vine.string().trim().uuid(),
  })
)

export const updateCategoryValidator = vine.compile(
  vine.object({
    id: vine.string().optional(),
    name: vine.string().optional(),
    description: vine.string().optional(),
    is_active: vine.boolean().optional(),
  })
)
