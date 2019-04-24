from flask import Flask, request
import redis
key=0
app = Flask(__name__)
r= redis.Redis(host='localhost', port= 6379 , db=0)
@app.route('/result', methods = ['GET'])
def result():
    if request.method == 'GET':
        param = request.args.get('place', None)
        if param:
            r.get(param)
            return r.get(param)
        return "No place information is given"

@app.route('/insert', methods= ['POST'])
def insert():
    i1= "entro al metodo" 
    if request.method == 'POST':
        i1 += "entró al post"
        param = request.form
        i1+= str(param)
        print(param)
        if param:
            i1+= "entro al condicional"
            return i1
            r.set(key,param)
            key=str(key+1)
            return "Se ha agregado la entrada a la base de datos"
        return i1

if __name__ == '__main__':
    app.run("0.0.0.0",5000)
