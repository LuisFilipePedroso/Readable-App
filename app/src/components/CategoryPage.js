import React, { Component } from 'react';
import { connect } from 'react-redux'

import Filter from './Filter'
import PostsList from './PostsList'
import CategoriesList from './CategoriesList'
import NewPost from './NewPost'

class Category extends Component {
    state = {
        orderBy: "S",
        isOpen: false,
    }

    handleChange = (e) => {
        const orderBy = e.target.value
        this.setState({
            orderBy
        })
    }

    triggerModal = () => {
        this.setState(prevState => ({
            isOpen: !prevState.isOpen
        })) 
    }

    render() {
        const { posts, category, categoriesId } = this.props
        console.log(this.props)
        const postsId = posts.sort((a, b) => this.state.orderBy === "S" ?
            b.voteScore - a.voteScore
            : b.timestamp - a.timestamp)
        const random = Math.random()

        return (
            <div>
                <CategoriesList categoriesId={categoriesId} />
                <div className="filter-buttons-group">
                    <div className="button-group">
                        <button
                            className="btnNewPost"
                            type="button"
                            onClick={this.triggerModal}>
                            New
                        </button>
                    </div>
                    <div className="category-detail-title">
                        <h4>Posts of <span>{category}</span> category</h4>
                    </div>
                    <Filter handleChange={this.handleChange} orderBy={this.state.orderBy} />
                </div>
                <PostsList postsId={postsId} />
                <NewPost 
                    key={random}
                    isOpen={this.state.isOpen}
                    closeModal={this.triggerModal}
                    categorySelected={this.props.category}/>
            </div>
        );
    }
}

const mapStateToProps = ({ categories: { categoriesList: categories }, posts: { list: posts } }, props) => {
    const { category } = props.match.params
    //const categoryName = categories.find(({name}) => name === category)
    const filterPosts = posts.filter(post => post.category === category)

    return {
        category,
        categoriesId: Object.keys(categories),
        posts: filterPosts,
    }
};

export default connect(mapStateToProps)(Category)
