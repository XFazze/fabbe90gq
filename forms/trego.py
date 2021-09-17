from flask_wtf import FlaskForm, Form
from wtforms import Form, SelectField, validators, SubmitField, StringField, PasswordField, IntegerField
from wtforms.validators import DataRequired
class trego_login(FlaskForm):
    username = StringField('Username', render_kw={"placeholder": "Enter Username/email"}, validators=[DataRequired()])
    password = PasswordField('Password', render_kw={"placeholder": "Enter Password"},  validators=[DataRequired()])
    submit = SubmitField('Login')
