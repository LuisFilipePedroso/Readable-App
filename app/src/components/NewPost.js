import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import ReactModal from 'react-modal'
import { IoMdCloseCircle } from "react-icons/io"
import { connect } from 'react-redux'

import { handleSavePost } from '../actions/posts'

ReactModal.setAppElement('#root')

class NewPost extends Component {
    state = {
        title: "",
        text: "",
        category: ""
    }

    componentDidMount() {
        const { categorySelected } = this.props || ""

        this.setState({
            category: categorySelected !== undefined ? categorySelected : ""
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
        const { dispatch, authedUser } = this.props
        const info = {
            title,
            body: text,
            category,
            author: authedUser
        }

        dispatch(handleSavePost(info))
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
                        <h2 className="modal-title">New Post</h2>
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
                                        required
                                        value={this.state.title}
                                        onChange={this.handleInputChange} />
                                </div>
                                <div>
                                    <label>What's happening?</label>
                                    <textarea
                                        className="modal-form modal-textarea"
                                        name="text"
                                        required
                                        value={this.state.text}
                                        onChange={this.handleInputChange} />
                                </div>
                                <div>
                                    <label>Category</label>
                                    <select
                                        value={this.state.category}
                                        onChange={this.handleInputChange}
                                        name="category"
                                        required
                                        className="modal-form modal-combobox">
                                        {this.state.category === "" 
                                        ? <option value="">Select a category</option>
                                        : ""}
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

export default connect(mapStateToProps)(NewPost)