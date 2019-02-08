import categories from './categories'
import posts from './posts'
import authedUser from './authedUser'
import comments from './comments'
import { combineReducers } from 'redux'
import { loadingBarReducer } from 'react-redux-loading'

export default combineReducers({
    categories,
    posts,
    authedUser,
    comments,
    loadingBar: loadingBarReducer
})