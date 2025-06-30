export interface Repository {
  id: string;
  fullName: string;
  description: string;
  language: string;
  forksCount: number;
  stargazersCount: number;
  ratingAverage: number;
  reviewCount: number;
  ownerAvatarUrl: string;
  url: string;
}

export interface Values {
  username: string;
  password: string;
  passwordConfirmation?: string;
}
export interface ReviewValues {
  ownerName: string;
  repositoryName: string;
  rating: string;
  text?: string;
}
