import { filterOutDeletedPosts } from "./filtering";
import { mapPostsToUsers } from "./mapping";
import { sortPostsByPublishedDate, sortUsersByRegistrationDate } from "./sorting";
import { Post, User } from "./types";


function getPosts(): Post[] {
    let posts = require('../data/posts.json') as Post[];

    // exclude posts that are marked as deleted:
    posts = filterOutDeletedPosts(posts);

    // posts are sorted from oldest to newest:
    posts = sortPostsByPublishedDate(posts);

    return posts;
}

function getUsers(): User[] {
    let users = require('../data/users.json') as User[];

    // users are sorted in ascending order by registration date
    users = sortUsersByRegistrationDate(users);

    return users;
}

function printUsersAndPosts() {
    const users = getUsers();
    const posts = getPosts();

    // posts are combined to users in a testable and reusable way
    let usersAndPosts = mapPostsToUsers(users, posts);

    usersAndPosts.forEach(user => {
        console.log(`# ${user.firstName} ${user.lastName} (${user.registeredAt})`);

        user.posts.forEach(p => {
            console.log(` - ${p.title}`);
            console.log(`   ${p.publishedAt} ${p.deletedAt ?? ''}`)
        });

        console.log(); // empty line between each user
    });
}

printUsersAndPosts();
