import { writeFileSync } from "fs";
import { User } from "../src/types";

const users = require('./users.json') as User[];
const YEAR_IN_MILLISECONDS = 365 * 24 * 60 * 60 * 1_000;

// Add `registeredAt` to all Users.
users.forEach((user) => {
    // One to two years before current time:
    const oneToTwoYears = 1 + Math.random();
    const randomRegisteredAt = new Date(new Date().getTime() - oneToTwoYears * YEAR_IN_MILLISECONDS);

    // The value is either a number (epoch timestamp) or string (iso format)
    user.registeredAt = Math.random() < 0.5 ?
        randomRegisteredAt.toISOString() : Math.trunc(randomRegisteredAt.getTime() / 1_000); // divide by 1000 to make milliseconds into seconds
});

let usersJson = JSON.stringify(users, null, 2);
writeFileSync(__dirname + '/users.json', usersJson);

