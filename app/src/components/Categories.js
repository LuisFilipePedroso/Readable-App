import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

// import { Container } from './styles';

class Categories extends Component {
    render() {
        const { category } = this.props
        return (
            <div className="category">
                <Link to={`/${category.name}`} className="text-decoration-none">
                    <h3>{category.name}</h3>
                </Link>
            </div>
        );
    }
}

const mapStateToProps = ({ categories: { categoriesList: categories } }, { id }) => {
    const category = categories[id]
    return {
        category
    }
};

export default connect(mapStateToProps)(Categories)