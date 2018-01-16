import React from 'react';
import {Header, Feed, Comment, Button, Divider, Menu, Container} from 'semantic-ui-react'
import Post from './Post';
import {fetchPost} from '../actions/post';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {addComment, fetchPostComments} from '../actions/comments';
import EditCommentModal from './EditCommentModal';
import PostComment from './PostComment';


class PostDetails extends React.Component {
    static contextTypes = {
        router: PropTypes.object
    };

    componentDidMount() {
        this.props.fetchPost(this.props.postId);
        this.props.fetchPostComments(this.props.postId);
    }

    handleSubmit = (comment) => {
        this.props.addComment(comment);
    };

    handleBackButton() {
        this.context.router.history.goBack();
    }

    componentWillReceiveProps(props) {
        if (this.props.postHasError !== props.postHasError && props.postHasError) {
            this.context.router.history.push('/404');
        }
    }


    postDeleted = () => {
        this.context.router.history.replace('/');
    };

    render() {
        return (
            <div>
                <Menu stackable borderless>
                    <Container text>
                        <Menu.Item header
                                   onClick={() => this.handleBackButton()}>
                            {'Back'}
                        </Menu.Item>
                    </Container>
                </Menu>
                <div>
                    {this.props.post && (
                        <div>
                            <Feed>
                                <Post post={this.props.post}
                                      onPostDelete={this.postDeleted}/>
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
        postHasError: posts.postHasError,
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