from flask import *
from config import *

files = Blueprint('files', __name__ )




# fileserver
# Login/register
# 
@files.route("/")
def filesIndex():
    return render_template('files/index.html')



@files.route("/p")
def bjornbanan_commands():
    return 'this is p'

