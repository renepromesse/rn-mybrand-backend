module.exports = mongoose => {
    const Book = mongoose.model(
      "book",
      mongoose.Schema(
        {
          name: String,
          description: String,
          author: String,
        }
      )
    );
  
    return Book;
  };