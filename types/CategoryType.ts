export type TCategory = {
    id: string;
    catName: string;
  };
  
  export type TPost = {
    id: string;
    title: string;
    content: string;
    imageUrl?: string;
    publicId?: string;
    catName?: string;
    links: null | string[];
    createdAt: string;
    authorEmail: string;
    post:any | null,
    author: {
      name: string;
    };
  };