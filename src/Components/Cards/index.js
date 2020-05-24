import React from 'react'
import Card from '../Card'
import s from './Cards.module.scss'

export default function Cards({users}) {

    return (
        <div className={s.cards}>
            {users.map(user => <Card
            key={user.login.uuid} 
            name={user.name.first + " " + user.name.last}
            city={user.location.country + " " + user.location.city}
            age={user.dob.age}
            gen={user.gender}
            img={user.picture.large}
            date={user.registered.date.slice(0,10).replace(/-/g, '.')}
            />)}
        </div>
    )
}
