import React, { Component } from 'react'
import { connect } from 'react-redux'
import Filter from './Filter'
import PostsList from './PostsList'
import CategoriesList from './CategoriesList'
import NewPost from '../components/NewPost'

class Dashboard extends Component {
    //OrderBy: "S" => Score; "D" => Date
    state = {
        orderBy: "S",
        isOpen: false
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
        const { posts, categoriesId } = this.props
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
                    <Filter handleChange={this.handleChange} orderBy={this.state.orderBy} />
                </div>
                <div>
                    <PostsList postsId={postsId} />
                </div>
                <NewPost
                    key={random}
                    isOpen={this.state.isOpen}
                    closeModal={this.triggerModal} />
            </div>
        );
    }
}

const mapStateToProps = ({ categories: { categoriesList: categories }, posts: { list: posts } }) => {
    return {
        categoriesId: Object.keys(categories),
        posts
    }
};

export default connect(mapStateToProps)(Dashboard)
