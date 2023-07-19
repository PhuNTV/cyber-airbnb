import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './Explore.scss';

function Explore() {
    const [locations, setLocations] = useState([]);

    const getListExploreNear = async () => {
        try {
            const resp = await axios.get(
                'https://airbnbnew.cybersoft.edu.vn/api/vi-tri',
                {
                    headers: {
                        tokenCybersoft:
                            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcPDEkMOgIE7hurVuZyAwNyIsIkhldEhhblN0cmluZyI6IjA0LzExLzIwMjMiLCJIZXRIYW5UaW1lIjoiMTY5OTA1NjAwMDAwMCIsIm5iZiI6MTY2OTQ4MjAwMCwiZXhwIjoxNjk5MjAzNjAwfQ.z53DwWShTQ-NYmv_cyVwxzyaarjOV3xiMrElt3gwl8M',
                    },
                });
            setLocations(resp.data.content);

        } catch (error) {
            alert(error);
        }
    }
    useEffect(() => {
        getListExploreNear();
    }, []);
    return (
        <div className='explore-container mx-auto'>
            <h2 className='text'>Khám phá những điểm đến gần đây</h2>
            <div className='grid-container'>
                {locations.map((location) => (
                    <div className='location' key={location.id}>
                        <div className="image-container">
                            <img src={location.hinhAnh} alt={location.tenViTri} />
                        </div>
                        <div className="info-container">
                            <p className='tinhThanh'>{location.tinhThanh}</p>
                            <p className='viTri'>{location.tenViTri}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Explore;