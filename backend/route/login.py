from flask import Blueprint, request, jsonify, make_response
from urllib.error import HTTPError
from json.decoder import JSONDecodeError
from werkzeug.exceptions import BadRequest

bp = Blueprint('Login', __name__)

@bp.route('/Login', methods=['POST', 'OPTIONS'])
def Login():
    try:
        if request.method == 'OPTIONS':
            # Pre-flight request. Reply successfully:
            response = make_response()
            response.headers['Access-Control-Allow-Credentials'] = 'true'
            response.headers['Access-Control-Allow-Origin'] = 'http://localhost:3000'
            response.headers['Access-Control-Allow-Headers'] = 'Content-Type'
            response.headers['Access-Control-Allow-Methods'] = 'POST'
            return response
        
        data = request.get_json()
        print(data)
        username = data.get('username', None)
        password = data.get('password', None)
        if username == '123' and password == '456':
            response = make_response(jsonify({'success': True}))
            response.headers['Access-Control-Allow-Origin'] = 'http://localhost:3000'
            response.set_cookie('session', '123456789')
            response.set_cookie('username', 'bao')
            return response
        else:
            return jsonify({'msg': "Login Failed"}), 200
        
    except JSONDecodeError as e:
        return jsonify({'error': 'Invalid JSON'}), 400
    except BadRequest as e:
        return jsonify({'error': 'Bad Request'}), 400
    except Exception as e:
        return jsonify({'error': str(e)}), 500