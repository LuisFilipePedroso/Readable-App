import React from 'react';
import Posts from './Posts'

const PostsList = ({ postsId }) => {
    return (
        <ul className="align-card-center card-row justify-content-space-between mt-2 list-style-none">
            {postsId.map(post => (
                <li key={post.id}>
                    <Posts id={post.id} toHome={false} />
                </li>
            ))}
        </ul>
    )
}

export default PostsList