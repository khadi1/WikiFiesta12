from flask import Flask, jsonify
from fetching_script import data_to_send

app = Flask(__name__)

@app.route('/get_data')
def get_data():
    data = data_to_send  # Your JSON data here
    return data

if __name__ == '__main__':
    app.run(debug=True ,  port=5500)
