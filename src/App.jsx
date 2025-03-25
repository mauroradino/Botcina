import { useContext, useState } from 'react'
import Header from './components/Header'
import './App.css'
import SelectIngredientes from './components/SelectIngredients';
import { IngredientesContext } from './Context';
import ReactMarkdown from "react-markdown"

function App() {
  const [recetas, setRecetas] = useState("")
  const [loading, setLoading] = useState(false)
  const {ingredientes } = useContext(IngredientesContext)
 const generate = async () => {
   setRecetas("")
   setLoading(true)
   try {
     const response = await fetch('http://127.0.0.1:8002/recipes', {
       method: 'POST',
       headers: {
         'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ingredientes: ingredientes }), 
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    
    const data = await response.json();
    setRecetas(data); 
  } catch (error) {
    console.error('Error fetching recipes:', error);
  }
  finally{
    setLoading(false)
  }
};

  return (
    <div className='w-screen h-screen m-0 p-0'>
    <Header/>
    <section className='p-8'>
    <h2 className='text-center text-3xl font-bold mt-8'>¿Que querés comer hoy?</h2>
    <SelectIngredientes/>
    <p className='text-xl my-4 font-semibold'>Tus recetas:</p>
    {loading ? (<p>👨‍🍳 Cocinando tu respuesta...</p>) : null}
    <ReactMarkdown>{recetas}</ReactMarkdown>
    <button className='p-2 rounded-md border-2 mt-4 shadow-lg bg-sky-500 text-white' onClick={generate}>Generar recetas</button>
    </section>
    </div>
  )
}

export default App
