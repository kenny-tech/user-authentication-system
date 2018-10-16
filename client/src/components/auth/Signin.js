import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import * as actions from '../../actions';
import { connect } from 'react-redux';

class Signin extends Component {

    handleFormSubmit(formProps) {
        this.props.signinUser(formProps);
    }

    renderField = ({ input, label, type, className,  meta: { touched, error, warning } }) => (
        <div>
          <label>{label}</label>
          <div>
            <input {...input} placeholder={label} type={type} className={className}/>
            {touched && ((error && <span className="text-danger">{error}</span>) || (warning && <span>{warning}</span>))}
          </div>
        </div>
    );

    renderError() {
        if (this.props.errorMessage) {
            return (
                <div className="alert alert-danger">
                    Oops! {this.props.errorMessage}
                </div>
            );
        }
    }
    
    render() {
        const { handleSubmit, submitting } = this.props;

        return (
            <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                <h3>Sign In</h3>
                <fieldset className="form-group">
                    <Field 
                        className="form-control"
                        name="email" 
                        type="email" 
                        component={this.renderField} 
                        label="Email"/>
                </fieldset>
                <fieldset className="form-group">
                    <Field 
                        className="form-control"
                        name="password" 
                        type="password" 
                        component={this.renderField} 
                        label="Password"/>
                </fieldset>
                {this.renderError()}
                <button type="submit" className="btn btn-primary" disabled={submitting}>Sign in</button>
          </form>
        );
    }
}

const validate = values => {
    const errors = {};

    if (!values.email) {
        errors.email = 'Please enter an email';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
    }

    if (!values.password) {
        errors.password = 'Please enter a password';
    }

    return errors;
};

const mapStateToProps = (state) => {
    return { errorMessage: state.auth.error }
}

export default reduxForm({
    form: 'signin',
    validate
})(connect(mapStateToProps, actions)(Signin));