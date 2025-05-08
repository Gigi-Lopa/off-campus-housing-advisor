from flask import Flask, request
from pymongo import MongoClient
from flask_restful import Resource, Api
from werkzeug.security import generate_password_hash, check_password_hash
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
api = Api(app=app)
client = MongoClient("mongodb://localhost:27017/")
database = client.accomodation_finder
clients_collections = database.clients
hosts_collections = database.hosters

class RegisterUser(Resource):
    def post(self, mode):
        if mode not in ["client", "host"]:
            return {"message": "Invalid mode"}, 400
        
        model = clients_collections if mode  == "client" else hosts_collections
        data = request.get_json()
        fullname = data.get("fullname")
        email = data.get("email")
        password = data.get("password")


        if not all([fullname, email, password]):
            return {"message" :  "All fields required"},400

        if model.find_one({"email" : email}):
            return {
                "message" : "Account already exists", 
                "isEmail": True,
                "isAccount" : False
            }, 409 
        
        hashed_password = generate_password_hash(password)
        user = model.insert_one({
            "fullname" : fullname, 
            "email" : email,
            "password": hashed_password,
            "label" : mode
        })

        return {
            "message" : "Account created.", 
            "isAccount" : True,
            "user_id" : str(user.inserted_id)
        }, 201 

class LoginUser(Resource):
    def post(self, mode):
        if mode not in ["client", "host"]:
            return {"message": "Invalid mode"}, 400

        model = clients_collections if mode  == "client" else hosts_collections
        data = request.get_json()
        email = data.get("email")
        password = data.get("password")

        user = model.find_one({"email" : email})
        if not user:
            return {
                "message" : "Account does not exist", 
                "isEmail": False,
                "isAccount" : False
            }, 404 
        
        if not check_password_hash(user["password"], password):
            return {
                "message" : "Password incorrect", 
                "isEmail": False,
                "isPassword" : True
            }, 400
        
        return{
            "message" : "Account logged in",
            "isEmail" : True,
            "isPassword" : True
        }, 201

class Listing(Resource):
    def post(self):
        
        pass
    
api.add_resource(RegisterUser, "/signup/<string:mode>")
api.add_resource(LoginUser, "/signin/<string:mode>")
api.add_resource(Listing, "/add/listing")

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)