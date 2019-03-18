from app import app
from flask import render_template

@app.route('/')
@app.route('/<name>')
def index(name=None):
    return render_template('index.html', name=name)
