from flask import Flask
from flask import render_template
from flask import request
from textblob import TextBlob
from textblob.sentiments import NaiveBayesAnalyzer


def analyze(text):
    total = 0
    avg = 0
    blob = TextBlob(text, analyzer=NaiveBayesAnalyzer())
    return blob.sentiment[0] + " pos:" + str(blob.sentiment[1]) + " neg:" + str(blob.sentiment[2])
    # for sentence in blob.sentences:
    #    total += 1
    #    # print(sentence.sentiment.polarity)
    #    avg += sentence.sentiment.polarity

    # return str(avg / total)
    # 0.060
    # -0.341


app = Flask(__name__)


@app.route('/')
def index(name=None):
    return render_template('index.html', name=name)


@app.route('/analyze', methods=['POST'])
def analyze_route():
    if len(request.form['text']) > 5000:
        return "Too many Characters. Bad Request."
    else:
        return analyze(request.form['text'])


@app.route('/about')
def about_route():
    return render_template('about.html')


@app.route('/donate')
def donate_route():
    return render_template('donate.html')


if __name__ == '__main__':
    app.run()
