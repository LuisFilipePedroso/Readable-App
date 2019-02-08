import React, { Component } from 'react'
import ReactModal from 'react-modal'
import { IoMdCloseCircle } from "react-icons/io"
import { connect } from 'react-redux'

import { handleUpdatePost } from '../actions/posts'

ReactModal.setAppElement('#root')

class UpdatePost extends Component {
    state = {
        title: "",
        text: "",
        category: ""
    }

    componentDidMount() {
        const { post } = this.props
        const { title, body, category } = post

        this.setState({
            title,
            text: body,
            category
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
        const { title, text, category } = this.state
        const { dispatch, authedUser, post } = this.props
        const info = {
            id: post.id,
            title,
            body: text,
            category,
            author: authedUser
        }

        dispatch(handleUpdatePost(info))
        this.props.closeModal()
    }

    closeModal = (e) => {
        e.preventDefault()
        this.props.closeModal()
    }

    render() {
        const { isOpen, categories } = this.props

        return (
            <ReactModal
                isOpen={isOpen}
                onRequestClose={this.closeModal}
                shouldCloseOnOverlayClick={false}
                contentLabel="Minimal Modal Example">
                <div className="modal">
                    <div className="modal-header">
                        <h2 className="modal-title">Update Post</h2>
                        <button className="btn-close-modal" onClick={this.closeModal}>
                            <IoMdCloseCircle />
                        </button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={this.handleSubmit}>
                            <div className="modal-wrapper">
                                <div>
                                    <label>Title</label>
                                    <input
                                        className="modal-form modal-input"
                                        name="title"
                                        value={this.state.title}
                                        onChange={this.handleInputChange} />
                                </div>
                                <div>
                                    <label>What's happening?</label>
                                    <textarea
                                        className="modal-form modal-textarea"
                                        name="text"
                                        value={this.state.text}
                                        onChange={this.handleInputChange} />
                                </div>
                                <div>
                                    <label>Category</label>
                                    <select
                                        value={this.state.category}
                                        onChange={this.handleInputChange}
                                        name="category"
                                        className="modal-form modal-combobox">
                                        {categories.map(category => (
                                            <option
                                                value={category.name}
                                                defaultValue={category.name}
                                                key={category.name}>
                                                {category.name}
                                            </option>
                                        ))}
                                    </select>
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

const mapStateToProps = ({ categories: { categoriesList: categories }, authedUser }) => {
    return {
        categories,
        authedUser
    }
};

export default connect(mapStateToProps)(UpdatePost)