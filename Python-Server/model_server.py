from fastapi import FastAPI
from pydantic import BaseModel
import joblib
import uvicorn

app = FastAPI()
model = joblib.load("model.pkl")
pipeline = joblib.load("pipeline.pkl")

class HouseFeatures(BaseModel):
    longitude: float
    latitude: float
    housing_median_age: float
    total_rooms: float
    total_bedrooms: float
    population: float
    households: float
    median_income: float
    ocean_proximity: str
    
@app.post("/predict")
def predict(features: HouseFeatures):
    input_df = {
        "longitude": [features.longitude],
        "latitude": [features.latitude],
        "housing_median_age": [features.housing_median_age],
        "total_rooms": [features.total_rooms],
        "total_bedrooms": [features.total_bedrooms],
        "population": [features.population],
        "households": [features.households],
        "median_income": [features.median_income],
        "ocean_proximity": [features.ocean_proximity]
    }
    
    import pandas as pd
    x = pd.DataFrame(input_df)
    x_prepared = pipeline.transform(x)
    
    prediction = model.predict(x_prepared)
    return {"predicted_median_house_value": prediction[0]}

if __name__ == "__main__":
    uvicorn.run(app, host="localhost", port=8000)
    

    