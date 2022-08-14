from flask import Flask, jsonify
from flask import request
from Train.train import returnJson, returnModel
import json

model = returnModel()
#returnVal = returnJson()
#y = json.loads(returnVal)

#print(returnVal.nodes)
api = Flask(__name__)

#api.route('/json')
#def jsonStuff():
#    return returnVal

@api.route('/search', methods=['GET'])
def search():
    args = request.args.get('topic')
    print(args)
    returnVal = returnJson(args, model)
    return returnVal

@api.route('/data')
def data():
    returnVal = returnJson("Georgia Tech", model)
    return returnVal


