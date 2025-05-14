from flask import Flask, request, send_file
from pymongo import MongoClient
from flask_restful import Resource, Api
from werkzeug.security import generate_password_hash, check_password_hash
from flask_cors import CORS
from datetime import datetime
from bson import ObjectId
import pytz
import os
import json


app = Flask(__name__)
CORS(app)
api = Api(app=app)
client = MongoClient("mongodb://localhost:27017/")
UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
cat_tz = pytz.timezone('Africa/Nairobi')

#DATABASE MANAGEMENT
database = client.accomodation_finder
clients_collections = database.clients
hosts_collections = database.hosters
listing_collection = database.listings

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
            "isPassword" : True,
            "user_id" : str(user["_id"])
        }, 201

class Listing(Resource):
    def post(self):
        general_info = json.loads(request.form.get("general_information", "{}"))
        services = json.loads(request.form.get("services", "[]"))
        host_id = general_info.get("host_id")

        listing_ = listing_collection.find_one({
            "$or": [
                {"name": general_info.get("b_name")},
                {"address": general_info.get("b_address")}
            ]
        })

        if listing_:
            return {
                "isExist" : True,
                "message" : "Account name taken"
            }, 400

        if not general_info and len(services) != 0:
            return {
                "message" : "Invalid information format"
        },400 

        BEDROOM = request.files.get("bedroom")
        DINING_ROOM = request.files.get("dining_room")
        EXTERIOR = request.files.get("exterior")
        KITCHEN = request.files.get("kitchen")
        RESTROOM = request.files.get("toilet")
        
        file_names = {
            "BEDROOM" : f"BEDRROM_{host_id}_{datetime.now(cat_tz).strftime('%Y%m%d_%H%M%S')}.jpg",
            "DINING_ROOM" : f"DININGROOM_{host_id}_{datetime.now(cat_tz).strftime('%Y%m%d_%H%M%S')}.jpg",
            "EXTERIOR" : f"EXTERIOR_{host_id}_{datetime.now(cat_tz).strftime('%Y%m%d_%H%M%S')}.jpg",
            "KITCHEN" : f"KITCHEN_{host_id}_{datetime.now(cat_tz).strftime('%Y%m%d_%H%M%S')}.jpg",
            "RESTROOM" : f"RESTROOM_{host_id}_{datetime.now(cat_tz).strftime('%Y%m%d_%H%M%S')}.jpg",
        }
        
        bedroom_fp = os.path.join(UPLOAD_FOLDER, file_names["BEDROOM"])
        dining_room_fp = os.path.join(UPLOAD_FOLDER, file_names["DINING_ROOM"])
        exterior_fp = os.path.join(UPLOAD_FOLDER, file_names["EXTERIOR"])
        kitchen_fp = os.path.join(UPLOAD_FOLDER, file_names["KITCHEN"])
        restroom_fp = os.path.join(UPLOAD_FOLDER, file_names["RESTROOM"])

        listing  = listing_collection.insert_one({
            "host_id" : host_id,
            "name" : general_info.get("b_name"),
            "location" : general_info.get("b_location"),
            "address"  : general_info.get("b_address"),
            "rent" : general_info.get("b_rent"),
            "description" : general_info.get("b_desc"),
            "orientation" : general_info.get("b_orientation"),
            "gender" : general_info.get("b_gender"),
            "rooms" : general_info.get("b_rooms"),
            "services" : services,
            "images" : file_names
        })
        if listing.inserted_id:
            BEDROOM.save(bedroom_fp)
            DINING_ROOM.save(dining_room_fp)
            EXTERIOR.save(exterior_fp)
            KITCHEN.save(kitchen_fp)
            RESTROOM.save(restroom_fp)
            
            return {
                "status" : True,
                "message" : "Listing Added successfully",
                "listing_id"  :str(listing.inserted_id)
            }, 200

        return {
            "status" : False, 
            "message" : "Listing creation failed"
        }
