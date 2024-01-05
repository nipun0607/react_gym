import './Card.css'

const Card=(props)=>{

    return (
        <div className="card_container">
        <img src={props.gifUrl} alt="exsecise-image"/>
        <div className="decription">
        <h2>{props.name}</h2>
        <p>{props.target}</p>
        <p>{props.bodyPart}</p>
        </div>
        </div>
    )
}
export default Card;