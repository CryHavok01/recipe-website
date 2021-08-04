const cleanUserInput = formInput => {
  Object.keys(formInput).forEach(field => {
    if (formInput[field] === "") {
      delete formInput[field]
    }

    if (field === "id") {
      delete formInput[field]
    }

    if (field === "amount" && formInput[field]) {
      const validInput = Number(formInput[field])
      formInput[field] = validInput
    }

    if (typeof formInput[field] === "string") {
      formInput[field] = formInput[field].toLowerCase()
    }
  })

  return formInput
}

export default cleanUserInput