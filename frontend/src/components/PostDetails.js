import React from 'react';
import {Header, Feed, Comment, Form, Icon, Button} from 'semantic-ui-react'
import Post from './Post';
import userImage from './../assets/images/no_image_user.png';
import {fetchCategoryPosts, fetchPost, fetchPosts, updatePostVote} from '../actions/post';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {fetchPostComments} from '../actions/comments';
import {Link} from 'react-router-dom'; // Tell Webpack this JS file uses this image


class PostDetails extends React.Component {

    componentDidMount() {
        this.props.fetchPost(this.props.postId);
        this.props.fetchPostComments(this.props.postId);
    }

    render() {
        return (
            <div>
                {this.props.post && (
                    <div>
                        <Feed>
                            <Post post={this.props.post}/>
                        </Feed>
                        <Comment.Group>
                            <Header as='h3' dividing>Comments</Header>


                            {this.props.comments && this.props.comments.map((comment) => (
                                <Comment key={comment.id}>
                                    <Comment.Avatar src={userImage}/>
                                    <Comment.Content>
                                        <Comment.Author as='a'>{comment.author}</Comment.Author>
                                        <Comment.Metadata>
                                            <div>{(new Date(comment.timestamp)).toLocaleString()}</div>
                                        </Comment.Metadata>
                                        <Comment.Text>How artistic!</Comment.Text>
                                        <Comment.Actions>
                                            <Icon name='triangle up'
                                                  link/>
                                            {comment.voteScore}
                                            <Icon name='triangle down'
                                                  style={{marginLeft: '3px'}}
                                                  link/>
                                            <a>Edit</a>
                                            <a style={{marginLeft: '5px'}}
                                               color='red'>
                                                Delete
                                            </a>
                                        </Comment.Actions>
                                    </Comment.Content>
                                </Comment>
                            ))}


                            {this.props.comments && (
                                <Form reply>
                                    <Form.TextArea/>
                                    <Button content='Add Reply' labelPosition='left' icon='edit' primary/>
                                </Form>)}
                        </Comment.Group>
                    </div>
                )}
            </div>
        )
    }

}

PostDetails.propTypes = {
    postId: PropTypes.string
};


const mapStateToProps = ({posts, comments}, props) => {
    return {
        post: posts.items[props.postId],
        comments: comments.items
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchPost: (id) => dispatch(fetchPost(id)),
        fetchPostComments: (id) => dispatch(fetchPostComments(id))
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(PostDetails);