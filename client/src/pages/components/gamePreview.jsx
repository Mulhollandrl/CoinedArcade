import "../styles/components.css"

export const GamePreview = ({ name, description, imageLocation, gameUrl, onClick }) => {
    return (
        <div className="gamePreview" onClick={onClick}>
            <img src={imageLocation}></img>
            <h2>{name}</h2>
            <p>{description}</p>
        </div>
    )
}