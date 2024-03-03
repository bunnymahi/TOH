import os
from flask import Flask, request, jsonify, render_template, send_from_directory
from flask_cors import CORS
from keras.preprocessing.image import load_img
import numpy as np
import tensorflow as tf
from PIL import Image
# from flask_pymongo import PyMongo
from io import BytesIO
import base64
import datetime


app = Flask(__name__)
CORS(app)


model_path = ""
loaded_model = tf.keras.models.load_model(model_path)

last_id = mongo.db.result.find_one(sort=[("_id", -1)])
id = 1 if last_id is None else last_id["_id"] + 1


def get_imagenames():
    id_list = []
    results = mongo.db.result.find({}, {"image_path": 1})
    for result in results:
        if 'image_path' in result:
            id_list.append(result['image_path'])
    return (id_list)


def add_data(data, image_data):
    global id

    # Retrieve the latest count from the database
    last_entry = mongo.db.result.find_one(sort=[("_id", -1)])
    count = 0 if last_entry is None else last_entry.get("count", 0)

    names = get_imagenames()

    if image_data not in names:
        data["_id"] = id
        data['image_path'] = image_data
        data['count'] = count + 1  # Increment the count by 1
        data['uploaded_at'] = datetime.datetime.now()
        mongo.db.result.insert_one(data)
    else:
        # Update the existing document based on image_data
        mongo.db.result.update_one({"image_path": image_data}, {"$set": data})

    id += 1


def predict_image(image_path):
    img = load_img(image_path, target_size=(128, 128))
    img = np.array(img)
    img = img / 255.0
    img = img.reshape(1, 128, 128, 3)
    pred = loaded_model.predict(img)
    return pred

@app.route('/predict', methods=['POST'])
def predict():
    file = request.files['fileee']
    
    if file:
        image_path = os.path.join("uploads", file.filename)
        file.save(image_path)
        pred = predict_image(image_path)

        if pred[0] > 0.5:
            prediction = 'normal'
        else:
            prediction = 'cracked'

        confidence = int(pred[0][0] * 100)

        response = {
            "prediction": prediction,
            "confidence": confidence,
        }

        

        add_data(response, image_path)


        return jsonify(response)

@app.route('/display')
def display():

    last_doc = mongo.db.result.find_one(sort=[("_id", -1)])
    name = last_doc["image_path"]
    name = os.path.basename(name)

    return render_template("display.html", message=f"Probability: {last_doc['confidence']} (Prediction: {last_doc['prediction']})", image_path = last_doc['image_path'],date = last_doc['uploaded_at'],name = name)


@app.route('/uploads/<filename>')
def get_image(filename):
    return send_from_directory('uploads', filename)


if __name__ == '__main__':
    app.run(debug=True)
