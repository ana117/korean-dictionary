import os
from dotenv import load_dotenv
from flask import Flask, request
from flask_cors import CORS, cross_origin
import requests

from krdict_scraper import eng_to_kor, kor_to_eng

load_dotenv()

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

_CERT_PATH = os.path.join(os.path.dirname(os.path.realpath(__file__)), 'kr.pem')

@app.route('/')
def hello_world():
    return 'Hello from Flask!'


@app.route('/krdict')
@cross_origin()
def krdict():
    request_params = request.args

    params = dict()
    for key in request_params:
        params[key] = request_params[key]
    params['key'] = os.getenv('KRDICT_KEY')

    return kor_to_eng(params)


@app.route('/krdict/eng')
@cross_origin()
def krdict_eng():
    request_params = request.args

    word = request_params['q']
    channel = eng_to_kor(word)

    return {'channel': channel}
    

    
    