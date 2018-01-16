import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Comment, Icon} from 'semantic-ui-react';
import EditCommentModal from './EditCommentModal';
import DeleteModal from './DeleteModal';
import userImage from './../assets/images/no_image_user.png';
import {deleteComment, updateComment, updateCommentVote} from '../actions/comments';


class PostComment extends React.Component {

    voteUp(id) {
        this.props.updateCommentVote(id, 'upVote');
    }

    voteDown(id) {
        this.props.updateCommentVote(id, 'downVote');
    }

    handleDelete = (comment) => {
        this.props.deleteComment(comment.id);
    };

    handleSubmit = (comment) => {
        this.props.updateComment(comment);
    };

    render() {
        const {comment} = this.props;

        return (
            <Comment>
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

                        <EditCommentModal
                            component={(<a>Edit</a>)}
                            comment={comment}
                            onSubmit={this.handleSubmit}
                        />

                        <DeleteModal
                            onDelete={this.handleDelete}
                            item={comment}
                            component={
                                (<a style={{marginLeft: '5px'}}
                                    color='red'>
                                    Delete
                                </a>)}/>
                    </Comment.Actions>
                </Comment.Content>
            </Comment>
        )
    }
}

PostComment.propTypes = {
    comment: PropTypes.object.isRequired
};

const mapStateToProps = () => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {
        updateCommentVote: (id, option) => dispatch(updateCommentVote(id, option)),
        deleteComment: (comment) => dispatch(deleteComment(comment)),
        updateComment: (comment) => dispatch(updateComment(comment))
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(PostComment);