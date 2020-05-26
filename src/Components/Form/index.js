import React, { Component } from 'react'
import s from './Form.module.scss'

export default class Form extends Component {

    constructor(props) {
        super(props)
        
        this.state = {
            gender: 'all',
            age: [
                {
                    name: '0-15',
                    value: false,
                },
                {
                    name:'18-35',
                    value: false,
                },
                {
                    name:'35-65',
                    value: false
                },
                {
                    name: '65+',
                    value: false
                }
            ]
        }
    }

    handleGenderChange = (e) => {
        const val = e.target.value
        this.setState({gender: val}, this.props.onFilter(val))
        
    }

    handleAgeChange = (e) => {
        const { age } = this.state
        const name = e.target.name
        const index = age.findIndex(item => item.name === name)
        const newAge = [...age]

        newAge[index] = {...newAge[index], value: !newAge[index].value}

        this.setState({age: newAge}, this.filterByAge)
    }

    filterByAge = () => {
        //todo
    }

    render() {
        return (
            <form className={s.form}>
            <fieldset className={s.form__fieldset}>
                <span className={s.form__header}>Фильтр по полу</span>
                <label className={s.form__label}>
                    Все
                    <input className={s.form__radiobox} type='radio' value='all' name='gender' 
                    onChange={this.handleGenderChange}
                    checked={this.state.gender === 'all'}
                    />
                    <span className={s.form__radiomark}></span>
                </label>
                <label className={s.form__label}>
                    Только Мужчины
                    <input className={s.form__radiobox} type='radio' value='male' name='gender'
                    onChange={this.handleGenderChange}
                    checked={this.state.gender === 'male'}
                    />
                    <span className={s.form__radiomark}></span>
                </label>
                <label className={s.form__label}>
                    Только женщины
                    <input className={s.form__radiobox} type='radio' value='female' name='gender' 
                    onChange={this.handleGenderChange}
                    checked={this.state.gender === 'female'}
                    />
                    <span className={s.form__radiomark}></span>
                </label>
            </fieldset>
            <fieldset className={s.form__fieldset}>
                <span className={s.form__header}>Фильтр по возрастным группам</span>
                    <div>
                        <label className={s.form__label}>
                        0-15
                        <input className={s.form__checkbox} type='checkbox' 
                            name='0-15'
                            value='0-15'
                            checked={this.state.age[0].value}
                            onChange={this.handleAgeChange}
                        />
                        <span className={s.form__checkmark}></span>
                    </label>
                        <label className={s.form__label}>
                        18-35
                        <input className={s.form__checkbox} type='checkbox'
                            name='18-35'
                            value='18-35'
                            checked={this.state.age[1].value}
                            onChange={this.handleAgeChange}
                         />
                        <span className={s.form__checkmark}></span>
                    </label>
                    <div>
                    </div>
                        <label className={s.form__label}>
                        35-65
                        <input className={s.form__checkbox} type='checkbox' 
                            name='35-65'
                            value='35-65'
                            onChange={this.handleAgeChange}
                            checked={this.state.age[2].value}
                        />
                        <span className={s.form__checkmark}></span>
                    </label>
                        <label className={s.form__label}>
                        65+
                        <input className={s.form__checkbox} type='checkbox' 
                            name='65+'
                            value='65+'
                            onChange={this.handleAgeChange}
                            checked={this.state.age[3].value}
                        />
                        <span className={s.form__checkmark}></span>
                    </label>
                    </div>
            </fieldset>
        </form>
        )
    }
}