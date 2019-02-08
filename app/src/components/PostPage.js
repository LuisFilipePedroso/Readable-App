import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux'
import { handleCommentsFromPost } from '../actions/comments'

import Posts from './Posts'
import Comments from './Comments'

class Post extends Component {
    componentDidMount() {
        const { dispatch, postId } = this.props
        dispatch(handleCommentsFromPost(postId))
    } 

    render() {
        const { post } = this.props

        return (
            <div>
                {post && post !== undefined ?
                    <Fragment>
                        <div className="align-card-center card-row justify-content-center">
                            <Posts key={post.id} id={post.id} toHome={true} />
                        </div>
                        <Comments key={post.id} parentId={post.id}/>
                    </Fragment>
                    :
                    <div style={{marginLeft: 25}}>
                        <h3>Error 404 - Page not Found</h3>
                    </div>}
            </div>
        );
    }
}

const mapStateToProps = ({ posts: { list: posts } }, props) => {
    const { postId } = props.match.params
    const post = posts.find(({ id }) => postId === id)
    return {
        post,
        postId
    }
}

export default connect(mapStateToProps)(Post);