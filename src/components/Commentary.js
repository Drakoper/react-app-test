import React from 'react';

export const Commentary = ({comment}) => {
    let commentChildren = []
    if (comment.kids) {
        commentChildren = comment.kids.map(kid => <Commentary comment={kid} key={comment.kids.indexOf(kid)} />)
    }

    return (
    <div className="comment-with-children ml-5">
        <div className="post">
            <p className="post-text">{comment.by}</p>
            <div className="post-title" dangerouslySetInnerHTML={{__html: comment.text}}></div>
        </div>
        <div className="children ml-5">
            {commentChildren}
        </div>
    </div>
    )
}