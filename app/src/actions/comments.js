import { showLoading, hideLoading } from 'react-redux-loading'
import { getCommentsFromPost, AddComment, UpdateComment, DeleteComment, saveLikeComment, saveDislikeComment } from '../utils/api'

import { handleUpdatePost } from '../actions/posts'

export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS'
export const ADD_COMMENT = 'ADD_COMMENT'
export const UPDATE_COMMENT = 'UPDATE_COMMENT'
export const DELETE_COMMENT = 'DELETE_COMMENT'
export const LIKE_COMMENT = 'LIKE_COMMENT'
export const DISLIKE_COMMENT = 'DISLIKE_COMMENT'

function receiveComments(comments) {
    return {
        type: RECEIVE_COMMENTS,
        comments
    }
}

function addComment(comment) {
    return {
        type: ADD_COMMENT,
        comment
    }
}

function updateComment(comment) {
    return {
        type: UPDATE_COMMENT,
        comment
    }
}

function deleteComment(id) {
    return {
        type: DELETE_COMMENT,
        id
    }
}

function likeComment(id) {
    return {
        type: LIKE_COMMENT,
        id
    }
}

function dislikeComment(id) {
    return {
        type: DISLIKE_COMMENT,
        id
    }
}

function generatePost(id) {
    return {
        id
    }
}

export function handleAddComment(comment) {
    return (dispatch) => {
        dispatch(showLoading())
        return AddComment(comment)
            .then(({ comment }) => {
                dispatch(addComment(comment))
                dispatch(handleUpdatePost(generatePost(comment.parentId)))
                dispatch(hideLoading())
            })
    }
}

export function handleUpdateComment(comment) {
    return (dispatch) => {
        dispatch(showLoading())
        return UpdateComment(comment)
            .then(({ comment }) => {
                dispatch(updateComment(comment))
                dispatch(hideLoading())
            })
    }
}

export function handleDeleteComment(id, parentId) {
    return (dispatch) => {
        dispatch(showLoading())
        return DeleteComment({ id })
            .then(() => {
                dispatch(deleteComment(id))
                dispatch(handleUpdatePost(generatePost(parentId)))
            })
            .then(() => dispatch(hideLoading()))
    }
}


export function handleCommentsFromPost(id) {
    return (dispatch) => {
        dispatch(showLoading())
        return getCommentsFromPost(id)
            .then(({ comments }) => {
                dispatch(receiveComments(comments.data))
                dispatch(hideLoading())
            })
    }
}

export function handleLikePost(id, voteScore) {
    return (dispatch) => {
        dispatch(likeComment(id))
        saveLikeComment({ id, voteScore })
            .catch(e => {
                console.log("Error on like post ", e)
                dispatch(dislikeComment(id))
                alert("There was an error on like post. Try again")
            })
    }
}

export function handleDislikePost(id, voteScore) {
    return (dispatch) => {
        dispatch(dislikeComment(id))
        saveDislikeComment({ id, voteScore })
            .catch(e => {
                console.log("Error on like post ", e)
                dispatch(likeComment(id))
                alert("There was an error on like post. Try again")
            })
    }
}