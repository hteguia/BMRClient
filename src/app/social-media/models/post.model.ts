import { Comment } from '../../core/models/comment.model';

export interface Post {
    id: number
    userId: number
    title: string
    createdDate: string
    content: string
    comments: Comment[]
    imageUrl?: string
  }