from flask import Flask
from flask import render_template
from flask import request
from textblob import TextBlob


def analyze(text):
    total = 0
    avg = 0
    blob = TextBlob(text)
    for sentence in blob.sentences:
        total += 1
        # print(sentence.sentiment.polarity)
        avg += sentence.sentiment.polarity

    return str(avg / total)
    # 0.060
    # -0.341



app = Flask(__name__)


@app.route('/')
def index(name=None):
    return render_template('index.html', name=name)

@app.route('/analyze', methods=['POST'])
def ajaxtest():
    error = None
    if len(request.form['text']) > 5000:
        error = "Too many Characters. Bad Request."
    elif request.method == 'POST':
        return analyze(request.form['text'])
    else:
        return "Eat my asshole"

if __name__ == '__main__':
    app.run()
