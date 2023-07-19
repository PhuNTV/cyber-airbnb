import React from 'react'
import './Home.scss'
import Explore from 'src/components/Explore/Explore'
import LiveAnyWhere from 'src/components/LiveAnyWhere/LiveAnyWhere'
import ListRoom from 'src/components/ListRoom/ListRoom'
function Home() {
    return (
        <>
            <div className='banner-img'>
                <img src="img/bannerBg.jpg" alt="banner" />
                <h2>Nhờ có Host, mọi điều đều có thể</h2>
            </div>

            <Explore/>
            <LiveAnyWhere />
            <ListRoom />
        </>



    )
}

export default Home