import gql from 'graphql-tag';

export const SIGHTWORDS = gql`
{
  sightwordGroups {
    id
    name
    sightwords {
      word
      group {
        name
      }
    } 
  }
}
`;

export const BOOKS = gql`
{
  books {
    id
    title
    author
    coverImage {
      url
      format
    }
    pages {
      id
      number
    }
  }
}`;

export const PAGE_BY_ID = gql`
query pageById($id: ID) {
  pageById (id: $id) {
    id
    number
    bookId
    prose
    image {
      url
      format
    }
  }
}`;

export const SIGHTWORDGROUPS = gql`
query sightwordGroups {
  sightwordgroups {
    id
    name
    sightwords {
      id
      word
    }
  }
}`;

// addPage(page: PageInput) : Page
// setPageImage(pageImage: PageImageInput) : Page

export const CREATEBOOK = gql`
mutation createBook($book: BookInput) {
  createBook(book: $book) {
    id
  }
}
`;

export const SETBOOKCOVERIMAGE = gql`
mutation setCoverImage($coverImage: CoverImageInput) {
  setCoverImage(coverImage: $coverImage)
  {
    coverImage {
      url
      format
    }
  }
}
`;
