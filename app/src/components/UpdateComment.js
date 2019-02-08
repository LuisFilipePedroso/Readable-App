import React, { Component } from 'react'
import ReactModal from 'react-modal'
import { IoMdCloseCircle } from "react-icons/io"
import { connect } from 'react-redux'

import { handleUpdateComment } from '../actions/comments'

ReactModal.setAppElement('#root')

class UpdateComment extends Component {
    state = {
        id: "",
        body: "",
    }

    componentDidMount() {
        const { comment } = this.props
        const { id, body } = comment

        this.setState({
            id,
            body,
        })
    }

    handleInputChange = e => {
        const { name, value } = e.target

        this.setState({
            [name]: value
        })
    }

    handleSubmit = e => {
        e.preventDefault()
        const { id, body } = this.state
        const { dispatch } = this.props

        const comment = {
            id,
            body,
        }

        dispatch(handleUpdateComment(comment))
        this.props.closeModal()
    }

    closeModal = (e) => {
        e.preventDefault()
        this.props.closeModal()
    }

    render() {
        const { isOpen } = this.props

        return (
            <ReactModal
                isOpen={isOpen}
                onRequestClose={this.closeModal}
                shouldCloseOnOverlayClick={false}
                contentLabel="Minimal Modal Example">
                <div className="modal">
                    <div className="modal-header">
                        <h2 className="modal-title">Update Comment</h2>
                        <button className="btn-close-modal" onClick={this.closeModal}>
                            <IoMdCloseCircle />
                        </button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={this.handleSubmit}>
                            <div className="modal-wrapper">
                                <div>
                                    <label>Say what you think</label>
                                    <textarea
                                        className="modal-form modal-textarea"
                                        name="body"
                                        value={this.state.body}
                                        onChange={this.handleInputChange} />
                                </div>
                                <button type="submit" className="btn btn-modal-success">Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            </ReactModal>
        );
    }
}

const mapStateToProps = ({ comments: { commentsList: comments }, authedUser }) => {
    return {
        comments,
        authedUser
    }
};

export default connect(mapStateToProps)(UpdateComment)