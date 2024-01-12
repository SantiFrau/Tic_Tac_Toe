import { Cuadrado } from './cuadrado.jsx'

export function ModalGanador ({ ganador, reset }) {
  if (ganador === null) return null

  const texto = ganador === false ? 'Empate' : 'Ganó:'

  return (
    <section className='winner'>
      <div className='text'>
        <h2>{texto}</h2>

        <header className='win'>
           <Cuadrado>{ganador}</Cuadrado>
        </header>

        <footer className='footer'>
          <button className='footer-btn' onClick={reset}>Empezar de nuevo</button>
        </footer>
      </div>
    </section>
  )
}