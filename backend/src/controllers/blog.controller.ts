import { Context } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import {
  createBlogInput,
  updateBlogPost,
} from "@adityakanthe2024/complete-medium-commmon";

// Controller to create a new blog post
export const createBlog = async (c: Context) => {
  const body = await c.req.json();

  
  // Validate request body using Zod schema
  const { success } = createBlogInput.safeParse(body);
  if (!success) {
    c.status(411);
    return c.json({
      message: "Inputs are not correct",
    });
  }

  // Get userId from the request context (probably set by auth middleware)
  const userId = c.get("userId");

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  // Create a new blog post along with its metadata
  const blog = await prisma.post.create({
    data: {
      title: body.title,
      content: body.content,
      authorId: Number(userId),
      meta:{
        create: {
          title: body.title,
          previewImage: body.previewImage || "", // optional
          subtitle: body.subtitle || "",         // optional
          tags: body.tags || [],                 // optional for now
        },
      }
    },
  });

  return c.json({
    id: blog.id,
    msg: "blog created successfully",
  });
};

// Controller to update an existing blog post
export const updateBlog = async (c: Context) => {
  const body = await c.req.json();

  // Validate input using Zod schema
  const { success } = updateBlogPost.safeParse(body);
  if (!success) {
    c.status(411);
    return c.json({
      message: "Inputs are not correct",
    });
  }

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  // Update the blog post with new title and content
  const blog = await prisma.post.update({
    data: {
      title: body.title,
      content: body.content,
    },
    where: { id: body.id },
  });

  return c.json({
    id: blog.id,
  });
};

// Controller to fetch a blog post by its ID
export const getBlogById = async (c: Context) => {
  const id = c.req.param("id");
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

   // Find the blog post by ID and include the author's name
  try {
    const blog = await prisma.post.findFirst({
      where: { id: Number(id) },
      select: {
        id: true,
        title: true,
        content: true,
        author: {
          select: {
            name: true,
          },
        },
      },
    });
    return c.json({
      blog,
    });
  } catch (error) {
    c.status(411);
    return c.json({ message: "Error while fetching data" });
  }
};

// Todo add pagination
export const getAllBlogById = async (c: Context) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const blog = await prisma.post.findMany({
    select: {
      content: true,
      title: true,
      id: true,
      published: true,
      createdAt: true,
      author: {
        select: { name: true },
      },
      meta: { // Including the related postMeta data
        select: {
          title: true,
          subtitle: true,
          tags: true,
          previewImage: true,
        },
      },
    },
  });
  return c.json({
    blog,
  });
};
