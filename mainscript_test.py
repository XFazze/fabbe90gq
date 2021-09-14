from flask import *
from flask_wtf import FlaskForm
from wtforms import Form, SelectField, validators, SubmitField, IntegerField
from wtforms.validators import DataRequired
from ratio_code.basic_copy import *
from config import secret_key
# Initializing flask and sql
app = Flask(__name__)
app.config['SECRET_KEY'] = secret_key

# Root
@app.route("/")
def index():
    return render_template('trego/concept.html')

# Run the site
if __name__ == "__main__":
    app.run(debug=True)