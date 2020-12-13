import React from 'react';
import {connect} from 'react-redux'
import {fetchPostes, fetchComments} from '../redux/actions'
import { getStoriesIds, getStory } from '../services/hnApi';

class Header extends React.Component{
    getChildTree = (storyId) => {
        return getStory(storyId).then(story => {
            if (story.kids) {
                return Promise.all(story.kids.map(kid => this.getChildTree(kid))).then(kids => ({...story, kids}))
            }
            return story
            })
    }

    constructor(props) {
      super(props)
  
      this.state = {
        comments: this.getChildTree('2921983'),
        posts: getStoriesIds().then(datas => Promise.all(
            datas.map(data => getStory(data))).then(dt => dt)
        ),
        interval: setInterval(() => {
            if (window.location.pathname==='/') {
                getStoriesIds().then(datas => Promise.all(
                    datas.map(data => getStory(data))).then(dt => {
                        this.setState({posts: dt});

                        this.props.fetchPostes(this.state)
                    })
                )
            } else {
                this.getChildTree(window.location.pathname.slice(6)).then(data => {
                    this.setState({comments: data})

                    this.props.fetchComments(this.state)
                })
            }
        }, 60000)
      }
    }

    setStoriesIds = () => {
        if (window.location.pathname==='/') {
            getStoriesIds().then(datas => Promise.all(
                datas.map(data => getStory(data))).then(dt => {
                    this.setState({posts: dt});
                    
                    this.props.fetchPostes(this.state)
                })
            )
        } else {
            this.getChildTree(window.location.pathname.slice(6)).then(data => {
                this.setState({comments: data})
                    
                this.props.fetchComments(this.state)
            })
        }
    }

    render() {
        let imgLink = '../../icons/logo.jpg';
        if (window.location.pathname === '/') {
            imgLink = './icons/logo.jpg';
        };
        
        return (
            <div className="header d-flex justify-content-between">
                <div className="decorative mt-1">
                    <div className="logo-carrier">
                        <img src={imgLink} className="rounded-sm header-logo" alt="..."/>
                    </div>
                    <div className="text-carrier">
                        <h1 className="header-text">
                            Timofey Amelin's news
                        </h1>
                    </div>
                </div>
                <div className="refresh-button-carrier mt-2 mr-2">
                    <button className="btn btn-outline-light" type="button" onClick={this.setStoriesIds}>
                        <h3 className="refresh-button-text">
                            Refresh
                        </h3>
                    </button>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = {
    fetchPostes, fetchComments
}

export default connect(null, mapDispatchToProps)(Header)