from flask import Flask, request
import redis
import logging
from fluent import handler

custom_format = {
  'host': '%(hostname)s',
  'where': '%(module)s.%(funcName)s',
  'type': '%(levelname)s',
  'stack_trace': '%(exc_text)s'
}

logging.basicConfig(level=logging.INFO)
l = logging.getLogger('app.logger')
h = handler.FluentHandler('app.follow', host='192.168.0.18', port=24224)
formatter = handler.FluentRecordFormatter(custom_format)
h.setFormatter(formatter)
l.addHandler(h)


app = Flask(__name__)
r= redis.Redis(host='192.168.0.18', port= 6379 , db=0)
@app.route('/result', methods = ['GET'])
def result():
    if request.method == 'GET':
        param = request.args.get('search', None)
        if param:
            r.get(param)
            l.info({  'Operation': 'query', 'result': 'successful'})
            return r.get(param)
        l.error({  'Operation': 'query', 'result': 'failed'})
        return "No place information is given"

@app.route('/insert', methods= ['POST'])
def insert():
    if request.method == 'POST':
        key = request.form['key']
        value = request.form['value']
        if key and value:
            r.set(key,value)
            l.info({  'Operation': 'insert', 'result': 'successful'})
            return "Se ha agregado:  llave= "+str(key)+" value= "+str(value)
        l.error({  'Operation': 'insert', 'result': 'failed'})
        return "error"

if __name__ == '__main__':
    app.run('0.0.0.0',5000)
