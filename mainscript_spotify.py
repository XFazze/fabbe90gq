from flask import *
from flask_wtf import FlaskForm
from wtforms import Form, SelectField, validators, SubmitField, IntegerField
from wtforms.validators import DataRequired
from ratio_code.basic_copy import *
from config import *
# Initializing flask and sql
app = Flask(__name__)
app.config['SECRET_KEY'] = secret_key

# Root
@app.route("/")
def index():
    client_id = 'd3a17cc496724a538a7b2af6024b0a26'
    scope = 'user-read-private user-read-email'
    redirect_uri = 'http://localhost:5000/callback'

    # add state for security
    spotify_url='https://accounts.spotify.com/authorize?'+'response_type=code&client_id='+client_id+'&scope='+scope+'&redirect_uri='+redirect_uri
    return redirect(spotify_url)

@app.route("/callback")
def callback():
    code = request.args['code']
    url = ' '
    json = request.get(url).json()
    print(code)
    return "Weeooe"
    



# Run the site
if __name__ == "__main__":
    app.run()