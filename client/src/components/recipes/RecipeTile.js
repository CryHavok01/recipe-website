import React from "react"
import { Link } from "react-router-dom"
import _ from "lodash"
import defaultPic from "../../../public/default_recipe_image.jpeg"

const RecipeTile = (props) => {

  const name = _.startCase(props.recipe.name)

  let image
  if(props.recipe.image) {
    image = <img className="shadow" src={props.recipe.image} alt={`A picture of ${name}`}/>
  } else {
    image = <img 
      className="shadow" 
      src={defaultPic}
      alt="A placeholder picture of a blurred out meal"
    />
  }

  return (
    <div className="callout hover-link">
    <Link to={`/recipes/${props.recipe.id}`}>
      <div className="grid-x left">
        <div className="cell medium-8 text-middle">
          <h3 className="title">{name}</h3>
        </div>
        <div className="cell medium-4 center">
          {image}
        </div>
      </div>
    </Link>
    </div>
  )
}

export default RecipeTile