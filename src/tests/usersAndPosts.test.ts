import { strict as assert } from 'assert';
import { jest, test } from '@jest/globals';
import util from 'util';

// use util.promisify to make `exec` function work with promises: https://stackoverflow.com/a/56095793
const exec = util.promisify(require('child_process').exec) as (command: string) => Promise<{ stdout: string, stderr: string }>;

const expected = `Terry Medhurst
They rushed out the door.
The paper was blank.
So what is the answer? How can you stand
Sheldon Quigley
He swung back the fishing pole and cast the line
Are you getting my texts???
Terrill Hills
Balloons are pretty and come in different colors
Happiness was different in childhood.
Imagine the silence now, in that place which
A judgment that is necessarily hampered
Miles Cummerata
He watched as the young man tried
Lyrical poetry is a realm in which any
Christ, he thinks, by my age I ought to know
They look so fine, and young
Mavis Schultz
She was in a hurry.
A long black shadow slid across the pavement
There was something beautiful in his hate.
Alison Reichert
On Saturday nights I would sit by the phone
She would never know, because he would
When a woman withdraws to give birth the
Oleta Abbott
You know that tingly feeling you get on the back of your neck sometimes?
Looking back on those incidents,
Ewell Mueller
Being in high school, Miles had no idea there
Revolution and youth are closely allied.
He thought of the cost exacted
Demetrius Corkery
His mother had always taught him
In the days to follow the hacendado would
Everything failed to subdue me
Eleanora Price
Pink ponies and purple giraffes roamed the field.
Marcel Jones
The shoes had been there for as long as anyone could remember.
Assunta Rath
All he wanted was a candy bar.
This is important to remember.
The red line moved across the page.
Trace Douglas
He was an expert but not in a discipline
His parents continued to question him.
If only it were all so simple! If only there
He buried her beside her husband
He once thought it himself, that he might die
Enoch Lynch
You must thrive in spite of yourself
Jeanne Halvorson
The trees, therefore, must be such old
She sat deep in thought.
Her mom had warned her.
He stepped away from the mic. This was the best take he had done so far
Were you in love with her?
Bradford Prohaska
Ten more steps.
The choice was red, green, or blue.
Arely Skiles
Trees. It was something about the trees.
There were little things that she simply could not stand.
When they leave the church, the last light is
During the first part of your life
Gust Purdy
He collected the plastic trash on a daily basis.
All Hallows Day: grief comes in waves.
Later, on my walk, I wondered why I felt I
Lenna Renner
Have you ever wondered about toes?
Act, implores the Ghost of Future Regret.
Doyle Ernser
It was difficult to explain to them
Tressa Weber
He had three simple rules by which he lived.
There was something in the tree.
Sometimes… Come on, how often exactly,
Jocelyn Schuster
It was but a hurried parting in a common
Edwina Ernser
It seemed like it should have been so simple.
Griffin Braun
She was aware that things could go wrong.
Piper Schowalter
It went through such rapid contortions
She patiently waited for his number to be called.
The red glint of paint sparkled under the sun.
He let the phone slip from his hand and lay
Kody Terry
She had a terrible habit o comparing her life to others
The house was located at the top of the hill
Macy Greenfelder
She looked at her student wondering if she could ever get through.
Maurine Stracke
She has seen this scene before.
Debbie had taken George for granted
Debbie knew she was being selfish
Luciano Sauer
One can cook on and with an open fire.
There was only one way to do things in the Statton house.
There was no time.
It was a simple tip of the hat
All men dream, but not equally.
Kaya Emard
Dave watched as the forest burned up on the hill.
Lee Schmidt
He lifted the bottle to his lips and took a sip
He heard the crack echo in the late afternoon about a mile away.
Welcome to my world.
She sat down with her notebook in her hand
I hoped she did not dislike me,
Darien Witting
The robot clicked disapprovingly.
There are only three ways to make this work.
He knew what he was supposed to do.
Gentlemen of the free-and-easy sort
Jacklyn Schimmel
What was I after all?
Angelica Baumbach
It was just a burger.
It was so great to hear from you today
Delfina Ziemann
He wandered down the stairs and into the basement
She nervously peered over the edge.
He picked up the burnt end of the branch and made a mark on the stone.
And how can you bring it home to them?
Thaddeus McCullough
The chair sat in the corner where it had been
I was disconcerted, for I had broken away
Salvatore Fisher
But Art is a punitive sentence, not a
The ship rolls and her timbers creak like
On foot, from necessity or in deference
Jasmin Hermiston
Like all men not really up to their job,
Sometimes, when Chapuys has finished
Nicklaus Cruickshank
Hopes and dreams were dashed that day.
Your only chance of survival
Tiara Rolfson
There are different types of secrets.
The wave roared towards them with speed and violence they had not anticipated.
Garret Klocko
The clowns had taken over. And yes, they were literally clowns.
How vulgar, this hankering after
Reginald Wisoky
She wanted rainbow hair.
Humberto Botsford
The leather jacked showed the scars
The old scholar was watching the noisy
Always I had acted as if a third person was watching
Justus Sipes
The rain and wind abruptly stopped.
The young man wanted a role model.
Each failed overture of peace made the next
Then, perhaps overcome with nostalgia for
Now they were in the earth
A secret always has a strengthening effect
Coralie Boyle
The towels had been hanging from the rod for years.
As for the leaflets reporting the creation of
The point was we took this shit very
Felicita Gibson
I knew that on the island one was driven
For although a man is judged by his actions
Pearl Blick
Johnathon Predovic
Cake or pie?
He stood over the body in the fading light`.split('\n');


/* Running the tests may be very slow due to transpilation. Therefore we set a 20 second timeout. */
jest.setTimeout(20_000);

test('`npm start` prints titles of each post grouped by users', async () => {
    let command = 'npm start';
    let { stdout, stderr } = await exec(command);

    // Make sure that no errors were written to output:
    assert.equal(stderr, '', `The command "${command}" produced the following error: "${stderr}"`);

    // Check each consecutive line in the expected output and verify that the stdout has correct content and order:
    for (let i = 0, j = 1; j < expected.length; i++, j++) {
        let first = expected[i];
        let second = expected[j];

        assert.ok(stdout.includes(first), `the output should contain text "${first}" but it does not`);
        assert.ok(stdout.includes(second), `the output should contain text "${second}" but it does not`);

        assert.ok(stdout.indexOf(first) < stdout.indexOf(second), `line "${first}" should be before "${second}", but it is not`)
    }
});
