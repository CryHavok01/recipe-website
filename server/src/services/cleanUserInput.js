const cleanUserInput = formInput => {
  Object.keys(formInput).forEach(field => {
    if (formInput[field] === "") {
      delete formInput[field]
    }

    if (field === "amount" && formInput[field]) {
      const validInput = Number(formInput[field])
      formInput[field] = validInput
    }
  })

  return formInput
}

export default cleanUserInput