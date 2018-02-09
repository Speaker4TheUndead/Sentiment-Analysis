#!/usr/bin/python3
from flask import Flask
from flask import render_template
from flask import request
from textblob import TextBlob
from textblob import Blobber
from textblob.sentiments import NaiveBayesAnalyzer
import json
#Create the analyzer up here so we're not training it each run
nv_blob = Blobber(analyzer=NaiveBayesAnalyzer())

def analyze_nv(text):
    blob = nv_blob(text)
    jsonGraph = {"sentiment":blob.sentiment[0],
                "pos":blob.sentiment[1],
                "neg":blob.sentiment[2]}
    print(json.dumps(jsonGraph))
    return json.dumps(jsonGraph)

    #return blob.sentiment[0] + " pos:" + str(blob.sentiment[1]) + " neg:" + str(blob.sentiment[2])

    # for sentence in blob.sentences:
    #    total += 1
    #    # print(sentence.sentiment.polarity)
    #    avg += sentence.sentiment.polarity

    # return str(avg / total)
    # 0.060
    # -0.341


def analyze(text):
    total = 0
    blob = TextBlob(text)
    jsonSentenceData = {}
    for sentence in blob.sentences:
        jsonSentenceData.update({str(sentence): sentence.sentiment.polarity})
        total += 1
    # print(sentence.sentiment.polarity)

    jsonData = {"polarity": blob.sentiment.polarity, "sentence_data": jsonSentenceData}
    return json.dumps(jsonData)


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


@app.route('/analyze_nv', methods=['POST'])
def analyze_nv_route():
    if len(request.form['text']) > 5000:
        return "Too many Characters. Bad Request."
    else:
        return analyze_nv(request.form['text'])


@app.route('/about')
def about_route():
    return render_template('about.html')


@app.route('/people')
def people_route():
    return render_template('people.html')

@app.route('/index')
def index_route():
    return render_template('index.html')

if __name__ == '__main__':
    app.run(host='0.0.0.0', threaded=True)
