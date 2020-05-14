from flask import Flask, jsonify,render_template
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, inspect,func
import pandas as pd
import json
engine = create_engine("sqlite:///static/data/clean_gunvio_vol4.sqlite")


Base = automap_base()
Base.prepare(engine, reflect=True)
Base.classes.keys()
gvdata=Base.classes.gun_vio_vol4


app = Flask(__name__)

@app.route("/")
def index():
    return render_template("index.html")

    # (
        # f"Gun Violence Visualization<br/>"
        # f"<a href='static/bindex.html'>map</a><br/>"
        # f"<a href='static/index_gva.html'>state_incident_arrests</a><br/>"
        # f"<a href='static/index_gvk.html'>state_incident_killed</a><br/>"
        # f"<a href='static/tt_index.html'>age</a><br/>"
        # f"<a href='static/vindex.html'>city_gun_sale</a><br/>"
# )


@app.route("/<column>")
def gun_violence(column):
    # column="date"
    value=session.query(getattr(gvdata, column)).all()
    session.close()
    df=pd.DataFrame(value)
    return jsonify(df.to_dict("records"))

@app.route("/all")
def all():
    value=session.query(gvdata).limit(1000).all()
    session.close()
    mylist=[]
    for obj in value:
        mydict={}
        for k,v in obj.__dict__.items():
            if k != '_sa_instance_state':

                mydict[k]=v
        mylist.append(mydict)

    return jsonify(mylist)


if __name__ == "__main__":
    app.run(debug=True)

