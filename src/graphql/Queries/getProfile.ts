import {gql} from '@apollo/client'

export const  GET_PROFILE_BY_NAME = gql`
query Profile($where: profile_bool_exp) {
    profile(where: $where) {
      address
      authority
      created_at
      metadata
      metadata_uri
      screen_name
    }
  }
`