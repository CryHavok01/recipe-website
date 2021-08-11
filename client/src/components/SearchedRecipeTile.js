import React from "react"
import { Link } from "react-router-dom"

const SearchedRecipeTile = (props) => {
  return(
    <div className="callout">
      <Link to={`/search/${props.result.id}`}>
        <div className="grid-x left">
          <div className="cell medium-8 text-middle">
            <h3>{props.result.title}</h3>
          </div>
          <div className="cell medium-4 border center">
            <img src={props.result.image} alt={`A picture of ${props.result.title}`}/>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default SearchedRecipeTile