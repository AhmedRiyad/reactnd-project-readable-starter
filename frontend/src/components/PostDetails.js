import React from 'react';
import {Header, Feed, Comment, Form, Icon, Button, Divider, Modal} from 'semantic-ui-react'
import Post from './Post';
import userImage from './../assets/images/no_image_user.png';
import {fetchPost} from '../actions/post';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {addComment, fetchPostComments, updateCommentVote} from '../actions/comments';
import EditComment from './EditComment';


class PostDetails extends React.Component {

    componentDidMount() {
        this.props.fetchPost(this.props.postId);
        this.props.fetchPostComments(this.props.postId);
    }

    voteUp(id) {
        this.props.updateCommentVote(id, 'upVote');
    }

    voteDown(id) {
        this.props.updateCommentVote(id, 'downVote');
    }

    handleCommentSubmit = (comment) => {
        console.log(comment);
        this.props.addComment(comment);
    };


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
                                        <Comment.Text>{comment.body}</Comment.Text>
                                        <Comment.Actions>
                                            <Icon name='triangle up'
                                                  link
                                                  onClick={() => this.voteUp(comment.id)}/>
                                            {comment.voteScore}
                                            <Icon name='triangle down'
                                                  style={{marginLeft: '3px'}}
                                                  link
                                                  onClick={() => this.voteDown(comment.id)}/>
                                            <a>Edit</a>
                                            <a style={{marginLeft: '5px'}}
                                               color='red'>
                                                Delete
                                            </a>
                                        </Comment.Actions>
                                    </Comment.Content>
                                </Comment>
                            ))}

                            <Divider section/>

                            {this.props.comments && (
                                <EditComment
                                    postId={this.props.post.id}
                                    onSubmit={this.handleCommentSubmit}/>
                            )}
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
        comments: Object.keys(comments.items).map((k) => comments.items[k])
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchPost: (id) => dispatch(fetchPost(id)),
        fetchPostComments: (id) => dispatch(fetchPostComments(id)),
        updateCommentVote: (id, option) => dispatch(updateCommentVote(id, option)),
        addComment: (comment) => dispatch(addComment(comment))
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(PostDetails);