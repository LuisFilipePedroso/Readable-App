import { RECEIVE_COMMENTS, ADD_COMMENT, UPDATE_COMMENT, DELETE_COMMENT, LIKE_COMMENT, DISLIKE_COMMENT } from '../actions/comments'

const INITIAL_STATE = { commentsList: [] }

const addComment = (({ commentsList, comment }) => commentsList.concat(comment))
const updateComment = (({ commentsList, comment }) => {
    const comments = commentsList.filter(c => c.id !== comment.id)
    return comments.concat(comment)
})
const deleteComment = (({ commentsList, id }) => commentsList.filter(c => c.id !== id))

const toggleLike = value => ({ commentsList = [], id }) => commentsList.map(comment => (
    {
        ...comment,
        voteScore: comment.id === id
            ? comment.voteScore + value
            : comment.voteScore
    }    
))

const likeComment = toggleLike(1)
const dislikeComment = toggleLike(-1)

export default function comments(state = INITIAL_STATE, action) {
    switch (action.type) {
        case RECEIVE_COMMENTS:
            return {
                ...state,
                commentsList: action.comments
            }
        case ADD_COMMENT:
            return {
                ...state,
                commentsList: addComment({
                    ...state,
                    ...action
                })
            }
        case UPDATE_COMMENT:
            return {
                ...state,
                commentsList: updateComment({
                    ...state,
                    ...action
                })
            }
        case DELETE_COMMENT: {
            return {
                ...state,
                commentsList: deleteComment({
                    ...state,
                    ...action
                })
            }
        }  
        case LIKE_COMMENT: {
            return {
                ...state,
                commentsList: likeComment({
                    ...state,
                    ...action
                })
            }
        } 
        case DISLIKE_COMMENT: {
            return {
                ...state,
                commentsList: dislikeComment({
                    ...state,
                    ...action
                })
            }
        } 
        default:
            return state
    }
}