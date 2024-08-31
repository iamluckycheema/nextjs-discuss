import type { Comment } from '@prisma/client'
import { db } from '@/db'
import { log } from 'console'

export type CommentWithAuthor = Comment & {
  user: { name: string | null; image: string | null }
}

export function fetchCommentsByPostId(
  postId: string
): Promise<CommentWithAuthor[]> {
  console.log("makin' query")

  return db.comment.findMany({
    where: {
      postId,
    },
    include: {
      user: {
        select: {
          name: true,
          image: true,
        },
      },
    },
  })
}
