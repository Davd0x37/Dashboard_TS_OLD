export default {
  addAuthor(root: any, args: any): object {
    return {
      id: args.id,
      name: args.name,
      email: args.email,
      password: args.password,
    }
  },

  addBook(root: any, args: any): object {
    return {
      title: args.title,
      author: args.author,
      author_id: args.author_id,
    }
  },
}
