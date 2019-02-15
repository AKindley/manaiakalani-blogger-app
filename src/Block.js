import React from 'react';
import Circle from './Circle';
import {Link} from 'react-router-dom';

const statusToColor = {
    'SCHEDULED': 'yellow',
    'DRAFT': 'red',
    'LIVE': 'green',
	'PUBLISHING' : 'green'
};

export default function Block({id, title, status, content, updated, published}) {
    var newdate = Date.parse(updated);
	var pubTime = Date.parse(published);
    var testDate = new Date(newdate);
    var UpdateDate = testDate.getDate() + "/" + (testDate.getMonth() + 1)+ "/" + testDate.getFullYear();
	if (status === 'SCHEDULED' && ((pubTime - newdate) < 120000)){
		status = 'PUBLISHING';
	}
	const color = statusToColor[status];
    return (
        <Link to={`/Edit/${id}`} className="block">
            <div className="block-header">
                <Circle color={color} />
                <h2 className="block-title">{title}</h2>

                <div className="block-align-div">
                <span className="block-align-span">{UpdateDate} </span>   
                <span className={`block-status color-${color}`}>{status}</span>  
               </div>
            </div>
            <div className="block-content" dangerouslySetInnerHTML={{ __html: content }}>
            </div>
        </Link>
    );
}