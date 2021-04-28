import { Redirect, Route } from 'react-router-dom'

/* Authenticate client before routing */
const UserRoute = ({ component: Component, ...rest }) => {
    return (
        <Route
            {...rest}

            render={
                (props) =>
                    localStorage.getItem('authToken') ?
                        (<Component {...props} />) :
                        (<Redirect to='/login' />)
            }
        />
    )
}

export default UserRoute