// src/features/blog/createBlogTypes.ts
export interface CreateBlogPayload {
    title: string;
    subtitle: string;
    content: string;
    previewImage?: string;
    tags?: string[];
  }
  
  export interface BlogResponse {
    id: string;
    title: string;
    content: string;
    subtitle: string;
    previewImage: string;
    tags: string[];
  }
  