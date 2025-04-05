import { useContext, useState } from 'react';
import Header from './components/Header';
import './App.css';
import SelectIngredientes from './components/SelectIngredients';
import { IngredientesContext } from './Context';
import { SkeletonTheme } from 'react-loading-skeleton';
import Skeleton from 'react-loading-skeleton';
import "react-loading-skeleton/dist/skeleton.css";

function App() {
  const [recetas, setRecetas] = useState([]);
  const [loading, setLoading] = useState(false);
  const { ingredientes } = useContext(IngredientesContext);

  const generate = async () => {
    setRecetas([]);
    setLoading(true);
    try {
      const response = await fetch('https://botcina-c8h3.onrender.com/recipes', {
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
    } finally {
      setLoading(false);
    }
  };

const loadingSkeleton = () => {
  return(
    <div className='w-11/12 mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4'>
      {Array.from({ length: 4 }).map((_, index) => (
        <div key={index} className='w-11/12 p-4 border rounded-md shadow-md bg-white'>
          <SkeletonTheme>
          <Skeleton height={20} width="80%" />
          <div className='mt-4'>
          <p>
          <Skeleton count={3} />
          </p>
          </div>
          </SkeletonTheme>
        </div>
      ))}
    </div>
  )
}

  return (
    <div className='w-full h-screen m-0 p-0'>
      <Header />
      <section className='p-8'>
        <h2 className='text-center text-3xl font-bold mt-8'>¿Qué querés comer hoy?</h2>
        <SelectIngredientes />
        <div className='w-11/12 lg:w-9/12 md:w-9/12 mx-auto'>
        <p className='text-xl my-4 font-semibold'>Tus recetas:</p>
        {loading ? loadingSkeleton() : null}
        <div className='w-11/12 mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4'>
          {recetas.map((receta, index) => (
            <div key={index} className='w-11/12 p-4 border rounded-md shadow-md bg-white'>
              <h3 className='text-xl font-semibold'>{receta.Titulo}</h3>
              <ul className='flex flex-wrap gap-2 mt-4'>
                <li className='text-gray-700 font-semibold'>Ingredientes:</li>
                {receta.Ingredientes.map((ingrediente, index) => (
                  <li key={index} className='text-gray-700'>{ingrediente.toLowerCase().replace(/\b\w/g, letra => letra.toUpperCase())}</li>
                ))}
              </ul>
              <ul className="mt-2">
                <li className='text-gray-700 font-semibold'>Pasos:</li>
                {receta.Pasos.map((paso, index) => (
                  <li key={index} className='text-gray-700'>{paso}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <button className='p-2 rounded-md border-none mt-6 shadow-lg bg-[#ebb206] text-black font-semibold' disabled={loading} onClick={generate}>
          {loading? "Generando recetas..." : "Generar recetas"}
        </button>
        </div>
      </section>
    </div>
  );
}

export default App;
