import React from "react"
import MessageTimeline from "./MessageTimeline"

const Homepage = props => {
    const { currentUser, authUser } = props
    const loginGuest = () => {
        authUser("signin", {email: "guest", password: "guest"})
        .then(() => {
            // history.push("/")
        })
        .catch((err) => {
            return 
        })
    }
    // show link to sign up if user isnt authenticated
    if (!currentUser.isAuthenticated) {
        return (
            <div className="home-hero">
                <h1>Whats new in the world</h1>
                <button className="btn btn-primary" onClick={loginGuest}>Login as Guest</button>
            </div>
        )
    }
    return (
        <div >
            <MessageTimeline  {...currentUser} />
        </div>
    )

}

export default Homepage