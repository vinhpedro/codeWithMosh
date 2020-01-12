//callback
console.log('before');

/*
getUser(1)
    .then(user => getRepositories(user.gitHubUsername))
    .then(repos => getCommits(repos.gitHubRepos[0]))
    .then(commit => console.log('commits', commit.gitHubCommits))
    .catch(err => console.log(err.message));
*/

// async and awat approach
async function displayCommmits() {
    try {
        const user = await getUser(2);
        const repos = await getRepositories(user.gitHubUsername);
        const commits = await getCommits(repos.gitHubRepos);
        console.log(commits.gitHubCommits);
    }catch (e) {
        console.log('error', e.message);
    }

}

displayCommmits();

console.log('after');

function getUser(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Reading a user from database...');
            resolve({id: id, gitHubUsername: 'reza'});
        }, 2000);
    });
}

function getCommits(firstRepo) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Reading a commits...');
            resolve({repo: firstRepo, gitHubCommits: ['first commit', 'second commits']});
        }, 2000);
    });
}

function getRepositories(username) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Reading a repositories...');
            reject(new Error('something went wrong'));
            /*resolve({name: username, gitHubRepos: ['repo1', 'repo2', 'repo3'] });*/
        }, 2000);
    });
}
