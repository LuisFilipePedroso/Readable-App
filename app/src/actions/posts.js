import { saveLikePost, saveDislikePost, addNewPost, UpdatePost, DeletePost } from '../utils/api'
import { showLoading, hideLoading } from 'react-redux-loading'

export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const ADD_POST = 'ADD_POST'
export const UPDATE_POST = 'UPDATE_POST'
export const DELETE_POST = 'DELETE_POST'
export const LIKE_POST = 'LIKE_POST'
export const DISLIKE_POST = 'DISLIKE_POST'

export function receivePosts(posts) {
    return {
        type: RECEIVE_POSTS,
        posts
    }
}

function addPost (post) {
    return {
        type: ADD_POST,
        post
    }
}

function updatePost (post) {
    return {
        type: UPDATE_POST,
        post
    }
}

function deletePost (id) {
    return {
        type: DELETE_POST,
        id
    }
}

function likePost(id) {
    return {
        type: LIKE_POST,
        id
    }
}

function dislikePost(id) {
    return {
        type: DISLIKE_POST,
        id
    }
}

export function handleLikePost(id, voteScore) {
    return (dispatch) => {
        dispatch(likePost(id))
        saveLikePost({ id, voteScore })
            .catch(e => {
                console.log("Error on like post ", e)
                dispatch(dislikePost(id))
                alert("There was an error on like post. Try again")
            })
    }
}

export function handleDislikePost (id, voteScore) {
    return (dispatch) => {
        dispatch(dislikePost(id))
        saveDislikePost({ id, voteScore })
            .catch(e => {
                console.log("Error on like post ", e)
                dispatch(likePost(id))
                alert("There was an error on like post. Try again")
            })
    }
}

export function handleSavePost (post) {
    return (dispatch) => {
        dispatch(showLoading())
        return addNewPost(post)
            .then((post) => dispatch(addPost(post)))
            .then(() => dispatch(hideLoading()))
    }
}

export function handleUpdatePost (post) {
    return (dispatch) => {
        dispatch(showLoading())
        return UpdatePost(post)
            .then((post) => dispatch(updatePost(post)))
            .then(() => dispatch(hideLoading()))
    }
}

export function handleDeletePost (id) {
    return (dispatch) => {
        dispatch(showLoading())
        return DeletePost({id})
            .then(() => dispatch(deletePost(id)))
            .then(() => dispatch(hideLoading()))
    }
}