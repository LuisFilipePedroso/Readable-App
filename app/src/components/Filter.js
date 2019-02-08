import React from 'react'

const Filter = ({ handleChange, orderBy }) => (
    <div className="filterBy">
        <select value={orderBy} onChange={handleChange}>
            <option value="S">Order by Vote Score</option>
            <option value="D">Order by Date</option>
        </select>
    </div>
)

export default Filter