import React from 'react';
import {Form, Button, Header} from 'semantic-ui-react'
import {Field, reduxForm} from 'redux-form';
import PropTypes from 'prop-types';
import {compose} from 'redux';
import {SemanticFormField} from './SemanticFormField';


export const required = value => (value ? undefined : 'Required');


const EditPost = (props) => {
    return (
        <div>
            <Header>Select a Photo</Header>
            <Form name="product">
                <Field name="title"
                       component={SemanticFormField}
                       as={Form.Input}
                       type="text"
                       label="Title"
                       placeholder="Title"
                       width={6}
                       required
                       validate={required}/>
                <Field name="content"
                       component={SemanticFormField}
                       as={Form.Input}
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
                       options={[
                           {key: '0', text: 'Option 1', value: '0'},
                           {key: '1', text: 'Option 2', value: '1'}
                       ]}
                       label="Category"
                       required
                       width={6}
                       placeholder="Category"
                       validate={required}/>

                <Button type='submit' color='blue'>Create</Button>
                <Button type='button'>Cancel</Button>

            </Form>
        </div>
    )
};


EditPost.propTypes = {
    handleSubmit: PropTypes.func,
    reset: PropTypes.func,
    onSubmit: PropTypes.func,
    pristine: PropTypes.bool,
    submitting: PropTypes.bool
};

export default compose(
    reduxForm({
        form: 'product',
        enableReinitialize: true
    })
)(EditPost);