import React from 'react';
import {Header, Feed, Comment, Button, Divider} from 'semantic-ui-react'
import Post from './Post';
import {fetchPost} from '../actions/post';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {addComment, fetchPostComments} from '../actions/comments';
import EditCommentModal from './EditCommentModal';
import PostComment from './PostComment';


class PostDetails extends React.Component {
    componentDidMount() {
        this.props.fetchPost(this.props.postId);
        this.props.fetchPostComments(this.props.postId);
    }

    handleSubmit = (comment) => {
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
                                <PostComment key={comment.id}
                                             comment={comment}/>
                            ))}

                            <Divider section/>

                            {this.props.comments && (
                                <EditCommentModal
                                    component={(<Button content='Add Comment'
                                                        labelPosition='left'
                                                        icon='edit'
                                                        primary/>)}
                                    postId={this.props.post.id}
                                    onSubmit={this.handleSubmit}
                                />
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
        addComment: (comment) => dispatch(addComment(comment))
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(PostDetails);