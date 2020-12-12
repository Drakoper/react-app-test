import {FETCH_POSTES, FETCH_COMMENTS} from './types'


export function fetchPostes(posts) {
    return {
        type: FETCH_POSTES,
        payload: posts
    }
}

export function fetchComments(comments) {
    return {
        type: FETCH_COMMENTS,
        payload: comments
    }
}