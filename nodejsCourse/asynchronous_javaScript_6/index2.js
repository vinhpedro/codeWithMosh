// 5. named function to rescue
//callback
console.log('before');
getUser(1, getRepositories1);
console.log('after');

function getRepositories1(user){
console.log(user);
    // get the repositoies
    getRepositories(user.gitHubUsername, getCommits1);
}
function getCommits1(userName) {
    console.log(userName.repos);
    // get commits
    getCommits(userName.repos, displayCommits1);
}

function displayCommits1(unserName) {
    console.log(unserName.commits);
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
        callback({username: username, repos: ['repo1', 'repo2', 'repo3']});
    }, 2000);
}

function getCommits(firstRepo, callback) {
    setTimeout(() => {
        console.log('Reading a commits...');
        callback({repo: firstRepo, commits: ['first commit', 'second commits']});
    }, 2000);
}