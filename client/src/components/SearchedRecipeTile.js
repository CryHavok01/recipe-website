import React from "react"
import { Link } from "react-router-dom"

const SearchedRecipeTile = (props) => {
  return(
    <div className="grid-x">
      <Link to={`/search/${props.result.id}`}>
        <div className="cell medium-8">
          <h3>{props.result.title}</h3>
        </div>
        <div className="cell medium-4">
          <img src={props.result.image} alt={`A picture of ${props.result.title}`}/>
        </div>
      </Link>
    </div>
  )
}

export default SearchedRecipeTile