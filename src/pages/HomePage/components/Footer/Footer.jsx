import { GlobeAltIcon } from '@heroicons/react/24/solid'
import React from 'react'
import './Footer.scss'
function Footer() {
    return (
        <div className='footer'>
            <div className="footer-left">
                <p>@2023 Airbnb,Inc</p>
                <p>Quyền riêng tư</p>
                <p>Điểu khoản</p>
                <p>Sơ Đồ trang web</p>
            </div>
            <div className="footer-right">
                <i className="fa-solid fa-globe" />
                <p>Tiếng Việt</p>
                <p>$ USD</p>
                <p>Hỗ trợ tài nguyên</p>
            </div>
        </div>
    )
}

export default Footer