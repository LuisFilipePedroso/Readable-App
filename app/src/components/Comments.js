import React, { Component } from 'react';
import { connect } from 'react-redux';
import { formatDate } from '../utils/helpers'

import { FiThumbsUp } from "react-icons/fi"
import { FiThumbsDown } from "react-icons/fi"
import { FiSend } from "react-icons/fi"
import { TiPencil } from "react-icons/ti"
import { TiTrash } from "react-icons/ti"

import UpdateComment from './UpdateComment'
import { handleAddComment, handleDeleteComment, handleLikePost, handleDislikePost } from '../actions/comments'

class Comments extends Component {
    state = {
        comment: "",
        isOpen: false
    }
    
    handleInputChange = (e) => {
        const { name, value } = e.target

        this.setState({
            [name]: value
        })
    }

    handleSubmit = async (e) => {
        e.preventDefault()
        const { dispatch, authedUser, parentId } = this.props

        const comment = {
            body: this.state.comment,
            author: authedUser,
            parentId
        }
        await dispatch(handleAddComment(comment))
        this.setState({
            comment: ""
        })
    }

    triggerModal = () => {
        this.setState(prevState => ({
            isOpen: !prevState.isOpen
        }))
    }

    handleDelete = async (e, id) => {
        e.preventDefault()
        const { dispatch, parentId } = this.props
        await dispatch(handleDeleteComment(id, parentId))
    }

    handleLikePost = (e, id, voteScore) => {
        e.preventDefault()
        const { dispatch } = this.props
        dispatch(handleLikePost(id, voteScore))
    }

    handleDislikePost = (e, id, voteScore) => {
        e.preventDefault()
        const { dispatch } = this.props
        dispatch(handleDislikePost(id, voteScore))
    }

    render() {
        const { comments, loading } = this.props
        const { comment } = this.state

        return (
            <div className="align-card-center card-column">
                <h3 style={{ marginBottom: 15, color: "#2FABA3" }}>Say what you think</h3>
                <div>
                    <form onSubmit={this.handleSubmit}>
                        <div>
                            <textarea
                                name="comment"
                                className="comment-input"
                                value={comment}
                                required
                                onChange={this.handleInputChange}
                            />
                        </div>
                        <div className="alignButtonToEnd">
                            <button
                                type="submit"
                                className="btnNewComment">
                                <FiSend className="icon" />
                                Add Comment
                            </button>
                        </div>
                    </form>
                </div>
                <h3 style={{ marginBottom: 15, color: "#2FABA3" }}>Comments</h3>
                <ul>
                    {!loading && comments.map(comment => (
                        <li key={comment.id}>
                            <div className="card card-border card-md" style={{ height: 80 }}>
                                <div className="card-body">
                                    <div className="card-group">
                                        <h3>{comment.body}</h3>
                                        <div className="card-button-group">
                                            <button className="button" onClick={this.triggerModal}>
                                                <TiPencil className="card-icon" />
                                            </button>
                                            <button className="button" onClick={(e) => this.handleDelete(e, comment.id)}>
                                                <TiTrash className="card-icon" />
                                            </button>
                                        </div>
                                    </div>
                                    <span>By {comment.author} - {formatDate(comment.timestamp)}</span>
                                    <div className="button-group" style={{ marginTop: 20 }}>
                                        <button className="button" onClick={(e) => this.handleLikePost(e, comment.id, comment.voteScore)}>
                                            <FiThumbsUp className="thumbs-icon" />
                                        </button>
                                        <button className="button" onClick={(e) => this.handleDislikePost(e, comment.id, comment.voteScore)}>
                                            <FiThumbsDown className="thumbs-icon" />
                                        </button>
                                        <p>{comment.voteScore}</p>
                                    </div>
                                </div>
                            </div>
                            <UpdateComment
                                key={comment.id}
                                isOpen={this.state.isOpen}
                                comment={comment}
                                closeModal={this.triggerModal} />
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}

const mapStateToProps = ({ comments: { commentsList: comments }, authedUser }, { parentId }) => {
    return {
        loading: comments === undefined,
        comments,
        authedUser,
        parentId
    }
};

export default connect(mapStateToProps)(Comments)