import React from 'react';
import {Field, reduxForm} from 'redux-form';
import {Header, Form, Button, Modal} from 'semantic-ui-react'
import PropTypes from 'prop-types';
import {SemanticFormField} from './SemanticFormField';
import {connect} from 'react-redux';


export const required = value => (value ? undefined : 'Required');

class EditComment extends React.Component {
    state = {};

    handleOpen = () => this.setState({modalOpen: true});

    handleSubmit = (e) => {
        this.props.handleSubmit(e);
        this.handleClose();
    };

    handleClose = () => {
        this.props.reset();
        this.setState({modalOpen: false});
    };

    render() {
        return (
            <Modal
                trigger={<Button onClick={this.handleOpen}
                                 content='Add Reply'
                                 labelPosition='left'
                                 icon='edit'
                                 primary/>}
                open={this.state.modalOpen}>
                <Modal.Content>
                    <div>
                        <Header>Comment</Header>
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
                                    content='Add Reply'
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


EditComment.propTypes = {
    onSubmit: PropTypes.func,
    postId: PropTypes.string
};

function mapStateToProps(state, {postId}) {
    return {
        initialValues: {
            parentId: postId
        }
    }
}

EditComment = reduxForm({
    form: 'comment',
    enableReinitialize: true
})(EditComment);

EditComment = connect(
    mapStateToProps
)(EditComment);

export default EditComment