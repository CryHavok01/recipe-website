import React from "react"
import { Link } from "react-router-dom"

const SearchedRecipeTile = (props) => {
  return(
    <Link to={`/search/${props.result.id}`}>
      <h3>{props.result.title}</h3>
      <img src={props.result.image} alt={`A picture of ${props.result.title}`}/>
    </Link>
  )
}

export default SearchedRecipeTile