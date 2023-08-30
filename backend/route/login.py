from flask import Blueprint, request, jsonify, make_response
from urllib.error import HTTPError
from json.decoder import JSONDecodeError
from werkzeug.exceptions import BadRequest
import json
bp = Blueprint('Login', __name__)

@bp.route('/Login', methods=['POST', 'OPTIONS'])
def Login():
    try:
        response = make_response()
        response.headers['Access-Control-Allow-Origin'] = 'http://localhost:3000'
        response.headers['Access-Control-Allow-Credentials'] = 'true'
        response.mimetype = 'application/json'

        if request.method == 'OPTIONS':
            # Pre-flight request. Reply successfully:
            response.headers['Access-Control-Allow-Headers'] = 'Content-Type'
            response.headers['Access-Control-Allow-Methods'] = 'POST'
            return response
        
        data = request.get_json()
        print(data)
        username = data.get('username', None)
        password = data.get('password', None)
        if username == '123' and password == '456':
            response.set_cookie('session', '123456789')
            response.set_cookie('username', 'bao')
            response.data = json.dumps({'success': True})
            response.status_code = 200
            return response
        else:
            response.data = json.dumps({'msg': "Login Failed"})
            response.status_code = 200
        return response
        
    except JSONDecodeError as e:
        response.data = json.dumps({'error': 'Invalid JSON'})
        response.status_code = 400
        return response
    except BadRequest as e:
        response.data = json.dumps({'error': 'Bad Request'})
        response.status_code = 400
        return response
    except Exception as e:
        response.data = json.dumps({'error': str(e)})
        response.status_code = 500
        return response
