from flask import *
from config import *

bjornbanan = Blueprint('bjornbanan', __name__ )


# BJORNBANAN
@bjornbanan.route("/")
def bjornbanan_index():
    return render_template('bjornbanan/bjornbanan.html')


@bjornbanan.route("/help")
def bjornbanan_help():
    return render_template('bjornbanan/bjornbanan_help.html')


@bjornbanan.route("/commands")
def bjornbanan_commands():
    return render_template('bjornbanan/bjornbanan_commands.html')


@bjornbanan.route("/music_help")
def bjornbanan_music_help():
    return render_template('bjornbanan/bjornbanan_m_help.html')
