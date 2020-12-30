from flask import *
# Initializing flask and sql
app = Flask(__name__)
app.config['SECRET_KEY'] = 'you-will-never-guess'

# Root
@app.route("/")
def main():
    return render_template('home.html')






# Run the site
if __name__ == "__main__":
    app.run()
