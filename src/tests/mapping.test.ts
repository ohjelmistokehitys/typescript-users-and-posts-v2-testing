import { test, describe } from '@jest/globals';
import { strict as assert } from 'node:assert';
import { Post, User } from '../types';
import { mapPostsToUsers } from '../mapping';



describe('mapUsersWithPosts', () => {
    const users = [
        { id: 1, firstName: 'User 1' }, // has 2 posts
        { id: 2, firstName: 'User 2' }, // has 1 post
        { id: 3, firstName: 'User 3' }  // has no posts
    ] as User[];

    const posts = [
        { id: 1, userId: 1, title: 'Post 1 by user 1' },
        { id: 2, userId: 1, title: 'Post 2 by user 1' },
        { id: 3, userId: 2, title: 'Post 3 by user 2' }
    ] as Post[];

    test('posts are mapped with users correctly', () => {

        const usersWithPosts = mapPostsToUsers(users, posts);

        assert.equal(usersWithPosts.length, 3, 'All 3 users should be returned');
        assert.equal(usersWithPosts[0].posts.length, 2, 'User 1 should have 2 posts');
        assert.equal(usersWithPosts[1].posts.length, 1, 'User 2 should have 1 post');
        assert.equal(usersWithPosts[2].posts.length, 0, 'User 3 should have no post');

        assert.equal(usersWithPosts[0].posts[0].title, 'Post 1 by user 1');
        assert.equal(usersWithPosts[0].posts[1].title, 'Post 2 by user 1');
        assert.equal(usersWithPosts[1].posts[0].title, 'Post 3 by user 2');
    });

    test('function does not modify given users', () => {
        const usersWithPosts = mapPostsToUsers(users, posts);

        assert.ok(!('posts' in users[0]), 'Posts array must not be added to the actual User');
    });

    test('empty input arrays are handled without errors', () => {
        const users: User[] = [];
        const posts: Post[] = [];

        const usersWithPosts = mapPostsToUsers(users, posts);

        assert.equal(usersWithPosts.length, 0);
    });
});
