import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation ($username: String!, $password: String!) {
    authenticate(credentials: { username: $username, password: $password }) {
      accessToken
    }
  }
`;

export const REVIEW = gql`
  mutation ($review: CreateReviewInput) {
    createReview(review: $review) {
      id
      createdAt
      rating
      text
      repositoryId
    }
  }
`;

export const SIGNUP = gql`
  mutation ($user: CreateUserInput) {
    createUser(user: $user) {
      id
    }
  }
`;
