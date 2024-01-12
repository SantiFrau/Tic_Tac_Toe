import "../estilos/cuadrados.css"


export const Cuadrado=({children,index,actualizar,selected})=>{

    
  
    const clase = selected ? "cuadrado selected" : "cuadrado"
    return (
        <div onClick={()=>{actualizar(index)}}  className={clase}> {children}</div>
        //actualizamos cuando haga click con la funcion que le pasamos de app
    )
}