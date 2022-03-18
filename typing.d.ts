export interface Post {
  _id: string
  _createdAt: string
  title: string
  keywords: string
  author: {
    name: string
    image: string
    slug: { 
      current: string
    }
  }
  description: string
  mainImage: {
    asset: {
      url: string
    }
  }
  slug: {
    current: string
  }
  body: [object]
}

export interface Author {
  name: string;
  image: string;
  bio: [object];
  slug: {
    current: string
  };
  joinedAt: string;
  socialLink: string;
}
