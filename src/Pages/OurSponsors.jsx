import React, { Fragment, useState } from 'react';
import TopMenu from "../Components/TopMenu";
import GoldSponsorCard from '../MyComponents/GoldSponsorCard';
import OtherSponsorCard from '../MyComponents/OtherSponsorCard';
import PlatinumSponsorCard from '../MyComponents/PlatinumSponsorCard';
import SilverSponsorCard from '../MyComponents/SilverSponsorCard';

function OurSponsors(props) {
    const items = [
        { id: 1, name: 'All' },
        { id: 2, name: 'Platinum' },
        { id: 3, name: 'Gold' },
        // { id: 4, name: 'Silver' },
    ];
    const [activeItem, setActiveItem] = useState(items[0]);
    const onSelectCurrentLink = (item) => {
        setActiveItem(item);
    };

    return (
        <>
            <Fragment>
                <TopMenu />
                <div className='tab_wrapper'>
                    {items.map((item) => (
                        <div
                            key={item.id}
                            onClick={() => onSelectCurrentLink(item)}
                            className={`single_tab ${activeItem?.id === item.id ? 'active' : ''}`}
                        >
                            {item.name}
                        </div>
                    ))}
                </div>

                {
                    activeItem?.id == 1 ? <OtherSponsorCard /> :
                        activeItem?.id == 2 ? <PlatinumSponsorCard  /> :
                            activeItem?.id == 3 ? <GoldSponsorCard /> :
                                activeItem?.id == 4 ? <SilverSponsorCard /> : ''

                }
            </Fragment>
        </>
    );
}

export default OurSponsors;


