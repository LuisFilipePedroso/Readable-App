import React from 'react'
import Categories from './Categories'

const CategoriesList = ({ categoriesId }) => {
    return (
        <ul className="category-list">
            {
                categoriesId.map(id => (
                    <li key={id}>
                        <Categories id={id} />
                    </li>
                ))
            }
        </ul>
    )
}

export default CategoriesList