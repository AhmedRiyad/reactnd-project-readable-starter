import React from 'react';

import {Link} from 'react-router-dom';
import {Menu} from 'semantic-ui-react';


const Navigation = () => {
    return (
        <Menu stackable>
            <Menu.Item>
                Readable
            </Menu.Item>

            <Menu.Item
                name='Home'
                as={Link}
                to='/'
            >
                Home
            </Menu.Item>
        </Menu>
    )
};


export default Navigation;