import React from 'react';
import PropTypes from 'prop-types';
import {Feed, Icon, Label} from 'semantic-ui-react'
import {Link} from 'react-router-dom';
import {deletePost, updatePost, updatePostVote} from '../actions/post';
import {connect} from 'react-redux';
import DeleteModal from './DeleteModal';
import EditPostModal from './EditPostModal';


class Post extends React.Component {

    voteUp() {
        this.props.updatePostVote(this.props.post.id, 'upVote');
    }

    voteDown() {
        this.props.updatePostVote(this.props.post.id, 'downVote');
    }

    handleDelete = (post) => {
        const {onPostDelete, deletePost} = this.props;

        if (onPostDelete) {
            onPostDelete(post);
        }
        deletePost(post.id);
    };

    handleEdit = (post) => {
        this.props.updatePost(post);
    };

    render() {
        const post = this.props.post;
        return (
            <Feed.Event>
                <Feed.Label className='votes'>
                    <Feed.Like>
                        <Icon name='triangle up'
                              link
                              onClick={() => this.voteUp()}/>
                    </Feed.Like>
                    {post.voteScore}
                    <Feed.Like>
                        <Icon name='triangle down'
                              link
                              onClick={() => this.voteDown()}/>
                    </Feed.Like>
                </Feed.Label>
                <Feed.Content>
                    <Feed.Summary>
                        <Link to={`/${post.category}/${post.id}`}>
                            {post.title}
                        </Link>
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
                            <EditPostModal
                                component={(<a>Edit</a>)}
                                post={post}
                                onSubmit={this.handleEdit}
                            />
                            <DeleteModal
                                onDelete={this.handleDelete}
                                item={post}
                                component={
                                    (<a style={{marginLeft: '5px'}}
                                        color='red'>
                                        Delete
                                    </a>)}/>
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
    }
}

Post.propTypes = {
    post: PropTypes.object.isRequired,
    onPostDelete: PropTypes.func,
};

const mapStateToProps = () => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {
        updatePostVote: (postId, option) => dispatch(updatePostVote(postId, option)),
        deletePost: (post) => dispatch(deletePost(post)),
        updatePost: (post) => dispatch(updatePost(post))
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Post);