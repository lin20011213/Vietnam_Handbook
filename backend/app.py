
from flask_cors import CORS
import route.login as login
from flask import Flask, request, jsonify, make_response


app = Flask(__name__)
CORS(app)
app.register_blueprint(login.bp)



if __name__ == '__main__':
    app.run(debug=True)
