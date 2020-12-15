#!/usr/bin/env/ python
# 1. import Flask
from models import create_classes
import os
from flask import (
    Flask,
    render_template,
    jsonify,
    request,
    redirect)
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import create_engine
import pandas as pd
import psycopg2
from config import DATABASE_URL


# 2. Create an app, being sure to pass __name__
app = Flask(__name__)

engine = create_engine(DATABASE_URL)
connection = engine.connect()

# 3. Define what to do when a user hits the index route
@app.route("/")
def home():    
    message = "Money, Power and Politics"   
    return render_template("index.html", message = message)

@app.route("/team")
def home():    
    message = "Money, Power and Politics"   
    return render_template("team.html", message = message)

# @app.route("/votersinfo")
# def votersinfo():
#     votersinfo = pd.read_sql("SELECT * FROM votersinfo", con = connection)
#     votersinfo_dict=votersinfo.to_dict(orient="records")
#     return jsonify(votersinfo_dict)

# @app.route("/ranking_members")
# def ranking_members(): 
#     ranking_members = pd.read_sql("SELECT * FROM ranking_members", con = connection)
#     ranking_members_dict=ranking_members.to_dict(orient="records")
#     return jsonify(ranking_members_dict) 

# @app.route("/chair_members")
# def chair_members():
#     chair_members = pd.read_sql("SELECT * FROM chair_members", con = connection)
#     chair_members_dict=chair_members.to_dict(orient="records")
#     return jsonify(chair_members_dict) 
    

# @app.route("/contributions_2014")
# def contributions_2014():
#     contributions_2014= pd.read_sql("SELECT * FROM contributions_2014", con = connection)
#     contributions_2014_dict=contributions_2014.to_dict(orient="records")
#     return jsonify(contributions_2014_dict) 

# @app.route("/contributions_2016")
# def contributions_2016():
#     contributions_2016= pd.read_sql("SELECT * FROM contributions_2016", con = connection)
#     contributions_2016_dict=contributions_2016.to_dict(orient="records")
#     return jsonify(contributions_2016_dict) 
    

# @app.route("/contributions_2018")
# def contributions_2018():
#     contributions_2018= pd.read_sql("SELECT * FROM contributions_2018", con = connection)
#     contributions_2018_dict=contributions_2018.to_dict(orient="records")
#     return jsonify(contributions_2018_dict)

@app.route("/consolidated_ranking")
def consolidated_ranking():
    consolidated_ranking=pd.read_sql("SELECT * FROM consolidated_ranking", con= connection)
    consolidated_ranking_dict=consolidated_ranking.to_dict(orient="records")
    return jsonify(consolidated_ranking_dict)

@app.route("/consolidated_chairs")
def consolidated_chairs():
    consolidated_chairs=pd.read_sql("SELECT * FROM consolidated_chairs", con= connection)
    consolidated_chairs_dict=consolidated_chairs.to_dict(orient="records")
    return jsonify(consolidated_chairs_dict)

if __name__ == "__main__":
    app.run(debug=True)