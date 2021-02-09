
type TProps = {
  error: boolean,
  emptyData: boolean,
}
const Errors = ({error, emptyData }:TProps) => {
  return (
    <div className="ErrorWrapper">
      {error && <p>Something went wrong</p>}
      {emptyData && <p>Searched Term Not Found</p>}
    </div>
  )
}
export default Errors;