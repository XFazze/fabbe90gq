from flask import *
from pymongo import MongoClient
from config import *
from Crypto.Util import number

sim = Blueprint('sim', __name__)


@sim.route("/")
def sim_index():
    return render_template('sims/home.html')


@sim.route("/rsa", methods=['GET', 'POST'])
def rsa():
    return render_template('sims/rsa.html', plow=str(number.getPrime(4))+' ||| ' + str(number.getPrime(5)) + ', ' + str(number.getPrime(5))+' ||| ' + str(number.getPrime(4)),
                           p128=[str(number.getPrime(15)), str(number.getPrime(15)), str(number.getPrime(32)), str(number.getPrime(32))])

# chaos triangle


@sim.route("/chaostriangle", methods=['GET', 'POST'])
def chaostriangle():
    return render_template('sims/chaostriangle.html')

# chaos triangle


@sim.route("/chaoscircle", methods=['GET', 'POST'])
def chaoscircle():
    return render_template('sims/chaoscircle.html')

# sortingalgorithms


@sim.route("/sortingalgorithms", methods=['GET', 'POST'])
def sortingalgorithms():
    return render_template('sims/sortingalgorithms.html')

# random number genenrator


@sim.route("/rng", methods=['GET', 'POST'])
def rng():
    return render_template('sims/rng.html')

# Path finders


@sim.route("/pathFinders", methods=['GET', 'POST'])
def pathFinders():
    return render_template('sims/pathFinders.html')
