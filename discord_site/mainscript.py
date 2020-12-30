from flask import *
from flask_wtf import FlaskForm
from wtforms import Form, SelectField, validators, SubmitField, IntegerField
from wtforms.validators import DataRequired

# Initializing flask and sql
app = Flask(__name__)
app.config['SECRET_KEY'] = 'you-will-never-guess'

# Root


@app.route("/")
def main():
    return render_template('home.html')


if __name__ == "__main__":
    app.run()
