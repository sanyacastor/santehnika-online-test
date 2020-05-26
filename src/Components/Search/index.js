import React from 'react'
import s from './Search.module.scss'

export default function Search({placeholder, onSearch}) {
    return (
        <div className={s.wrapper}>
            <label className={s.label}>
                <input className={s.input} placeholder={placeholder} onChange={(e)=>onSearch(e.target.value.toLowerCase())}/>
            </label>
        </div>
    )
}
