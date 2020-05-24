import React from 'react'
import s from './Card.module.scss'

export default function Card({name, age, gen, city, date, img}) {
    return (
        <div className={s.card}>
            <div className={s.card__inner}>
                <div className={s.card__image}>
                    <img alt={name} src={img}/>
                </div>
                <div className={s.card__text}>
                    <p className={s.card__name}>{name}</p>
                    <p className={s.card__age}>Возраст: <span className={s.card__bold}>{age} лет</span></p>
                    <p className={s.card__gen}>Пол: <span className={s.card__bold}>{gen}</span></p>
                    <p className={s.card__city}>Адрес: <span className={s.card__bold}>{city}</span></p>
                    <p className={s.card__date}>Дата регистрации:<span className={s.card__bold}>{date}</span></p>
                </div>
            </div>
        </div>
    )
}
