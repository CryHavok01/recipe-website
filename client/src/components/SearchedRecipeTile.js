import React from "react"
import { Link } from "react-router-dom"
import _ from "lodash"

const SearchedRecipeTile = (props) => {

  const title = _.startCase(props.result.title)
  return(
    <div className="callout hover-link">
      <Link to={`/search/${props.result.id}`}>
        <div className="grid-x left">
          <div className="cell medium-8 text-middle">
            <h3 className="title">{title}</h3>
          </div>
          <div className="cell medium-4 center">
            <img className="shadow" src={props.result.image} alt={`A picture of ${title}`}/>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default SearchedRecipeTile