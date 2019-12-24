import React from 'react';
import moment from 'moment';

import * as actions from '../actions/tabsAction';

class Tabs extends React.Component{
    render(){
        const date = new Date();

        return(
            <div className="wrap">
                <div className="headerborder">
                    <div className="arrow left">
                        <span
                            className="triangle-left"
                            onClick={() => {
                            this.handLeft();
                            }}
                        ></span>
                    </div>
                </div>
            </div>
        )
    }
}

export default Tabs