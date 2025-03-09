from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .model import generate_recipe
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Cambiar "*" por los dominios permitidos si es necesario
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/recipes")
def get_recipes(data:dict):
    recipes = generate_recipe(data["ingredientes"])
    return recipes.content
