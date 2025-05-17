from flask import Flask, request, send_file
from pymongo import MongoClient
from flask_restful import Resource, Api
from werkzeug.security import generate_password_hash, check_password_hash
from flask_cors import CORS
from datetime import datetime
from bson import ObjectId
from components.utils import ReviewSentiment
import pytz
import os
import json

app = Flask(__name__)
CORS(app)
api = Api(app=app)
client = MongoClient("mongodb://localhost:27017/")
review_sentiment = ReviewSentiment() 
UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
cat_tz = pytz.timezone('Africa/Harare')

#DATABASE MANAGEMENT
database = client.accomodation_finder
clients_collections = database.clients
hosts_collections = database.hosters
listing_collection = database.listings
reviews_collection = database.reviews

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
            "fullname" : fullname,
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
            "fullname" : user["fullname"],
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
            "rent" : float(general_info.get("b_rent")),
            "description" : general_info.get("b_desc"),
            "orientation" : general_info.get("b_orientation"),
            "gender" : general_info.get("b_gender"),
            "rooms" : general_info.get("b_rooms"),
            "services" : services,
            "images" : file_names,
            "average_rating" : 1.0
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
                "rating": listing.get("rating", 0) or 0,
                "average_rating": listing.get("average_rating", 0) or 0
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
            if location != "All Locations":
                match_query["location"] = location

        if rating:
            rating_map  = {
                "Best" : {"$gte" : 3.1 , "$lte" : 5},
                "Average" : {"$gte" : 2 , "$lte" : 2.9},
                "Worst"  :{"$gte" : 1 , "$lte" : 1.99}
            }
            match_query["average_rating"] = rating_map[rating]
        if rent:
            rent = float(rent)
            if rent <= 60:
                match_query["rent"] = {"$gte": 0, "$lte" : 69}
            else:
                match_query["rent"] = {"$gte": rent - 10, "$lte": rent}

        matched = list(listing_collection.find(match_query).skip(skip).limit(limit))
        total = listing_collection.count_documents({})   
        listings = self.trim_data(matched)

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
class Reviews(Listing):
    def set_rating(self, listing_id):
        all_reviews = list(reviews_collection.find({"listing_id": str(listing_id)}, {"_id": 0, "rating": 1}))
        total_reviews = len(all_reviews)

        if total_reviews == 0:
            average = 0
        else:
            total_rating = sum(float(review["rating"]) for review in all_reviews)
            average = total_rating / total_reviews

        listing_collection.find_one_and_update(
            {"_id": listing_id},
            {"$set": {"average_rating": average}}
        )

    def post(self):
        data = request.get_json()
        client_id = ObjectId(data["client_id"])
        listing_id = ObjectId(data["listing_id"])

        if not client_id and not listing_id:
            return {
                "message": "User ID and listing ID are required",
                "isError" : True
            }, 400
        
        sentiment = review_sentiment.get_sentiment(data['review'])
        if sentiment == "dirty":
            return {
                "isProfanity" : True,
                "Message" : "Profanity found in review",
            }, 200
        
        client = clients_collections.find_one({"_id" : client_id})
        review = reviews_collection.insert_one({
            "client_id" : data["client_id"],
            "listing_id"  :data["listing_id"],
            "host_id" : data["host_id"],
            "client_name" : client.get("fullname"),
            "review" : data["review"],
            "rating" : data["rating"],
            "review_score" : sentiment["review_score"],
            "sentiment": sentiment["sentiment"][0],
             "created_at": datetime.now(cat_tz)  
        })
        self.set_rating(data["listing_id"], data["rating"])
        if review.inserted_id:
            self.set_rating(listing_id)
            return {
                "message"  : "Review submitted successfully",
                "isSuccess" : True
            },200 
        return {"message": "An error occured", "isError" : True},400 
    
    def get(self):
        page = int(request.args.get("page", 1))
        host_id = request.args.get("host_id", None)
        listing_id = request.args.get("listing_id", None)
        if not host_id and not listing_id:
            return {
                "message": "Host and Listing required"
            }, 404

        reviews_trimmed = []
        limit = 10
        skip = (page - 1) * limit
        total = reviews_collection.count_documents({
        "host_id": host_id,
        "listing_id": listing_id})
        next_page = page + 1 if skip + limit < total else None
        
        reviews = list(reviews_collection.find({
            "host_id" : host_id,
            "listing_id" : listing_id
        }, {"review": 1, "rating": 1, "client_name": 1, "review_score": 1})
        .sort("created_at", -1)
        .skip(skip)
        .limit(10))

        for review in reviews:
            reviews_trimmed.append({
                "review_id" : str(review["_id"]),
                "review_score" : review["review_score"],
                "review" : review["review"],
                "rating" : review["rating"],
                "client_name" : review["client_name"],
            })

        return {
            "reviews" : reviews_trimmed,
            "next" : next_page,
            "message" :"Reviews retrieved successfully"
        }, 200

api.add_resource(RegisterUser, "/signup/<string:mode>")
api.add_resource(LoginUser, "/signin/<string:mode>")
api.add_resource(Listing, "/add/listing")
api.add_resource(Listings, "/get/listings")
api.add_resource(Images, "/get/image/<string:image_name>")
api.add_resource(GetListing, "/get/listing/<string:id>")
api.add_resource(Reviews, "/review")

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)