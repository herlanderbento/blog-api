import vine from '@vinejs/vine'

export const createPostValidator = vine.compile(
  vine.object({
    user_id: vine.string().trim().uuid(),
    category_id: vine.string().trim().uuid(),
    title: vine.string().trim().minLength(6),
    content: vine.string().trim().escape(),
    image_url: vine.string().optional(),
  })
)

export const listPostsValidator = vine.compile(
  vine.object({
    page: vine.number().optional(),
    per_page: vine.number().optional(),
    sort: vine.string().optional(),
    sort_dir: vine.enum(['asc', 'desc']).optional(),
    filter: vine.string().optional(),
  })
)

export const updatePostValidator = vine.compile(
  vine.object({
    category_id: vine.string().optional(),
    title: vine.string().optional(),
    content: vine.string().optional(),
    image_url: vine.string().optional(),
  })
)