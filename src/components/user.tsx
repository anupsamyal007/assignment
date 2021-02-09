import { Fragment } from "react";
import { user } from "./../types";
type TUser = {
  user:user
}
const User = ({ user }:TUser) => {
  return (
    <Fragment>
      { user ? 
        <div className="userInfo">
          <div className="info">
            <div className="imgWrapper">
              <img src={user.avatar_url} alt="profile pic" />
            </div>
            <p className="head">Name</p>
            <p className="value">{user.login}</p>
            <p className="head">ID</p>
            <p className="value">{user.id}</p>
            <p className="head">Type</p>
            <p className="value">{user.type}</p>
          </div>
          <div className="info">
            <p className="head">Profile Link</p>
            <p className="value"><a rel="noreferrer" target="_blank" href={user.html_url}>{user.html_url}</a></p>
            <p className="head">Repo's Url</p>
            <p className="value">{user.repos_url}</p>
            <p className="head">Node Id</p>
            <p className="value">{user.node_id}</p>
            <p className="head">Organizations Url</p>
            <p className="value">{user.organizations_url}</p>
            <p className="head">Followers Url</p>
            <p className="value">{user.followers_url}</p>
          </div>
        </div>:""
      } 
    </Fragment>
  )
}

export default User;