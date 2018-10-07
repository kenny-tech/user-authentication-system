import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import * as actions from '../../actions';
import { connect } from 'react-redux';

class Signin extends Component {

    handleFormSubmit({ email, password }) {
        this.props.signinUser({ email, password })
    }

    renderError() {
        if(this.props.errorMessage) {
            return (
                <div className="alert alert-danger">
                    <string>Oops! {this.props.errorMessage}</string>
                </div>
            );
        }
    }

    render() {
        const { handleSubmit } = this.props;

        return (
            <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                <fieldset className="form-group">
                    <label>Email:</label>
                    <Field className="form-control" name="email" component={this.renderField} type="text" />
                </fieldset>
                <fieldset className="form-group">
                    <label>Password:</label>
                    <Field className="form-control" name="password" component={this.renderField} type="password" />
                </fieldset>
                {this.renderError()}
                <button action="submit" className="btn btn-primary">Sign in</button>
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

    if(!values.password) {
        errors.password = 'Please enter a password';
    }
}

const mapStateToProps = (state) => {
    return { errorMessage: state.auth.error }
}

export default reduxForm({
    form: 'signin',
    validate
})(connect(mapStateToProps, actions)(Signin));