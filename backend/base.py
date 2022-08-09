from flask import Flask
from Train.train import returnJson
import json

returnVal = returnJson()

#print(returnVal.nodes)
api = Flask(__name__)

#api.route('/json')
#def jsonStuff():
#    return returnVal


@api.route('/profile')
def my_profile():
    response_body = {
        "name": "Nagato",
        "about" : returnVal
    }

    return response_body


