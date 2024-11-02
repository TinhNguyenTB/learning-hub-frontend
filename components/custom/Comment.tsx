"use client"

import React, { useEffect, useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Pencil, Trash2, MessageSquare } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import dayjs from 'dayjs'
import { createNewComment, deleteComment, getAllComments, updateComment } from '@/app/actions/comments'
import { Session } from '@/lib/session'
import toast from 'react-hot-toast'
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

const CommentComponent: React.FC<{
    comment: IComment,
    depth?: number,
    onDelete: (id: string) => void,
    onEdit: (id: string, newContent: string) => void,

}> = ({ comment, depth = 0, onDelete, onEdit }) => {

    const [isEditing, setIsEditing] = useState(false)
    const [editContent, setEditContent] = useState(comment.content)

    return (
        <div className={`flex ${depth > 0 ? 'ml-2 mt-2' : 'mt-4'}`}>
            <Avatar className="w-8 h-8 mt-1">
                <AvatarImage src={comment.user?.image} alt={comment.user?.name} />
                <AvatarFallback>{comment.user?.name.slice(0, 1).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="ml-2 flex-grow">
                <div className="bg-muted rounded-2xl px-3 py-2">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-sm font-semibold">{comment.user?.name}</h3>
                            <span className="text-xs text-muted-foreground">
                                {dayjs(comment.createdAt).fromNow()}
                            </span>
                        </div>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                    <span className="sr-only">Open menu</span>
                                    <MessageSquare className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => setIsEditing(true)}>
                                    <Pencil className="mr-2 h-4 w-4" />
                                    <span>Edit</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => onDelete(comment?.id)}>
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    <span>Delete</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                    {isEditing ? (
                        <div className="mt-2">
                            <Input
                                value={editContent}
                                onChange={(e) => setEditContent(e.target.value)}
                                className="mb-2"
                            />
                            <div className="flex justify-end space-x-2">
                                <Button
                                    onClick={() => {
                                        onEdit(comment?.id, editContent)
                                        setIsEditing(false)
                                    }}
                                    size="sm"
                                >Save
                                </Button>
                                <Button onClick={() => setIsEditing(false)} size="sm" variant="outline">Cancel</Button>
                            </div>
                        </div>
                    ) : (
                        <p className="text-sm mt-1">{comment.content}</p>
                    )}
                </div>
            </div>
        </div>
    )
}

interface CommentsProps {
    session: Session
    courseId: string | undefined
}

export default function Comments({ session, courseId }: CommentsProps) {
    const [comments, setComments] = useState<IComment[] | []>([])
    const [newComment, setNewComment] = useState('')

    const [hasMore, setHasMore] = useState(true);
    const [current, setCurrent] = useState(1);

    const fetchAllComments = async (current: number) => {
        const res = await getAllComments(session, courseId!, current);
        if (res.data) {
            if (res.data.meta.total < 11 || res.data.result.length < 1) {
                setHasMore(false);
            }
            setComments([...res.data.result, ...comments])
        }
    }

    const fetchMoreComments = async (current: number) => {
        const res = await getAllComments(session, courseId!, current);
        if (res.data) {
            if (res.data.meta.total < 11 || res.data.result.length < 1) {
                setHasMore(false);
            }
            setComments([...comments, ...res.data.result,])
        }
    }

    const loadMoreComments = () => {
        if (hasMore) {
            fetchMoreComments(current + 1);
            setCurrent((prev) => prev + 1);
        }
    };

    const handlePostComment = async () => {
        const res = await createNewComment(session, courseId!, session.user.id, newComment)
        if (res.data) {
            setComments([res.data, ...comments])
            toast.success("Post comment success")
            fetchAllComments(1);
        }
        else if (res.error) {
            toast.error(res.message)
        }
        setNewComment('')
    }

    const handleDeleteComment = async (id: string) => {
        const res = await deleteComment(session, id)
        if (res.data) {
            setComments((prev) =>
                prev.filter(comment => comment.id !== res.data?.id)
            );
            toast.success("Delete comment success")
        }
        else if (res.error) {
            toast.error(res.message)
        }
    }

    const handleEditComment = async (id: string, newContent: string) => {
        const res = await updateComment(session, id, newContent);
        if (res.data) {
            setComments((prev) =>
                prev.map(comment =>
                    comment.id === id ? { ...comment, content: newContent } : comment
                )
            );
            toast.success("Edit comment success");
        } else if (res.error) {
            toast.error(res.message);
        }
    }

    useEffect(() => {
        fetchAllComments(1)
    }, [])

    return (
        <div className="max-w-full p-5">
            <div className="flex items-center space-x-2 mb-4">
                <Avatar>
                    <AvatarImage src={session.user.image} alt={session.user.name} />
                    <AvatarFallback>{session.user.name.slice(0, 1).toUpperCase()}</AvatarFallback>
                </Avatar>
                <Input
                    placeholder="Write a comment..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="flex-grow"
                />
                <Button onClick={handlePostComment}>Post</Button>
            </div>
            <div className="space-y-4">
                {comments.length > 0 && comments.map((comment, index) => (
                    <CommentComponent
                        key={comment.id + index}
                        comment={comment}
                        onDelete={handleDeleteComment}
                        onEdit={handleEditComment}
                    />
                ))}
            </div>
            {hasMore ?
                <Button
                    className='mt-5'
                    onClick={loadMoreComments}
                >
                    Load More
                </Button>
                :
                <></>
            }
        </div>
    )
}
