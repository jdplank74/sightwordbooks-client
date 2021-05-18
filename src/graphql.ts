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
`

export const BOOKS = gql`
{
  books {
    id
    title
    author
    coverImage {
      url
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
    }
  }
}`

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
}`