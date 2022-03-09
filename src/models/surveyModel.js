class Survey {
  constructor(
    id,
    name,
    creatorId,
    stateId,
    users,
    creationDate,
    questions,
    instructions,
    products,
    userProducts
  ) {
    (this.id = id),
      (this.name = name),
      (this.creatorId = creatorId),
      (this.stateId = stateId),
      (this.users = users),
      (this.creationDate = creationDate),
      (this.questions = questions),
      (this.instructions = instructions),
      (this.products = products),
      (this.userProducts = userProducts);
  }
}
