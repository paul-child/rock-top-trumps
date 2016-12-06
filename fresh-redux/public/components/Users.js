import React, { Component } from 'react'

export default class Users extends Component {
   componentDidMount() {
      console.log('Component Mounted!')
      this.props.fetchRemoteData('users')
   }
   componentDidUpdate(prevProps) {
      console.log('Component Updated!')
      console.log('prevProps.users: ', prevProps.users)
      console.log('this.props.users: ', this.props.users)
      // this.props.fetchRemoteData('users')
   }
   render() {
      const {users} = this.props
      console.log('users: ', users)
      const {rootPage} = this.props;
      return (
         <div>
            <h1>Users Page</h1>
            <p>This is the Users page. It is making an API call to /users in <code>componentDidMount</code></p>
            <p>rootPage: {rootPage}</p>
            {users ?
               users.map(user => <p>{user.name}</p>) :
               <p>No data</p>
            }
         </div>
      )
   }
}