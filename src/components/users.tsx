import { user } from "./../types";
import { User } from "./";
type TProps = {
  users: user[]
}

const Users = ({ users }: TProps) => {
  return (
    <div className="wrapper">
      {
        (users && users.length) ?
          users.map((user: user, idx: number) => 
            <div className="infoWrapper" key={idx} >
              <User user={user} />
            </div>
          ) :
          ''
      }
    </div>
  )
}
export default Users;