import React from 'react';
import {Field, initialize, reduxForm} from 'redux-form';
import {Header, Form, Button, Modal} from 'semantic-ui-react'
import PropTypes from 'prop-types';
import {SemanticFormField} from './SemanticFormField';
import {connect} from 'react-redux';


export const required = value => (value ? undefined : 'Required');

class EditCommentModal extends React.Component {
    state = {modalOpen: false};

    handleOpen = () => {
        const {postId, comment} = this.props;
        this.props.dispatch(initialize('comment', {
            parentId: postId,
            ...comment
        }));
        this.setState({modalOpen: true});
    };

    handleClose = () => this.setState({modalOpen: false});

    handleSubmit = () => {
        this.props.handleSubmit();
        this.props.reset();
        this.setState({modalOpen: false});
    };


    render() {
        const {comment, component} = this.props;
        return (
            <Modal trigger={component}
                   onOpen={this.handleOpen}
                   open={this.state.modalOpen}
                   onClose={this.close}>
                <Modal.Content>
                    <div>
                        <Header>{comment ? 'Edit Comment' : 'Add Comment'}</Header>
                        <Form reply
                              onSubmit={this.handleSubmit}
                              name="comment">
                            <Field name="author"
                                   component={SemanticFormField}
                                   as={Form.Input}
                                   type="text"
                                   label="Author"
                                   placeholder="Author"
                                   width={6}
                                   required
                                   validate={required}/>
                            <Field name="body"
                                   component={SemanticFormField}
                                   as={Form.TextArea}
                                   label="Comment"
                                   placeholder="Your comment here"
                                   width={6}
                                   required
                                   validate={required}/>

                            <Button type='submit'
                                    content={comment ? 'Update' : 'Add Comment'}
                                    labelPosition='left'
                                    icon='edit'
                                    primary/>
                            <Button type='button'
                                    onClick={this.handleClose}>
                                Cancel
                            </Button>

                        </Form>
                    </div>
                </Modal.Content>
            </Modal>
        )
    }
}


EditCommentModal.propTypes = {
    onSubmit: PropTypes.func,
    postId: PropTypes.string,
    comment: PropTypes.object
};

function mapStateToProps(state, {postId, comment}) {
    return {
        initialValues: {
            parentId: postId,
            ...comment
        }
    }
}

EditCommentModal = reduxForm({
    form: 'comment',
    enableReinitialize: true
})(EditCommentModal);

EditCommentModal = connect(
    mapStateToProps
)(EditCommentModal);

export default EditCommentModal