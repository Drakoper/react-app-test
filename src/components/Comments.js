import React, { useEffect, useState } from 'react'
import {connect} from 'react-redux'
import { getStory } from '../services/hnApi';
import { Commentary } from './Commentary'
import { Loader } from './Loader';

const Comments = ({comments}) => {
    const [fetchedComments, setFetchedComments] = useState();

    const getChildTree = (storyId) => {
        return getStory(storyId).then(story => {
            if (story.kids) {
                return Promise.all(story.kids.map(kid => getChildTree(kid))).then(kids => ({...story, kids}))
            } else {
                return story
            }
            })
    }
    
    useEffect(() => {
        getChildTree(window.location.pathname.slice(6)).then(data => {
            setFetchedComments(data)
        })
    }, []);

    if (comments){
        if (comments === {}){
            if (fetchedComments.kids) {
                return fetchedComments.kids.map(comment => {
                    if (comment) {
                        return <Commentary key={comment.id.toString()} comment={comment} />
                    } else {
                        return (
                            <Loader />
                        )
                    }
                })
            } else {
                return (
                    <Loader />
                )
            }
        } else {
            return comments.kids.map(comment => {
                if (comment) {
                    return <Commentary key={comment.id.toString()} comment={comment} />
                } else {
                    return (
                        <Loader />
                    )
                }
            }
        )}
        
    }
    if (fetchedComments) {
        if (fetchedComments.kids) {
            return fetchedComments.kids.map(comment => {
                if (comment) {
                    return <Commentary key={comment.id.toString()} comment={comment} />
                } else {
                    return (
                        <Loader />
                    )
                }
            })
        }
    } else {
        return (
            <Loader />
        )
    }
}
const mapStateToProps = state => {
    return state.posts.comments.comments
  }

export default connect(mapStateToProps, null)(Comments)