export function formatDate(timestamp) {
    const date = new Date(parseInt(timestamp, 10))
    return date.toLocaleDateString()
}

export function formatPost(tweet) {
    const { id, title, body, author, timestamp, voteScore, category, commentCount } = tweet

    return {
        id,
        title,
        body,
        author,
        timestamp,
        voteScore,
        category,
        commentCount
    }
}