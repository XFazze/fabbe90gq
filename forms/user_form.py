from flask_wtf import FlaskForm, Form
from wtforms import SelectField, validators, SubmitField, StringField, PasswordField
from wtforms.validators import DataRequired
class login_form(FlaskForm):
    femail = StringField('email', validators=[DataRequired()], render_kw={"placeholder": "email"})
    passw = PasswordField('passw', validators=[DataRequired()], render_kw={"placeholder": "password"})
    login = SubmitField('Login')


class register_form(Form):
    femail = StringField('email', validators=[DataRequired()], render_kw={"placeholder": "email"})
    passw = PasswordField('passw', validators=[DataRequired()], render_kw={"placeholder": "password"})
    register = SubmitField('Register')