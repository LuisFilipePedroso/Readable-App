import { RECEIVE_POSTS, ADD_POST, LIKE_POST, DISLIKE_POST, UPDATE_POST, DELETE_POST } from '../actions/posts'
import { DeletePost } from '../utils/api';

const INITIAL_STATE = { list: [] }

const toggleLike = value => ({ list = [], id }) => list.map(item => (
    {
        ...item,
        voteScore: item.id === id
            ? item.voteScore + value
            : item.voteScore
    }
))

const like = toggleLike(1)
const dislike = toggleLike(-1)

const addToList = (({ list, post: { post } }) => list.concat( post ))

const updateList = (({ list, post: {post} }) => {
    const posts = list.filter(p => p.id !== post.id)
    return posts.concat(post)
})

const deletePost = (({ list, id }) => (list.filter(p => p.id !== id)))

export default function posts(state = INITIAL_STATE, action) {
    switch (action.type) {
        case RECEIVE_POSTS:
            return {
                ...state,
                list: action.posts
            }
        case ADD_POST: {
            return {
                ...state,
                list: addToList({
                    ...state,
                    ...action
                }),
            }
        }
        case UPDATE_POST: {
            return {
                ...state,
                list: updateList({
                    ...state,
                    ...action
                })
            }
        }
        case DELETE_POST: {
            return {
                ...state,
                list: deletePost({
                    ...state,
                    ...action
                })
            }
        }
        case LIKE_POST:
            return {
                ...state,
                list: like({
                    ...state,
                    ...action
                })
            }
        case DISLIKE_POST:
            return {
                ...state,
                list: dislike({
                    ...state,
                    ...action
                })
            }
        default:
            return state
    }
}