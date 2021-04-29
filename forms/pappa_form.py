from flask_wtf import FlaskForm, Form
from wtforms import Form, SelectField, validators, SubmitField, StringField, PasswordField
from wtforms.validators import DataRequired
class pappa_login_form(Form):
    email = StringField('email', validators=[DataRequired()])
    passw = PasswordField('passw', validators=[DataRequired()])
    login = SubmitField('Login')


class pappa_register_form(Form):
    email = StringField('email', validators=[DataRequired()])
    passw = PasswordField('passw', validators=[DataRequired()])
    register = SubmitField('Register')