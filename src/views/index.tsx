
import { useState, useEffect, useCallback, useRef } from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from 'react-router';
import { reposInfo, user, rootState } from "./../types";
import { githubSearch, updateReducer } from "./../redux/actions/searchActions";
import { setLoader } from "./../redux/actions/appActions";
import { logo } from "./../assets";
import { Dropdown, Users, Repos, Errors, Loader} from "./../components";
import _ from 'lodash';

type TAllRepos = { [searchTerm: string]: reposInfo[] }
type TAllUsers = { [searchTerm: string]: user[] }

interface TProps extends RouteComponentProps {
  loader: boolean,
  error: boolean,
  emptyData:boolean, 
  allRepos: TAllRepos ,
  allUsers: TAllUsers,
  setLoader: (value: boolean) => void,
  searchedData: (reposInfo | user)[],
  search: (searchTerm: string, type: string) => void,
  setData: (payload: reposInfo[] | user[]) => void
}

const GithubSearch = (props: TProps) => {
  const [type, setType] = useState<string>("user");
  const [searchTerm, setSearchTerm] = useState<string>('');
  const { debounce } = _;
  const isInitialMount = useRef(true);

  const searchHandler = (searchTerm: string, type: string, allUsers: TAllUsers, allRepos: TAllRepos) => {
    searchTerm ?
      props.history.push(`/?searchTerm=${searchTerm}&type=${type}`) :
      props.history.push(`/?type=${type}`)
    if (searchTerm.length > 2) {
      props.setLoader(true);
      const propsData = type === "user" ? allUsers : allRepos;
      const data = checkInProps(searchTerm, propsData);
      if (data && data.length) {
        props.setData(data);
        return
      }
      props.search(searchTerm, type);
    }
  }
  const checkInProps = (searchTerm: string, propsData: TAllUsers | TAllRepos ) => {
    let data: user[] | reposInfo[] = [];
    const keys = Object.keys(propsData);
    const isSearchTermExist = keys.indexOf(searchTerm) !== -1;
    if (isSearchTermExist)
      data = propsData[searchTerm];
    return data;
  }
  const debounceCall = useCallback(debounce(searchHandler, 500),[]);
  useEffect(() => {
    if (isInitialMount.current) {
      getQueryParams();
      isInitialMount.current = false;
      return
    }
    debounceCall(searchTerm, type, props.allUsers, props.allRepos);
  }, [searchTerm, type])

  const getQueryParams = () => {
    const params = new URLSearchParams(props.location.search);
    const term = params.get("searchTerm");
    const type = params.get("type");
    if (term) setSearchTerm(term);
    if (type) setType(type);
  }
  return (
    <div className={`container ${!searchTerm.length? "alignCenter" : ''}`}>
      <div className="searchWrapper">
        <div className="heading">
          {logo}
          <div>
            <h1>Github Searcher</h1>
            <p>Search users and repositories below.</p>
          </div>
        </div>
        <div className="searchFilter">
          <input type="text"
            autoFocus={true}
            value={searchTerm}
            placeholder="Start typing to search .."
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Dropdown type={type} setType={setType} />
        </div>
      </div>
      {
        (searchTerm.length > 2) && (
          props.loader ? <Loader/> :
            (props.error || props.emptyData) ? <Errors error={props.error} emptyData={props.emptyData} /> :
              type === "user" ?
                <Users users={props.searchedData as user[]} /> :
                <Repos repos={props.searchedData as reposInfo[]} />)
      }
    </div>
  )
}
const mapStateToProps = (state: rootState) => {
  const { allRepos, allUsers, searchedData, error, emptyData } = state.githubSearch;
  const { loader } = state.app;
  return ({
    loader, allRepos, allUsers, searchedData, error, emptyData 
  })
}

const mapDispatchToProps = ({
  search: githubSearch,
  setLoader: setLoader,
  setData: updateReducer
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GithubSearch)