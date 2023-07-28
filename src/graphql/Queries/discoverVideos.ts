import { gql } from "@apollo/client";

export const DISCOVER_VIDEOS = gql`
query Post($where: post_bool_exp) {
    post(where: $where) {
      
      address
      created_at
      metadata_uri
      profile
      refreshed_at
      reply_to
      metadata
    }
  }

`