const URL =  'https://api.github.com'

let addToy = false;
document.addEventListener('DOMContentLoaded', () => {
  hide_seek();
  document.querySelector('#github-form').addEventListener('submit', event => search_username(event))
  document.querySelector('#repos-form').addEventListener('submit', event => search_repos(event))
})

const hide_seek = () => {
  const addBtn = document.querySelector("#new-btn");
  const repoForm = document.querySelector("#repos-form");
  const githubForm = document.querySelector("#github-form");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      repoForm.style.display = "block";
      githubForm.style.display = "none";
      addBtn.innerText = "Search by username"
    } else {
      repoForm.style.display = "none";
      githubForm.style.display = "block";
      addBtn.innerText = "Search by repository name"
    }
  });
}


const search_username = (event) => {
  event.preventDefault();
  fetch_user(event.target.search.value)
}

const fetch_user = async (name) => {
  const res = await fetch(URL + `/search/users?q=${name}`)
  const user_data = await res.json()
  user_data.items.forEach(user => renderUser(user))
}

const renderUser = (user) => {

  let ul_tag = document.querySelector("#user-list");

  let br = document.createElement('br')

  let h4 = document.createElement('h4');
  h4.id = `footer-${user.id}`
  h4.className = "align_user"
  h4.innerText = `${user.login}`;

  let img = document.createElement('img');
  img.src = user.avatar_url;
  img.addEventListener('click', () => fetch_repos(user.repos_url, user.id))

  let li2 = document.createElement('li')

  let a = document.createElement('a');
  a.href = user.html_url
  a.innerText = `GitHub Link`

  ul_tag.append(br,h4,img,li2)
  li2.appendChild(a)

}
const search_repos = (event) => {
  event.preventDefault();
  fetch_repo(event.target.search.value)
}

const fetch_repo = async (name) => {
  const res = await fetch(URL + `/search/repositories?q=${name}`)
  const repos_data = await res.json()
  repos_data.items.forEach(repo => render_Repo(repo))
}

const render_Repo = (repo) => {

  let ul_tag = document.querySelector('#repos-list')

  let li2 = document.createElement('li')

  let a = document.createElement('a');
  a.href = repo.html_url
  a.innerText = repo.name

  li2.appendChild(a)
  ul_tag.appendChild(li2)
}


const fetch_repos = async (repos_url, id) => {
  const res = await fetch(repos_url)
  const repos_data = await res.json()
  repos_data.forEach(repo => renderRepo(repo,id))
}

const renderRepo = (repo,id) => {
  let parent = document.querySelector(`#footer-${id}`)

  let ul_tag = document.createElement('ul')
  ul_tag.id = "repos-list"

  let li2 = document.createElement('li')

  let a = document.createElement('a');
  a.href = repo.html_url
  a.innerText = repo.name

  li2.appendChild(a)
  ul_tag.appendChild(li2)
  parent.appendChild(ul_tag)
}