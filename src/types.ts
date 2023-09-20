export interface Post {
    id: number;
    title: string;
    body: string;
    userId: number;
    tags: string[];
    reactions: number;

    /** Time of publishing in ISO format, for example "2023-04-10T09:45:00Z" */
    publishedAt: string;

    /** Optional time of deletion in ISO format, for example "2023-04-10T09:45:00Z" */
    deletedAt?: string;
}

export interface User {
    id: number;
    firstName: string;
    lastName: string;
    age: number;
    gender: string;
    email: string;
    phone: string;
    username: string;
    password: string;
    birthDate: string;
    image: string;
    ip: string;
    ssn: string;
    userAgent: string;

    /** Users who registered through our mobile app have an integer value representing the epoch
     *  timestamp in seconds, while users who registered through the web app have a string in ISO format. */
    registeredAt: number | string;
}

/**
 * Represents a user with associated posts.
 * This union type combines attributes from the 'User' class with a list of 'Post' objects.
 * It is used to represent users along with their posts.
 */
export type UserWithPosts = User & { posts: Post[] };
