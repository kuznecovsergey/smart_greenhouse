from app import app
from flask import render_template
from functions import *


@app.route('/')
@app.route('/<name>')
def index(name=None):
    return render_template('index.html', name=name)

@app.route('/getlast')
def getlast():
    return get_data()
