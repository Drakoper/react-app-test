import React from 'react'
import { mapTime } from '../mappers/mapTime';

export const Poste = ({post, count}) => {
    const link = `./post/${post.id}`
    const time = mapTime(post.time)
    let text = ''
    if (post.kids) {
        text = post.score + ' points by ' + post.by + ' ' + time + ' ago | ' + post.kids.length + ' comments';
    } else {
        text = post.score + ' points by ' + post.by + ' ' + time + ' ago | 0 comments';
    }

    if (text !== '') {
        return (
            <a href={link} className="post-link">
                <div className="post ml-5">
                    <h5 className="post-title">{count + '. ' + post.title}</h5>
                    <p className="post-text">{text}</p>
                </div>
            </a>
        )
    } else {
        return (
            <div className="post ml-5">
                <div className="spinner-border" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>)
    }
}