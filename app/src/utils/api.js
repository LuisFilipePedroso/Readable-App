import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:3001',
    headers: {
        'Authorization': '123'
    }
})

const generateId = () => {
    return Math.random().toString(20).substring(2) + (new Date()).getTime().toString(20);
}

export const getInitialData = () => {
    return Promise.all([
        api.get('/categories'),
        api.get('/posts'),
    ]).then(([categories_array, posts]) => ({
        categories_array,
        posts
    }))
}

export const getCommentsFromPost = (id) => {
    return Promise.resolve(
        api.get(`/posts/${id}/comments`)
    ).then((comments) => ({
        comments
    }))
}

export const AddComment = ({ body, author, parentId }) => {
    const id = generateId();
    const timestamp = Date.now()
    return Promise.resolve(
        api.post('/comments', {
            id,
            timestamp,
            body,
            author,
            parentId
        })
    ).then((comment) => ({
        comment: comment.data
    }))
}

export const UpdateComment = ({ id, body }) => {
    return Promise.resolve(
        api.put(`/comments/${id}`, {
            body
        })
    ).then((comment) => ({
        comment: comment.data
    }))
}

export const DeleteComment = ({ id }) => {
    return Promise.resolve(
        api.delete(`/comments/${id}`)
    )
}

const saveToggleLikeComment = value => ({ id, voteScore }) => {
    return Promise.resolve(
        api.put(`/comments/${id}`, {
            voteScore: voteScore + value
        })
    ).then((post) => ({
        post
    }))
}

export const saveLikeComment = saveToggleLikeComment(1)
export const saveDislikeComment = saveToggleLikeComment(-1)

const saveToggleLike = value => ({ id, voteScore }) => {
    return Promise.resolve(
        api.put(`/posts/${id}`, {
            voteScore: voteScore + value
        })
    ).then((post) => ({
        post
    }))
}

export const addNewPost = ({ title, body, author, category }) => {
    const id = generateId();
    const timestamp = Date.now()
    return Promise.resolve(
        api.post('/posts', {
            id,
            timestamp,
            title,
            body,
            author,
            category,
        })
    ).then((post) => ({
        post: post.data
    }))
}

export const UpdatePost = ({ id, title, body, author, category }) => {
    return Promise.resolve(
        api.put(`/posts/${id}`, {
            title,
            body,
            author,
            category
        })
    ).then((post) => ({
        post: post.data
    }))
}

export const DeletePost = ({ id }) => {
    return Promise.resolve(
        api.delete(`/posts/${id}`)
    )
}

export const saveLikePost = saveToggleLike(1)
export const saveDislikePost = saveToggleLike(-1)