from flask import Flask, request
import redis

app = Flask(__name__)
r= redis.Redis(host='192.168.130.180', port= 6379 , db=0)
@app.route('/result', methods = ['GET'])
def result():
    if request.method == 'GET':
        param = request.args.get('search', None)
        if param:
            r.get(param)
            return r.get(param)
        return "No place information is given"

@app.route('/insert', methods= ['POST'])
def insert():
    if request.method == 'POST':
        key = request.form['key']
        value = request.form['value']
        if key and value:
            r.set(key,value)
            return "Se ha agregado:  llave= "+str(key)+" value= "+str(value)
        return "error"

if __name__ == '__main__':
    app.run('0.0.0.0',5000)
