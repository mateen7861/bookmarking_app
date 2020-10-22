import React from "react"
import { useQuery, useMutation } from "@apollo/client"
import gql from "graphql-tag"
const GET_BOOKMARKS = gql`
{
  bookmarks{ 
    id
    title
    
  }
}
`
const ADD_BOOKMARK = gql`
    mutation addBookmar($url: String!, $title: String!){
        addBookmark(url: $url, title: $title){
            id
        }
    }
`
export default function Home() {
  const { data, loading, error } = useQuery(GET_BOOKMARKS)
  const [addBookmark] = useMutation(ADD_BOOKMARK)
  let titleField, urlField
  const handleSubmit = () => {
    console.log(titleField.value)
    console.log(urlField.value)
    addBookmark({
      variables: {
        title: titleField.value,
        url: urlField.value,

      },
      refetchQueries: [{ query: GET_BOOKMARKS }]
    })
  }
  console.log(data)
  return <div>
    <label htmlFor="">
      Bookmark Title
      <br />
      <input type="text" name="" id="" ref={node => titleField = node} />
    </label>
    <br />
    <label htmlFor="">
      Bookmark Url
      <br />
      <input type="text" name="" id="" ref={node => urlField = node} />
    </label>
    <br />
    <br />
    <button onClick={handleSubmit}>Add Bookmark</button>
  </div>
}
