import { Post, User, UserWithPosts } from "./types";

/**
 * Maps posts to users and creates UserWithPosts objects.
 * @param users The array of user objects.
 * @param posts The array of post objects.
 * @returns The array of UserWithPosts objects.
 */
export function mapPostsToUsers(users: User[], posts: Post[]): UserWithPosts[] {
    return users.map(user => {
        return {
            ...user,
            posts: posts.filter(post => post.userId === user.id)
        };
    });
}
