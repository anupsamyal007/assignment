import { reposInfo } from "../types";
import { User } from "./";
type TProps = {
  repos: reposInfo []
}
const Repos = ({ repos }: TProps) => {
  return (
    <div className="wrapper">
      {
        (repos && repos.length) ?
          repos.map((repo: reposInfo, idx: number) => 
            <div className="infoWrapper" key={idx}>
              <User user={repo.owner} />
              <h1>Repo Info</h1>
              <div className="repoInfo">
                <div className="info">
                  <p className="head">Name</p>
                  <p className="value">{repo.name}</p>
                  <p className="head">Full Name</p>
                  <p className="value">{repo.full_name}</p>
                  <p className="head">ID</p>
                  <p className="value">{repo.id}</p>
                </div>
                <div className="info">
                  <p className="head">Repo Link</p>
                  <p className="value"><a rel="noreferrer" target="_blank" href={repo.html_url}>{repo.html_url}</a></p>
                  <p className="head">Node Id</p>
                  <p className="value">{repo.node_id}</p>
                  <p className="head">Default Barnch At</p>
                  <p className="value">{repo.default_branch}</p>
                </div>
              </div>
            </div>
          ) :
          ''
      }
    </div>
  )
}
export default Repos;