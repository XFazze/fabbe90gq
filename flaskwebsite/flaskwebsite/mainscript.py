from flask import *
# Initializing flask and sql
app = Flask(__name__)
app.config['SECRET_KEY'] = 'you-will-never-guess'

# Root
@app.route("/")
def main():
    return render_template('home_base.html')


# Root
@app.route("/vpn_log")
def vpn_log():
    return render_template('vpn_log.html')




# Run the site
if __name__ == "__main__":
    app.run()
