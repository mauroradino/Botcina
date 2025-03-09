from langchain_community.chat_models import ChatOpenAI
from langchain_core.prompts import PromptTemplate
import os

API_KEY = os.getenv("OPEN_API_KEY")



def generate_recipe(ingredients):
    template = """
    Eres un asistente de cocina, quiero que cada vez que te diga que ingredientes tengo me des tres recetas simples 
    para hacer con ellos, indicandome el paso a paso de manera clara y sencilla. No hace falta que uses absolutamente todos los ingredientes
    y quiero que no me des texto de mas como por ejemplo: Claro!, espero que disfrutes las recetas!, etc. Solo dame las recetas.
    Formatea el texto que me des para que yo lo muestre en frontend.

    usa el siguiente formato:
    Receta 1: Arroz con Pollo
Ingredientes:

1 taza de arroz
2 pechugas de pollo
4 tazas de agua
Sal al gusto
Aceite de oliva
Instrucciones:

En una olla, calienta un chorrito de aceite de oliva a fuego medio.
Agrega las pechugas de pollo y dora por ambos lados.
Retira el pollo y en la misma olla añade el arroz, sofríe por 2 minutos.
Vuelve a colocar el pollo en la olla y añade el agua y sal al gusto.
Cocina a fuego alto hasta que hierva, luego reduce el fuego a bajo y tapa.
Cocina por 20 minutos o hasta que el arroz esté tierno y el agua se haya absorbido.

----------------------------------------------------------------------------------------------

Receta 2: Pollo Salteado con Arroz
Ingredientes:

2 pechugas de pollo
1 taza de arroz
2 cucharadas de salsa de soja
Aceite de oliva
Sal y pimienta al gusto
Instrucciones:

Cocina el arroz según las instrucciones del paquete.
Mientras se cocina el arroz, corta las pechugas de pollo en tiras.
En una sartén grande, calienta aceite de oliva a fuego medio-alto.
Agrega el pollo y saltea hasta que esté dorado y cocido.
Añade la salsa de soja, sal y pimienta al gusto y mezcla bien.
Sirve el pollo salteado sobre el arroz cocido.

---------------------------------------------------------------------------------------------------

Receta 3: Sopa de Pollo con Arroz
Ingredientes:

2 pechugas de pollo
1 taza de arroz
6 tazas de agua
Sal y pimienta al gusto
Verduras opcionales (zanahorias, cebolla)
Instrucciones:

En una olla grande, coloca las pechugas de pollo y el agua. Lleva a ebullición.
Si deseas, agrega verduras picadas para más sabor.
Cocina a fuego medio durante 20 minutos.
Retira el pollo, desmenúzalo y regresa a la olla.
Añade el arroz y cocina por 15 minutos más.
Sazona con sal y pimienta al gusto. Sirve caliente.

    los ingredientes son: {ingredients} 
    """

    prompt_temp = PromptTemplate(input_variables=["ingredientes"], template=template)
    prompt_value = prompt_temp.format(ingredients=ingredients)

    llm = ChatOpenAI(model_name="gpt-4o-mini", openai_api_key=API_KEY)

    response = llm.invoke(prompt_value)
    return response
 