import React from 'react'
import {useSelector} from 'react-redux'

import Header from './components/elements/Header'
import AppRouter from './components/elements/AppRouter'


const App = () => {
    const isLoading = useSelector(state => state.isLoading)

    return (
        <div>
            {!isLoading &&
                <>
                    <Header/>
                    <AppRouter/>
                </>
            }
            {
                isLoading &&
                <>
                    Загрузка
                </>
            }
        </div>
    )
}

export default App