class Listings(Resource):   
    def trim_data(self, listings):
        data = []
      
        for listing in listings:
            total_students = 0
            host_ = hosts_collections.find_one({"_id": ObjectId(listing["host_id"])}, {"_id" : 0})
            host_name = host_.get("fullname", "") if host_ else "Unknown"

            for room in listing["rooms"]:
                total_students = total_students + int(room)
            
            data.append({
                "listing_id": str(listing["_id"]),
                "hosted_by" : host_name,
                "name": listing["name"],
                "location": listing["location"],
                "rent": listing["rent"],
                "orientation": listing["orientation"],
                "gender": listing["gender"],
                "total_students": total_students,
                "images": listing["images"]["BEDROOM"],
                "rating": listing.get("rating", 0) or 0
            })

        return data
    def get(self):
        page = int(request.args.get("page", 1))
        location = request.args.get("location")
        rating = request.args.get("rating")
        rent = request.args.get("rent")

        limit = 10
        skip = (page - 1) * limit

        match_query = {}
        if location:
            match_query["location"] = location
        if rating:
            match_query["rating"] = rating
        if rent:
            match_query["rent"] = {"$gte": int(rent), "$lte": int(rent) + 10}

        matched = list(listing_collection.find(match_query).limit(limit))
        matched_count = len(matched)

        if matched_count < limit:
            unmatched_limit = limit - matched_count

            unmatched_query = {
                "$or": []
            }
            if location:
                unmatched_query["$or"].append({"location": {"$ne": location}})
            if rating:
                unmatched_query["$or"].append({"rating": {"$ne": rating}})
            if rent:
                unmatched_query["$or"].append({"rent": {"$lt": int(rent)}})
                unmatched_query["$or"].append({"rent": {"$gt": int(rent) + 10}})
            if unmatched_query["$or"]:
                unmatched = list(listing_collection.find(unmatched_query).limit(unmatched_limit))
            else:
                unmatched = []
        else:
            unmatched = []

        combined = matched + unmatched

        total = listing_collection.count_documents({})   

        listings = self.trim_data(combined)
        pagination = {
            "page": page,
            "limit": limit,
            "total": total,
            "pages": (total + limit - 1) // limit,
            "prev": page - 1 if page > 1 else None,
            "next": page + 1 if skip + limit < total else None
        }

        return {
            "status": True,
            "pagination": pagination,
            "data": listings
        }, 200

class Images(Resource):
    def get(self, image_name):
        image_path = os.path.join("uploads", image_name)
        return send_file(image_path, mimetype="image/jpeg")
class GetListing(Listings):
    def get(self, id):
        try:
            listing = listing_collection.find_one({"_id": ObjectId(id)})
        except Exception:
            return {"message": "Invalid listing ID"}, 400

        if listing is None:
            return {"message": "Listing not found"}, 404

        # Clean ObjectId fields for JSON
        listing["listing_id"] = str(listing.pop("_id"))
        listing["host_id"] = str(listing["host_id"])

        host_ = hosts_collections.find_one({"_id": ObjectId(listing["host_id"])}, {"_id": 0})
        host_name = host_.get("fullname", "") if host_ else "Unknown"

        other_listings_all = list(
            listing_collection.find({
                "host_id": ObjectId(listing["host_id"]),
                "_id": {"$ne": ObjectId(id)}
            })
        )

        other_listings = self.trim_data(other_listings_all)
        return {
            "listing": listing,
            "other_listings": other_listings,
            "host_name": host_name,
            "status": True
        }, 200

api.add_resource(RegisterUser, "/signup/<string:mode>")
api.add_resource(LoginUser, "/signin/<string:mode>")
api.add_resource(Listing, "/add/listing")
api.add_resource(Listings, "/get/listings")
api.add_resource(Images, "/get/image/<string:image_name>")
api.add_resource(GetListing, "/get/listing/<string:id>")

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)