from flask import Flask
from flask import render_template
from flask import request
app = Flask(__name__)


@app.route('/')
def index(name=None):
    return render_template('index.html', name=name)

@app.route('/ajaxtest', methods=['POST', 'GET'])
def ajaxtest():
    error = None
    if request.method == 'POST':
        return str.capitalize(request.form['text'])
    return "Eat my asshole"

if __name__ == '__main__':
    app.run()
