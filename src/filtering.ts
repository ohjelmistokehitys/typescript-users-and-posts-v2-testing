import { Post } from "./types";


/**
 * Filters an array of posts to exclude posts with a 'deletedAt' timestamp.
 *
 * @param posts  The array of post objects to be filtered.
 * @returns A copy of the given array of posts without deleted posts.
 */
export function filterOutDeletedPosts(posts: Post[]): Post[] {
    // TODO: Implement filtering logic to exclude deleted posts
    // Return the filtered array

    return posts.filter(post => true); // FIXME
}
