import {gql} from '@apollo/client'

  export const GET_PROFILE_BY_ADDRESS = gql `
  
  query Profile($where: profile_bool_exp) {
    profile(where: $where) {
      address
      metadata
      authority
      metadata_uri
      screen_name
    }
  }
  `