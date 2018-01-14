import React from 'react';
import PropTypes from 'prop-types';
import {Feed, Icon, Label} from 'semantic-ui-react'
import {Link} from 'react-router-dom';


const Post = ({post}) => {
    return (
        <Feed.Event>
            <Feed.Label className='votes'>
                <Feed.Like>
                    <Icon name='triangle up' link/>
                </Feed.Like>
                {post.voteScore}
                <Feed.Like>
                    <Icon name='triangle down' link/>
                </Feed.Like>
            </Feed.Label>
            <Feed.Content>
                <Feed.Summary>
                    <a>{post.title}</a>
                    <br/>
                    <Feed.Date>
                        submitted on {(new Date(post.timestamp)).toLocaleString()} by <a>{post.author}</a>
                    </Feed.Date>
                </Feed.Summary>
                <Feed.Extra text>
                    {post.body}
                </Feed.Extra>
                <Feed.Meta>
                    <Feed.Summary>
                        <a>Edit</a>
                        <a style={{marginLeft: '5px'}}>Delete</a>
                    </Feed.Summary>
                </Feed.Meta>
                <br/>
                <Feed.Meta>
                    <Feed.Summary>
                        <a>{post.commentCount} comments</a>
                    </Feed.Summary>
                </Feed.Meta>
                <br/>
                <Feed.Meta>
                    <Label color='blue'
                           as={Link}
                           to={`/${post.category}`}
                            >{post.category}</Label>
                </Feed.Meta>
            </Feed.Content>
        </Feed.Event>
    )
};

Post.propTypes = {
    post: PropTypes.object.isRequired,
};


export default Post;