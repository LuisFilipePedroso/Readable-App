import React, { Component } from 'react';
import { connect } from 'react-redux'
import { formatPost, formatDate } from '../utils/helpers'
// import { handleCommentsFromPost } from '../actions/shared';
import { handleLikePost, handleDislikePost, handleDeletePost } from '../actions/posts'
import { FiThumbsUp } from "react-icons/fi"
import { FiThumbsDown } from "react-icons/fi"
import { TiPencil } from "react-icons/ti"
import { TiTrash } from "react-icons/ti"

import UpdatePost from './UpdatePost'

import { Link, Redirect, withRouter } from 'react-router-dom'

class Posts extends Component {

    //this.props.handleCommentsFromPost(id)
    state = {
        isOpen: false,
    }

    handleLikePost = (e) => {
        e.preventDefault()
        const { dispatch, post } = this.props
        const { voteScore, id } = post

        dispatch(handleLikePost(id, voteScore))
    }

    handleDislikePost = (e) => {
        e.preventDefault()
        const { dispatch, post } = this.props
        const { voteScore, id } = post

        dispatch(handleDislikePost(id, voteScore))
    }

    triggerModal = () => {
        this.setState(prevState => ({
            isOpen: !prevState.isOpen
        }))
    }

    handleDelete = (e) => {
        e.preventDefault()
        const { dispatch, post, toHome } = this.props
        const { id } = post

        dispatch(handleDeletePost(id))

        if (toHome === true)
            this.props.history.push('/')
    }

    render() {
        const { post } = this.props
        const { id, title, body, author, timestamp, voteScore, category, commentCount } = post
        const random = Math.random()

        return (
            <div className="card card-border card-md">
                <div className="card-header">
                    <div className="card-group">
                        <Link to={`/${category}/${id}`} className="text-decoration-none">
                            <h3>{title}</h3>
                        </Link>
                        <div className="card-button-group">
                            <button className="button" onClick={this.triggerModal}>
                                <TiPencil className="card-icon" />
                            </button>
                            <button className="button" onClick={this.handleDelete}>
                                <TiTrash className="card-icon" />
                            </button>
                        </div>
                    </div>
                    <span>By {author} - {formatDate(timestamp)} in {category}</span>
                </div>
                <div className="card-body">
                    <p>{body}</p>
                </div>
                <div className="card-footer">
                    <div className="button-group">
                        <button className="button" onClick={this.handleLikePost}>
                            <FiThumbsUp className="thumbs-icon" />
                        </button>
                        <button className="button" onClick={this.handleDislikePost}>
                            <FiThumbsDown className="thumbs-icon" />
                        </button>
                        <p>{voteScore}</p>
                    </div>
                    <div className="comments-count">
                        <p>{commentCount} comments</p>
                    </div>
                </div>

                {/* Modal to update Post */}
                <UpdatePost
                    key={random}
                    isOpen={this.state.isOpen}
                    post={this.props.post}
                    closeModal={this.triggerModal} />
            </div>
        );
    }
}

const mapStateToProps = ({ posts: { list: posts } }, props) => {
    const { id: postId } = props
    //const post = posts[id]
    const post = posts.find(({ id }) => id === postId)
    return {
        post: post
            ? formatPost(post)
            : null
    }
};

// const mapDispatchToProps = {
//     handleCommentsFromPost
// }

export default withRouter(connect(mapStateToProps)(Posts))