from flask import *
from config import *
from blueprints.spotify import spotify
from blueprints.urbanOsu import urbanOsu
from blueprints.bjornbanan import bjornbanan
from blueprints.gamejs import gamejs
from blueprints.sim import sim
from blueprints.factorio import factorio
from blueprints.lb2000 import lb2000
from blueprints.user import user
from blueprints.afknotif import afknotif
from blueprints.files import files
from celery import Celery
from functools import wraps
from authlib.integrations.flask_client import OAuth
import os

# Initializing flask and sql
app = Flask(__name__, static_folder="static")
if "secretKey" in locals():
    app.config["SECRET_KEY"] = secretKey
else:
    app.config["SECRET_KEY"] = os.urandom(12).hex()

# app.register_blueprint(spotify, url_prefix="/spotify")
# app.register_blueprint(urbanOsu, url_prefix='/urbanOsu')
app.register_blueprint(bjornbanan, url_prefix="/bjornbanan")
app.register_blueprint(gamejs, url_prefix="/gamejs")
app.register_blueprint(sim, url_prefix="/sims")
# app.register_blueprint(factorio, url_prefix='/factorio')
# app.register_blueprint(lb2000, url_prefix="/lb2000")
# app.register_blueprint(user, url_prefix='/user')
# app.register_blueprint(afknotif, url_prefix='/afknotif')
# app.register_blueprint(files, url_prefix='/files')

# auth0 files
"""
oauth = OAuth(app)
auth0 = oauth.register(
    'auth0',
    client_id=filesAuth0Id,
    client_secret=filesAuth0Secret,
    api_base_url='https://dicespace.eu.auth0.com',
    access_token_url='https://dicespace.eu.auth0.com/oauth/token',
    authorize_url='https://dicespace.eu.auth0.com/authorize',
    client_kwargs={
        'scope': 'openid profile email',
    },
)

def requires_auth(f):
  @wraps(f)
  def decorated(*args, **kwargs):
    if 'profile' not in session:
      # Redirect to Login page here
      return redirect('/')
    return f(*args, **kwargs)

  return decorated

@app.route("/files/callback")
def filesCallback():
    # Handles response from token endpoint
    auth0.authorize_access_token()
    resp = auth0.get('userinfo')
    userinfo = resp.json()

    # Store the user information in flask session.
    session['jwt_payload'] = userinfo
    session['profile'] = {
        'user_id': userinfo['sub'],
        'name': userinfo['name'],
        'picture': userinfo['picture']
    }
    return redirect('/files/dashboard')

@app.route("/files/login")
def filesLogin():
    return auth0.authorize_redirect(redirect_uri=filesAuth0CallbackUrl)

@app.route("/files/dashboard")
@requires_auth
def filesDashboard():
    return render_template('files/dashboard.html',
                           userinfo=session['profile'],
                           userinfo_pretty=json.dumps(session['jwt_payload'], indent=4))

"""
# celery background task for discordbot plots
# TODO fix image hosting and updating of discord plots
"""
def make_celery(app):
    celery = Celery(
        app.import_name,
        backend=app.config['CELERY_RESULT_BACKEND'],
        broker=app.config['CELERY_BROKER_URL']
    )
    celery.conf.update(app.config)

    class ContextTask(celery.Task):
        def __call__(self, *args, **kwargs):
            with app.app_context():
                return self.run(*args, **kwargs)

    celery.Task = ContextTask
    return celery
"""


@app.route("/")
def index():
    return render_template("index.html")


# Run the site
if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0")
