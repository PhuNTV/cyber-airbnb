import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './LiveAnyWhere.scss';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';
function LiveAnyWhere() {
    const [liveroom, setLiveroom] = useState([]);
    const getRoomLocation = async () => {
        try {
            const resp = await axios.get('https://airbnbnew.cybersoft.edu.vn/api/phong-thue',
                {
                    headers: {
                        tokenCybersoft:
                            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcPDEkMOgIE7hurVuZyAwNyIsIkhldEhhblN0cmluZyI6IjA0LzExLzIwMjMiLCJIZXRIYW5UaW1lIjoiMTY5OTA1NjAwMDAwMCIsIm5iZiI6MTY2OTQ4MjAwMCwiZXhwIjoxNjk5MjAzNjAwfQ.z53DwWShTQ-NYmv_cyVwxzyaarjOV3xiMrElt3gwl8M',
                    },
                });
            setLiveroom(resp.data.content)
        } catch (error) {
            alert('Lỗi', error);
        }
    }
    useEffect(() => {
        getRoomLocation()
    }, []);

    // slider
    const settings = {
        dots: false,
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 4,
        autoplay: true,
        autoplaySpeed: 5000,
        cssEase: "linear",
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };
    return (
        <div>
            <div className='liveroom-container mx-auto'>
                <h2>Khách sạn nổi bật</h2>
                <div className='' >
                    <Slider {...settings} >
                        {liveroom.map((room) => {
                            return (
                                <>
                                    <div className='card'>
                                        <div className="card-top">
                                            <img src={room.hinhAnh} alt="" onClick={() => { console.log(room.id); }} />
                                        </div>
                                    </div>
                                </>
                            )

                        })}
                    </Slider>
                </div>
            </div>
        </div>
    )
}
export default LiveAnyWhere