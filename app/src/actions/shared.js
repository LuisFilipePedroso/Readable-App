import { getInitialData } from '../utils/api'
import { receiveCategories } from './categories'
import { receivePosts } from './posts'
import { setAuthedUser } from './authedUser'
import { showLoading, hideLoading } from 'react-redux-loading'

const AUTHER_USER = "thingone"

export function handleInitialData() {
    return (dispatch) => {
        dispatch(showLoading())
        return getInitialData()
            .then(({ categories_array, posts }) => {
                dispatch(receiveCategories(categories_array.data.categories))
                dispatch(receivePosts(posts.data))
                dispatch(setAuthedUser(AUTHER_USER))
                dispatch(hideLoading())
            })
    }
}

