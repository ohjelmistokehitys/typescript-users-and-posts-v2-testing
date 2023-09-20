import { Post, User, UserWithPosts } from "./types";

/**
 * Maps posts to users and creates UserWithPosts objects.
 * @param users The array of user objects.
 * @param posts The array of post objects.
 * @returns The array of UserWithPosts objects.
 */
export function mapPostsToUsers(users: User[], posts: Post[]): UserWithPosts[] {
    // TODO: Create UserWithPosts objects by associating posts with users.
    return users.map(user => {
        return {
            ...user,
            posts: posts.slice(0, 20) // FIXME! Only add the posts for current user
        }
    });
}
