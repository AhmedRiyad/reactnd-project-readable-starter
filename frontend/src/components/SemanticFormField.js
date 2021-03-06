import {Input, Form} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import React  from 'react';




export function SemanticFormField({input, type, label, placeholder, meta: {touched, error, warning}, as: As = Input, ...props}) {
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

SemanticFormField.propTypes = {
    as: PropTypes.any,
    input: PropTypes.object,
    type: PropTypes.string,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    meta: PropTypes.object
};