import "../estilos/app.css";
import { Cuadrado } from "./cuadrado.jsx";
import { useState ,useEffect} from "react";
import { turnos , posisiones_ganadoras } from "../constantes/const";
import { ModalGanador } from "./ganador.jsx";



export function App(){
    
   
    const [turno,cambiar_turno] = useState(turnos[0]); //estado para los turnos
    const [posisiones_cuadrado,set_pos] = useState(Array(9).fill(null)); // estados para cada cuadrado
    const [ganador,set_ganador] = useState(null); //estado para guardar ganador
    
    //funcion para actualizar segun la posision del tablero
    const actualizar =(index)=>{
       
        if(posisiones_cuadrado[index]==null){ //si ya esta ocupado el cuadrado no actualizamos


        let nuevo_posisiones_cuadrado = [...posisiones_cuadrado]; //Creando un nuevo array con todo lo del anterior
        nuevo_posisiones_cuadrado[index]=turno; //cambiamos la posision
        set_pos(nuevo_posisiones_cuadrado);//seteamos las nuevas posisiones

        const nuevo_turno = turno == turnos[0] ? turnos[1] : turnos[0];
        cambiar_turno(nuevo_turno);
          
           
        
        }
    }
    //verificamos cada vez que cambia el estado del turno
    useEffect(()=>{
      verificar_ganador(posisiones_cuadrado);
    },[turno])
    
    const verificar_ganador=(checkear_posisiones)=>{
    
          for(let posisiones of posisiones_ganadoras){
            const c = [checkear_posisiones[posisiones[0]],checkear_posisiones[posisiones[1]],checkear_posisiones[posisiones[2]]]
           
            if( c[0]!=null && c[0]==c[1] && c[1]==c[2] ){
              set_ganador(c[0]); //seteamos nuevo ganador 
            }

          }
          //verificar empate
          let c=0;
          for(let posision of checkear_posisiones){
            if(posision!=null){
              c++;
            }
          }
          if(c==9){
            set_ganador(false); //setemos false para detectar el empate y que cambie el estado del  elemento modal
          }
          

        }
    

  //reinicio del juego
    const reset =()=>{
        set_pos(Array(9).fill(null));
        cambiar_turno(turnos[0]);
        set_ganador(null);
    }

    return (
        <>
        <header className="btn-reinicio" onClick={reset}>Reinicio</header>

        <section className="tablero">
        {posisiones_cuadrado.map((cuadrado,index)=>{ //mapeando las posisiones del tablero
            return (
                <Cuadrado key={index} index={index} actualizar={actualizar} >{cuadrado}</Cuadrado>
            )
        })}
        </section>

        <section className="turnos">
       {turnos.map((t, index) => (
           <Cuadrado className="turnos-select" key={index+10} selected={turno === t}>
                        {t}
           </Cuadrado>
           ))}
        </section>

        <ModalGanador reset={reset} ganador={ganador} ></ModalGanador> 
      </>
      //creamos el componente modal y le pasamos su estado y funcion de reset
      //segun su estado se va a mostrar o no 
    )

}
