from flask import *
from pymongo import MongoClient
from config import *
from forms.user_form import *

user = Blueprint('user', __name__)

@user.route("/", methods=['GET', 'POST'])
def user_index():
    return render_template('user/home.html')


@user.route("/register", methods=['GET', 'POST'])
def userRegister():
    form = register_form()
    if form.validate_on_submit():
        result = form.femail.data, form.passw.data
        render_template('user/home.html')
    return render_template('user/register.html', form=form)


@user.route("/login", methods=['GET', 'POST'])
def userLogin():
    form = login_form()
    if form.validate_on_submit():
        result = form.femail.data, form.passw.data
        session["email"] = form.femail.data
        return render_template('user/home.html')
    return render_template('user/login.html', form=form)


@user.route("/forgotpassw", methods=['GET', 'POST'])
def userForgotpassw():
    return render_template('user/forgotpassw.html')
