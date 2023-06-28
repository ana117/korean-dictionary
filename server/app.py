import os
from dotenv import load_dotenv
from flask import Flask, request
from flask_cors import CORS, cross_origin
import requests
import xmltodict

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
    base_url = 'https://krdict.korean.go.kr/api/search'
    request_params = request.args

    params = {'key': os.getenv('KRDICT_KEY')}
    for key in request_params:
        params[key] = request_params[key]

    response = requests.get(base_url, params=params, verify=_CERT_PATH)
    
    return xmltodict.parse(response.content)
    
    