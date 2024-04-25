import "../styles/components.css"

export const GamePreview = ({ name, description, imageLocation, gameUrl, onClick }) => {
    return (
        <div className="gamePreview" onClick={onClick}>
            <img src={imageLocation}></img>
            <h4>{name}</h4>
            <p>{description}</p>
        </div>
    )
}