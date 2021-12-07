from flask_wtf import FlaskForm, Form
from wtforms import Form, SelectField, validators, SubmitField, StringField, PasswordField, IntegerField
from wtforms.validators import DataRequired
regions = ["eun1","euw1","BR1",  "JP1", "KR", "LA1", "LA2", "NA1", "OC1", "RU", "TR1"]
large_regions = ["EUROPE", "AMERICAS", "ASIA"]
class lb2000_getuser(FlaskForm):
    username = StringField('Username', validators=[DataRequired()])
    region = SelectField('Region', validators=[DataRequired()], choices = regions)
    submit = SubmitField('Get profile')
