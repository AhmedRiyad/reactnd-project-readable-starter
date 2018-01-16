import React, {Component} from 'react';
import {Form, Button, Header, Modal} from 'semantic-ui-react'
import {Field, initialize, reduxForm} from 'redux-form';
import PropTypes from 'prop-types';
import {SemanticFormField} from './SemanticFormField';
import {connect} from 'react-redux';


export const required = value => (value ? undefined : 'Required');


class EditPostModal extends Component {
    state = {modalOpen: false};

    handleOpen = () => {
        this.props.dispatch(initialize('post', {...this.props.post}));
        this.setState({modalOpen: true});
    };

    handleClose = () => this.setState({modalOpen: false});

    handleSubmit = (e) => {
        this.props.handleSubmit();
        this.props.reset();
        this.setState({modalOpen: false});
    };

    render() {
        const {categories, post} = this.props;
        return (
            <Modal trigger={this.props.component}
                   onOpen={this.handleOpen}
                   open={this.state.modalOpen}
                   onClose={this.close}>
                <Modal.Content>
                    <div>
                        <Header>{post ? 'Edit Post' : 'Add Post'}</Header>
                        <Form name="post"
                              onSubmit={this.handleSubmit}>
                            <Field name="title"
                                   component={SemanticFormField}
                                   as={Form.Input}
                                   type="text"
                                   label="Title"
                                   placeholder="Title"
                                   width={6}
                                   required
                                   validate={required}/>
                            <Field name="body"
                                   component={SemanticFormField}
                                   as={Form.TextArea}
                                   type="text"
                                   label="Content"
                                   placeholder="Content"
                                   width={6}
                                   required
                                   validate={required}/>

                            <Field name="author"
                                   component={SemanticFormField}
                                   as={Form.Input}
                                   type="text"
                                   label="Author"
                                   placeholder="Author"
                                   width={6}
                                   required
                                   validate={required}/>
                            <Field name="category"
                                   component={SemanticFormField}
                                   as={Form.Select}
                                   options={categories.map((cat) => {
                                       return {key: cat.name, value: cat.name, text: cat.name}
                                   })}
                                   label="Category"
                                   required
                                   width={6}
                                   placeholder="Category"
                                   validate={required}/>

                            <Button type='submit' color='blue'>
                                {this.props.edit ? 'Update' : 'Add Post'}
                            </Button>
                            <Button type='button'
                                    onClick={() => this.handleClose()}>
                                Cancel
                            </Button>
                        </Form>
                    </div>
                </Modal.Content>
            </Modal>
        )
    }
}


EditPostModal.propTypes = {
    onSubmit: PropTypes.func,
    post: PropTypes.object
};


function mapStateToProps({categories}) {

    return {
        initialValues: {},
        categories: categories.items
    }
}

EditPostModal = reduxForm({
    form: 'post'
})(EditPostModal);

EditPostModal = connect(
    mapStateToProps
)(EditPostModal);

export default EditPostModal