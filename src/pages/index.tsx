import React from "react"
import { useQuery, useMutation } from "@apollo/client"
import Card from '../components/Card'
import gql from "graphql-tag"
import "./index.css"
import TextField from "@material-ui/core/TextField/TextField"
import { Button } from "@material-ui/core"
const GET_BOOKMARKS = gql`
{
  bookmarks{ 
    id
    title
    url
    
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
    console.log(urlField.value)
    console.log(titleField.value)

    addBookmark({
      variables: {
        title: titleField.value,
        url: urlField.value,

      },
      refetchQueries: [{ query: GET_BOOKMARKS }]
    })
  }

  return <div className="parent__container">

    <div className="form_container">
      <div>
        <TextField variant="filled" label="Bookmark Title" inputRef={node => titleField = node} />
        <br />
        <br />

        <TextField variant="filled" label="Bookmark Url" inputRef={node => urlField = node} />
        <br />
        <br />
        <Button variant="contained" color="primary" fullWidth onClick={handleSubmit}>Add Bookmark</Button>
      </div>
    </div>
    <div className="cards__container">
      {data?.bookmarks.map(({ url, title, id }) => (


        <Card url={url} title={title} id={id} />

      ))}

    </div>
  </div>
}
