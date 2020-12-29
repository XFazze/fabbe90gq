from flask import *
from flask_wtf import FlaskForm
from wtforms import Form, BooleanField, PasswordField, validators, SubmitField, StringField
from wtforms.validators import DataRequired
import json
import datetime
from system.main_system import run_period

# Initializing flask and sql
app = Flask(__name__)
app.config['SECRET_KEY'] = 'you-will-never-guess'

# Root


@app.route("/")
def base():
    return render_template('alien_base.html')


class resourses(FlaskForm):
    water = StringField('Water ', validators=[DataRequired()])
    food = StringField('Food ', validators=[DataRequired()])
    electric = StringField('Electric ', validators=[DataRequired()])
    submit = SubmitField('Run')

# User interface


@app.route("/request",  methods=['GET', 'POST'])
def user():
    form = resourses()
    if form.validate_on_submit():
        flash('water: {}, food: {}, electric: {}'.format(
            form.water.data, form.food.data, form.electric.data))
        with open('/home/pi/moin/rasp/flaskwebsite/secondsite/system/webhistory.txt', 'a') as file:
            text = str(datetime.datetime.now()) + "  " + str(form.water.data) + \
                "  " + str(form.food.data) + "  " + \
                str(form.electric.data)+"\n"
            file.write(text)
            file.close()
        return redirect('/alien/results')
    return render_template('request.html', form=form)

# User interface results
@app.route("/results")
def user_results():
    return render_template('results.html')

# Admin interface
storage = json.load(
    open('/home/pi/moin/rasp/flaskwebsite/secondsite/system/storage.json'))
water = []
food = []
electric = []
for i in storage:
    water.append(i["water"])
    food.append(i["food"])
    electric.append(i["electric"])


@app.route("/admin")
def admin():
    with open('/home/pi/moin/rasp/flaskwebsite/secondsite/system/webhistory.txt', 'r') as file:
        lines = file.readlines()
        newlines = []
        for line in lines:
            newlines.insert(0, line.strip())
    return render_template('admin.html',
                           storage=storage,
                           lines=newlines)


# User interface results
@app.route("/simulation", methods=['GET', 'POST'])
def simulation():
    form = resourses()
    if form.validate_on_submit():
        run_period(form.water.data, form.food.data, form.electric.data, 1.02)
    return render_template('simulation.html')
# Run the site
if __name__ == "__main__":
    app.run()
