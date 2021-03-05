from flask import *
# Initializing flask and sql
app = Flask(__name__)
app.config['SECRET_KEY'] = 'you-will-never-guess'

# Root
@app.route("/")
def index():
    return render_template('index.html')


# Pappa
@app.route("/pappa")
def pappa():
    return render_template('pappa.html')


# Björnbanan
@app.route("/bjornbanan")
def bjornbanan():
    return render_template('index.html')


# Run the site
if __name__ == "__main__":
    app.run()
