import React, { useEffect, useState } from 'react'
import {connect} from 'react-redux'
import { getStoriesIds, getStory } from '../services/hnApi';
import { Loader } from './Loader';
import { Poste } from './Poste';

const Posts = ({posts}) => {
    const [fetchedPosts, setFetchedPosts] = useState([]);

    useEffect(() => {
        getStoriesIds().then(datas => Promise.all(
            datas.map(data => getStory(data))).then(dt => {
                setFetchedPosts(dt)
            })
        )
    }, []);
    if (posts){
        if (!posts.length){
            return fetchedPosts.map(post => {
                if (post) {
                    return <Poste key={post.id.toString()} post={post} count={fetchedPosts.indexOf(post) + 1} />
                } else {
                    return <Loader />
                }
            })
        }
        return posts.map(post => {
            if (post) {
                return <Poste key={post.id.toString()} post={post} count={posts.indexOf(post) + 1} />
            } else {
                return <Loader />
            }
        })
    }
    if(fetchedPosts.length) {
        return fetchedPosts.map(post => {
            if (post) {
                return <Poste key={post.id.toString()} post={post} count={fetchedPosts.indexOf(post) + 1} />
            } else {
                return <Loader />
            }
        })
    } else {
        return <Loader />
    }
}
const mapStateToProps = state => {
        return {
            posts: state.posts.posts.posts
        }
    }

export default connect(mapStateToProps, null)(Posts)