import { Post, User } from "./types";

/**
 * Sorts an array of items in ascending order based on the 'publishedAt' date. The
 * original array is not modified. Instead, a new array is returned.
 *
 * @param items The array of post objects to be sorted.
 * @returns A new array with the items sorted by publishedAt time.
 */
export function sortPostsByPublishedDate(posts: Post[]): Post[] {
    const comparePublishedTimes = (a: Post, b: Post) => normalizeTime(a.publishedAt) - normalizeTime(b.publishedAt);
    return quickSort(posts, comparePublishedTimes);
}

/**
 * Sorts an array of user objects in ascending order based on the 'registeredAt' date.
 * Handles different data types for 'registeredAt': integer (seconds) and string (iso).
 *
 * @param users The array of user objects to be sorted.
 * @returns New array of users sorted by `registeredAt` timestamps.
 */
export function sortUsersByRegistrationDate(users: User[]): User[] {
    return [...users].sort(compareUsers);
}

function quickSort<Tyyppi>(items: Tyyppi[], cmp: (a: Tyyppi, b: Tyyppi) => number): Tyyppi[] {
    if (items.length < 2) {
        return items;
    }

    let [pivot, ...rest] = items;
    let left = [];
    let right = [];

    for (let current of rest) {
        if (cmp(current, pivot) < 0) {
            left.push(current);
        } else {
            right.push(current);
        }
    }

    return [...quickSort(left, cmp), pivot, ...quickSort(right, cmp)];
}


/**
 * Compares the `registeredAt` times of two users.
 * @returns negative, if u1 < u2, zero if equal, and positive otherwise
 */
function compareUsers(u1: User, u2: User): number {
    let time1 = normalizeTime(u1.registeredAt);
    let time2 = normalizeTime(u2.registeredAt);

    return time1 - time2;
}

/**
 * Handles different data types for 'registeredAt': integer (seconds) and string (iso).
 * @param registeredAt
 * @returns number
 */
function normalizeTime(registeredAt: string | number): number {
    if (typeof registeredAt === 'number') {
        return registeredAt;
    }
    return Math.trunc(Date.parse(registeredAt) / 1000);
}

// These should not be used outside of the package except for testing.
// https://stackoverflow.com/a/54116079
export const exportedForTesting = { compareUsers, normalizeTime };
