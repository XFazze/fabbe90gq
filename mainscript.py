from flask import *
from config import *
from blueprints.spotify import spotify
from blueprints.bjornbanan import bjornbanan
from blueprints.gamejs import gamejs
from blueprints.sim import sim
from blueprints.factorio import factorio
from blueprints.lb2000 import lb2000
from blueprints.user import user
from blueprints.afknotif import afknotif
from celery import Celery

# Initializing flask and sql
app = Flask(__name__,  static_folder='static')
app.config['SECRET_KEY'] = secret_key

app.register_blueprint(spotify, url_prefix='/spotify')
app.register_blueprint(bjornbanan, url_prefix='/bjornbanan')
app.register_blueprint(gamejs, url_prefix='/gamejs')
app.register_blueprint(sim, url_prefix='/sims')
app.register_blueprint(factorio, url_prefix='/factorio')
app.register_blueprint(lb2000, url_prefix='/lb2000')
app.register_blueprint(user, url_prefix='/user')
app.register_blueprint(afknotif, url_prefix='/afknotif')

# celery background task for discordbot plots
#TODO fix image hosting and updating of discord plots
'''
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
'''
@app.route("/")
def index():
    return render_template('index.html')


# Run the site
if __name__ == "__main__":
    app.run(debug=True)

