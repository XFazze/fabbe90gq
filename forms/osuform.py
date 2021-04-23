from flask_wtf import FlaskForm
from wtforms import Form, SelectField, validators, SubmitField, IntegerField, StringField
from wtforms.validators import DataRequired
class osuform(FlaskForm):
    name = StringField('Name', validators=[DataRequired()])
    submit = SubmitField('Submit')