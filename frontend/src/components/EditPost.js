import React from 'react';
import {Form, Button, Input, Feed, Icon, Label} from 'semantic-ui-react'
import {Field, reduxForm} from 'redux-form';
import PropTypes from 'prop-types';
import {compose} from 'redux';


export function semanticFormField({input, type, label, placeholder, meta: {touched, error, warning}, as: As = Input, ...props}) {
    function handleChange(e, {value}) {
        return input.onChange(value);
    }

    return (
        <Form.Field>
            <As {...props} {...input} value={input.value} type={type} label={label} placeholder={placeholder}
                onChange={handleChange}/>
            {touched && ((error && <span><i>{error}</i></span>) || (warning && <span><i>{warning}</i></span>))}
        </Form.Field>
    );
}

semanticFormField.propTypes = {
    as: PropTypes.any,
    input: PropTypes.object,
    type: PropTypes.string,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    meta: PropTypes.object
};

export const required = value => (value ? undefined : 'Required');


const EditPost = (props) => {
    return (
        <Form name="product">
            <Field name="title"
                   component={semanticFormField}
                   as={Form.Input}
                   type="text"
                   label="Title"
                   placeholder="Title"
                   width={6}
                   required
                   validate={required}/>
            <Field name="content"
                   component={semanticFormField}
                   as={Form.Input}
                   type="text"
                   label="Content"
                   placeholder="Content"
                   width={6}
                   required
                   validate={required}/>

            <Field name="author"
                   component={semanticFormField}
                   as={Form.Input}
                   type="text"
                   label="Author"
                   placeholder="Author"
                   width={6}
                   required
                   validate={required}/>
            <Field name="category"
                   component={semanticFormField}
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
            <Button>Cancel</Button>

        </Form>
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