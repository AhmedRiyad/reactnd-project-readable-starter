import React from 'react';
import {Header, Icon} from 'semantic-ui-react';
import {Link} from 'react-router-dom';


const NotFound = () => {
    return (
        <div className='not-found'>
            <Header as='h1' icon>
                <Icon name='warning circle'/>
                404 Not Found
            </Header>
            <Link to={'/'}>
                Return Home
            </Link>
        </div>
    )
};


export default NotFound;