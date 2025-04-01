from langchain_community.chat_models import ChatOpenAI
from langchain_core.prompts import PromptTemplate
import os

API_KEY = os.getenv("OPEN_API_KEY")


def generate_recipe(ingredientes):
    template = """ 
Eres un asistente de cocina. Cuando te proporcione una lista de ingredientes, dame exactamente cuatro recetas simples que se puedan hacer con ellos.

- No es obligatorio usar todos los ingredientes.
- Formatea la respuesta como un **array de objetos JSON válido**:
- Damelo de una manera correcta para que yo directamente haga un map del array de json
- Que cada json dentro del array contenga: Titulo, Ingredientes y Pasos.
- Cada receta debe tener un título único y no repetido.

IMPORTANTE:
Devolveme la respuesta en formato de array de objetos json, sin ningún otro texto adicional.
No me des en el principio y en el final de la respuesta esto: ````json` y ` ``` `
Los ingredientes son: {ingredientes}
""" 
  

    prompt_temp = PromptTemplate(input_variables=["ingredientes"], template=template)
    prompt_value = prompt_temp.format(ingredientes=ingredientes)

    llm = ChatOpenAI(model_name="gpt-4o-mini", openai_api_key=API_KEY)

    response = llm.invoke(prompt_value)
    return response
