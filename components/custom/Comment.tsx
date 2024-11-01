"use client"

import React, { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Pencil, Trash2, MessageSquare, X } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface Comment {
    id: string
    author: string
    avatar: string
    content: string
    timestamp: string
    children?: Comment[]
}

const initialComments: Comment[] = [
    {
        id: '1',
        author: 'Alice Johnson',
        avatar: '/placeholder.svg?height=40&width=40',
        content: 'This is a great post! Thanks for sharing.',
        timestamp: '2h',
        children: [
            {
                id: '2',
                author: 'Bob Smith',
                avatar: '/placeholder.svg?height=40&width=40',
                content: 'I agree, very insightful.',
                timestamp: '1h',
                children: [
                    {
                        id: '3',
                        author: 'Charlie Brown',
                        avatar: '/placeholder.svg?height=40&width=40',
                        content: 'Could you elaborate more on that point?',
                        timestamp: '30m',
                    },
                ],
            },
        ],
    },
    {
        id: '4',
        author: 'David Lee',
        avatar: '/placeholder.svg?height=40&width=40',
        content: 'Interesting perspective. I have a different view on this.',
        timestamp: '3h',
    },
]

const CommentComponent: React.FC<{
    comment: Comment,
    depth?: number,
    onDelete: (id: string) => void,
    onEdit: (id: string, newContent: string) => void
}> = ({ comment, depth = 0, onDelete, onEdit }) => {

    const [isReplying, setIsReplying] = useState(false)
    const [replyContent, setReplyContent] = useState('')
    const [isEditing, setIsEditing] = useState(false)
    const [editContent, setEditContent] = useState(comment.content)

    const handleReply = () => {
        console.log(`Replying to comment ${comment.id}: ${replyContent}`)
        setIsReplying(false)
        setReplyContent('')
    }

    const handleEdit = () => {
        onEdit(comment.id, editContent)
        setIsEditing(false)
    }

    return (
        <div className={`flex ${depth > 0 ? 'ml-2 mt-2' : 'mt-4'}`}>
            <Avatar className="w-8 h-8 mt-1">
                <AvatarImage src={comment.avatar} alt={comment.author} />
                <AvatarFallback>{comment.author.slice(0, 1).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="ml-2 flex-grow">
                <div className="bg-muted rounded-2xl px-3 py-2">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-sm font-semibold">{comment.author}</h3>
                            <span className="text-xs text-muted-foreground">{comment.timestamp}</span>
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
                                <DropdownMenuItem onClick={() => onDelete(comment.id)}>
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
                                <Button onClick={handleEdit} size="sm">Save</Button>
                                <Button onClick={() => setIsEditing(false)} size="sm" variant="outline">Cancel</Button>
                            </div>
                        </div>
                    ) : (
                        <p className="text-sm mt-1">{comment.content}</p>
                    )}
                </div>
                <div className="flex items-center mt-1 space-x-3 text-xs font-semibold text-muted-foreground">
                    <Button variant="ghost" size="sm" className="h-auto p-0" onClick={() => setIsReplying(!isReplying)}>
                        Reply
                    </Button>
                </div>
                {isReplying && (
                    <div className="mt-2 flex items-center">
                        <Input
                            value={replyContent}
                            onChange={(e) => setReplyContent(e.target.value)}
                            placeholder="Write a reply..."
                            className="flex-grow mr-2"
                        />
                        <Button onClick={handleReply} size="sm">
                            Reply
                        </Button>
                    </div>
                )}
                {comment.children && comment.children.length > 0 && (
                    <div className="mt-2">
                        {comment.children.map((reply) => (
                            <CommentComponent key={reply.id} comment={reply} depth={depth + 1} onDelete={onDelete} onEdit={onEdit} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default function Comments() {
    const [comments, setComments] = useState(initialComments)
    const [newComment, setNewComment] = useState('')

    const handlePostComment = () => {
        const newCommentObj: Comment = {
            id: Date.now().toString(),
            author: 'Current User',
            avatar: '/avatar_placeholder.jpg?height=40&width=40',
            content: newComment,
            timestamp: 'Just now'
        }
        setComments([newCommentObj, ...comments])
        setNewComment('')
    }

    const handleDeleteComment = (id: string) => {
        const deleteComment = (comments: Comment[]): Comment[] => {
            return comments.filter(comment => {
                if (comment.id === id) {
                    return false
                }
                if (comment.children) {
                    comment.children = deleteComment(comment.children)
                }
                return true
            })
        }
        setComments(deleteComment(comments))
    }

    const handleEditComment = (id: string, newContent: string) => {
        const editComment = (comments: Comment[]): Comment[] => {
            return comments.map(comment => {
                if (comment.id === id) {
                    return { ...comment, content: newContent }
                }
                if (comment.children) {
                    comment.children = editComment(comment.children)
                }
                return comment
            })
        }
        setComments(editComment(comments))
    }

    return (
        <div className="max-w-full p-4">
            <div className="flex items-center space-x-2 mb-4">
                <Avatar>
                    <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Your Avatar" />
                    <AvatarFallback>YA</AvatarFallback>
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
                {comments.map((comment) => (
                    <CommentComponent
                        key={comment.id}
                        comment={comment}
                        onDelete={handleDeleteComment}
                        onEdit={handleEditComment}
                    />
                ))}
            </div>
        </div>
    )
}
