import os
from flask import Flask, jsonify, request
from pymongo import MongoClient

app = Flask(__name__)

MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017")

client = MongoClient(MONGO_URI)
db = client["shopsphere"]

products_collection = db["products"]
orders_collection = db["orders"]


@app.route("/api/health", methods=["GET"])
def health():
    try:
        client.admin.command("ping")
        return jsonify({"status": "healthy", "database": "connected"}), 200
    except Exception as e:
        return jsonify({"status": "unhealthy", "error": str(e)}), 500


@app.route("/api/products", methods=["GET"])
def get_products():
    products = list(products_collection.find({}, {"_id": 0}))
    return jsonify(products), 200


@app.route("/api/orders", methods=["POST"])
def create_order():
    data = request.get_json()

    if not data or not data.get("items"):
        return jsonify({"error": "Order items are required"}), 400

    order = {
        "customer": data.get("customer", "Guest"),
        "items": data["items"],
        "status": "pending"
    }

    result = orders_collection.insert_one(order)

    return jsonify({
        "message": "Order placed successfully",
        "order_id": str(result.inserted_id)
    }), 201


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
EOF
