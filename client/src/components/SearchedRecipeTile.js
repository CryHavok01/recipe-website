import React from "react"

const SearchedRecipeTile = (props) => {

  return(
    <div>
      <h3>{props.result.title}</h3>
      <img src={props.result.image} alt={`A picture of ${props.result.title}`}/>
    </div>

  )
}

export default SearchedRecipeTile