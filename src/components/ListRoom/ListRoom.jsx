import React, { useEffect, useState } from 'react'
import './ListRoom.scss'
import axios from 'axios';
function ListRoom() {

    const [listroom, setListRoom] = useState([]);
    const getListRoom = async () => {
        try {
            const resp = await axios.get('https://airbnbnew.cybersoft.edu.vn/api/phong-thue', {
                headers: {
                    tokenCybersoft:
                        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcPDEkMOgIE7hurVuZyAwNyIsIkhldEhhblN0cmluZyI6IjA0LzExLzIwMjMiLCJIZXRIYW5UaW1lIjoiMTY5OTA1NjAwMDAwMCIsIm5iZiI6MTY2OTQ4MjAwMCwiZXhwIjoxNjk5MjAzNjAwfQ.z53DwWShTQ-NYmv_cyVwxzyaarjOV3xiMrElt3gwl8M',
                },
            })
            setListRoom(resp.data.content);
        } catch (error) {
           alert('Lỗi', error);
        }
    }
    useEffect(() => {
        getListRoom()
    }, [])

    return (
        <div className='list-room-container mx-auto'>
            <h2>Danh sách phòng</h2>
            <div className='list-room-content'>
                {listroom.map((room) => {
                    return (
                        <>
                            <div className='card' onClick={() => {console.log(room.id)}}>
                                <div className="card-header" >
                                    <img src={room.hinhAnh} alt="" />
                                </div>
                                <div className="card-body">
                                    <p className='room-title'>{room.tenPhong}</p>
                                    <p className='room-price'>{room.giaTien}$/ 1 đêm</p>
                                </div>
                            </div>
                        </>
                    )
                })}
            </div>
        </div>
    )
}

export default ListRoom