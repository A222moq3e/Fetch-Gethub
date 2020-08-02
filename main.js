//main variable
let theInput = document.querySelector('.get-repos input');
let getButton = document.querySelector('.get-repos .get-button');
let reposData = document.querySelector('.show-data');

//creat from  mine for empty value
let spnNothing = document.createElement('span');
let spnNothingText = document.createTextNode(',plese inter your repos');
spnNothing.setAttribute('class', 'pls');
spnNothing.appendChild(spnNothingText);


function getRepose() {
    console.log('getr');


    if (theInput.value == '') {
        if (reposData.contains(spnNothing)) {
            console.log('again');

        } else {
            console.log('s', spnNothing, spnNothingText);
            reposData.appendChild(spnNothing);
        }
    } else {
        fetch(`https://api.github.com/users/${theInput.value}/repos`).then((response) => {
            return response.json();
        }).then((repositories) => {
            reposData.innerHTML = '';//to zero
            let theReposeMssg = document.createElement('span');
            let theReposeMssgAll = document.createElement('span');
            let theReposeMssgAllText = document.createTextNode(repositories.length);
            theReposeMssgAll.appendChild(theReposeMssgAllText);
            theReposeMssgAll.className = 'theRposeAll';
            let theReposeMssgText = document.createTextNode(`No. of all repose: `);
            theReposeMssg.appendChild(theReposeMssgText);
            theReposeMssg.appendChild(theReposeMssgAll);
            theReposeMssg.className = 'theRepose';
            reposData.appendChild(theReposeMssg);


            repositories.forEach((repo) => {
                let mainDiv = document.createElement('div');
                let repoName = document.createTextNode(repo.name);
                mainDiv.appendChild(repoName);
                let theUrl = document.createElement('a');
                let theUrlText = document.createTextNode('visite');
                theUrl.appendChild(theUrlText);
                theUrl.setAttribute('target', '_blank');
                theUrl.href = `https://github.com/${theInput.value}/${repo.name}`;
                mainDiv.appendChild(theUrl);
                let starSpan = document.createElement('span');
                let starSpanText = document.createTextNode(`Stars ${repo.stargazers_count}`);
                starSpan.appendChild(starSpanText);
                if (repo.stargazers_count == 0) {
                    starSpan.className = 'bad';
                } else if (repo.stargazers_count >= 1 && repo.stargazers_count <= 9) {
                    starSpan.className = 'y3ne';
                } else if (repo.stargazers_count >= 10 && repo.stargazers_count <= 99) {
                    starSpan.className = 'good';
                } else if (repo.stargazers_count >= 100 && repo.stargazers_count <= 9999) {
                    starSpan.className = 'veryGood';
                } else if (repo.stargazers_count >= 10000) {
                    starSpan.className = 'gold';
                }
                mainDiv.appendChild(starSpan);
                mainDiv.className = 'repo-box';
                reposData.appendChild(mainDiv);

            });
        });

        if (reposData.contains(spnNothing)) {//for remove nothing message
            spnNothing.remove()

        }

    }

}
getButton.onclick = getRepose;