import { Post, User } from "./types";

/**
 * Sorts an array of posts in ascending order based on the 'publishedAt' date. The
 * original array is not modified. Instead, a new array is returned.
 *
 * @param posts The array of post objects to be sorted.
 * @returns A new array with the posts sorted by publishedAt time.
 */
export function sortPostsByPublishedDate(posts: Post[]): Post[] {
    // TODO: Implement manual sorting logic here.
    // The existing `sort` method must not be used!
    // See https://en.wikipedia.org/wiki/Sorting_algorithm.
    return [...posts];
}

/**
 * Sorts an array of user objects in ascending order based on the 'registeredAt' date.
 * Handles different data types for 'registeredAt': integer (seconds) and string (iso).
 *
 * @param users The array of user objects to be sorted.
 * @returns New array of users sorted by `registeredAt` timestamps.
 */
export function sortUsersByRegistrationDate(users: User[]): User[] {
    // TODO: Implement sorting logic. This time you are allowed to use the existing `sort` method.

    // NOTE! The users' timestamps are presented in Unix time, which counts seconds since epoch.
    // JavaScript Dates use milliseconds instead of seconds. See https://stackoverflow.com/a/221297 for more info.
    return [...users];
}
