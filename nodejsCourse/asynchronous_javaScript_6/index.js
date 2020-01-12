//callback
console.log('before');
getUser(1, (user) => {

    // get the repositoies
    getRepositories(user.gitHubUsername, (name, repos) => {

        // get commits
        getCommits(repos[0], (commits) => {
            console.log(`repos: ${ commits.repo} and his commits are: ${commits.commits}`);
        });
    });
});
console.log('after');

function getCommits(firstRepo, callback) {
    setTimeout(() => {
        console.log('Reading a commits...');
        callback({repo: firstRepo, commits: ['first commit', 'second commits']});
    }, 2000);
}

function getUser(id, callback) {
    setTimeout(() => {
        console.log('Reading a user from database...');
        callback({id: id, gitHubUsername: 'reza'});
        }, 2000);
}

function getRepositories(username, callback) {
    setTimeout(() => {
        console.log('Reading a repositories...');
        callback(username, ['repo1', 'repo2', 'repo3']);
    }, 2000);
}
