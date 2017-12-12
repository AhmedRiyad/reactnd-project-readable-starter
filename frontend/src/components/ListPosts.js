import React from 'react';
import {Feed} from 'semantic-ui-react'
import FeedEvent from './FeedEvent';


const PostList = (props) => {
    return (
        <Feed>
            <FeedEvent/>
            <FeedEvent/>
            <FeedEvent/>
            <FeedEvent/>
            <FeedEvent/>
            <FeedEvent/>
            <FeedEvent/>
            <FeedEvent/>
        </Feed>
    )
};

PostList.propTypes = {};


export default PostList;