import { test, describe, expect } from '@jest/globals';
import { strict as assert } from 'node:assert';
import { Post } from '../types';
import { filterOutDeletedPosts } from '../filtering';


function createTestPost(publishedAt: string, deletedAt?: string): Post {
    // The functions under test are not allowed to modify the data
    return Object.freeze({
        "id": Math.trunc(Math.random() * 10_000),
        "title": deletedAt ? "Deleted post" : "Active post",
        "body": "",
        "userId": 0,
        "tags": [],
        "reactions": 0,
        "publishedAt": publishedAt,
        "deletedAt": deletedAt
    });
}


describe('filtering posts', () => {
    const active2022 = createTestPost("2022-02-02T02:02:02Z");
    const active2023 = createTestPost("2023-03-03T03:03:03Z");
    const deleted2022 = createTestPost("2022-02-02T02:02:02Z", "2022-02-03T02:02:02Z");
    const deleted2023 = createTestPost("2023-02-02T02:02:02Z", "2023-02-03T02:02:02Z");

    test('active posts are included in the result', () => {
        let filtered = filterOutDeletedPosts([active2022, active2023]);
        assert.deepEqual(filtered, [active2022, active2023]);
    });

    test('posts marked as deleted are excluded from the result', () => {
        let filtered = filterOutDeletedPosts([deleted2022, deleted2023]);
        assert.deepEqual(filtered, []);
    });

    test('the function does not modify the original array', () => {
        let original = [active2022, deleted2022, active2023, deleted2023];
        let filtered = filterOutDeletedPosts(original);

        assert.deepEqual(original, [active2022, deleted2022, active2023, deleted2023], 'filterOutDeletedPosts must not modify the given array');
        assert.deepEqual(filtered, [active2022, active2023], 'Deleted posts must be filtered between active articles');
    });
});
