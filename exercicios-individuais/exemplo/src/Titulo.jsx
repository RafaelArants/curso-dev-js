function Titulo({titulo = "Exemplo React"}){
    return (
        <div className="container">
            <h1 className="text-primary">{titulo}</h1>
        </div>
    )
}

export default Titulo;