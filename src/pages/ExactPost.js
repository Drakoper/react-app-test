import React, { useEffect, useState } from 'react'
import Comments from '../components/Comments';
import { mapTime } from '../mappers/mapTime';
import { getStory } from '../services/hnApi';

export const ExactPost = () => {
    const id = window.location.pathname.toString().slice(6);

    const [post, setPost] = useState('');
    const [text, setText] = useState('');

    useEffect(() => {
        getStory(id).then(data => {
            setPost(data);
            const time = mapTime(data.time)
            if (data.kids) {
                setText(data.score + ' points by ' + data.by + ' ' + time + ' ago | ' + data.kids.length + ' comments' + ' | ');
            } else {
                setText(data.score + ' points by ' + data.by + ' ' + time + ' ago | 0 comments' + ' | ');
            }
        })
    }, []);

    return (
        <div className="ml-3 mt-3">
            <div className="mb-5">
                <h3 className="post-title">{post.title}</h3>
                <p className="post-text">{text}<a href={post.url}>{post.url}</a></p>
            </div>
            <Comments />
        </div>
    )
}
    