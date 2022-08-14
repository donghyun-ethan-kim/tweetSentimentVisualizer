from flask import Flask, jsonify
from Train.train import returnJson
import json

returnVal = returnJson()
y = json.loads(returnVal)

#print(returnVal.nodes)
api = Flask(__name__)

#api.route('/json')
#def jsonStuff():
#    return returnVal


@api.route('/data')
def data():
    return returnVal


