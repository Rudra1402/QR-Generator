from flask import Flask, send_file, request, jsonify
import pyqrcode
from flask_cors import CORS


app = Flask(__name__)
CORS(app)


@app.route('/genqr', methods=['POST'])
def generateQR():
    try:
        data = request.get_json()
        url = data['url'] if 'url' in data else "https://github.com/Rudra1402"
        img = pyqrcode.create(url)
        img.png('fileName.png', scale=4)
        return send_file('fileName.png', mimetype='image/png')

    except Exception as e:
        return jsonify({'error': str(e)})


if __name__ == '__main__':
    app.run(debug=True)
