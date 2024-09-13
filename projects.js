const pinnedRepos = {
    "Storm": true
}
async function getGithubRepos() {

    const url = "https://api.github.com/users/GustavoFurtad2/repos"

    try {
        const response = await fetch(url)

        if (response.ok) {
            const data = await response.json()

            const repos = data.map(repo => ({
                name: repo.name,
                description: repo.description,
                stars: repo.stargazers_count,
                previewUrl: `https://raw.githubusercontent.com/${repo.full_name}/master/preview.png`,
                lang: repo.language
            }))

            const projectsDiv = document.getElementById('projects')

            repos.forEach(repo => {

                console.log(repo.name)
                if (pinnedRepos[repo.name]) {

                    const listItem = document.createElement('li');
                    listItem.innerHTML = `
                        <strong>${repo.name}</strong> <br><br>
                        <img id="preview" src="${repo.previewUrl}" alt="Preview" width="100">
                        <br>
                        <img id="star" src="assets/star.png" alt="Stars">${repo.stars} ${repo.lang}<br>
                        ${repo.description}
                    `
                    projectsDiv.appendChild(listItem)
                }
            })
        }
    } catch (e) {
        console.error('Erro:', e)
        alert('Ocorreu um erro ao obter os repositórios.')
    }
}

getGithubRepos()
