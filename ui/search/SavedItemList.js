import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {searchActions} from './searchActionReducer';

function SavedItemList(props) {
    let isVisible = (itemText) => itemText.toLowerCase().indexOf(props.searchText.toLowerCase()) > -1
    return(
        <div class="itemslist-section">
            <ul>
                {props.itemsList.map((item) => {
                    return(
                        <li className={"p-2 saveditem-item "+(isVisible(item.itemName)?'':'d-none')}
                            data-route={"module/newitem/"+item.id}>
                            <div className="row">
                                <div className="col-9">
                                    <div className="text-40p">{item.itemName}</div>
                                    <div className=""> {"Total Weight : " + item.totalWt + 
                                                        " | Total Weight with Wastage : " + item.totalWtWaste + 
                                                        " | Actual Cost : " + item.actualCost}
                                    </div>
                                </div>
                                <div className="col-3 text-right my-auto">
                                    <a href="#" className="btn btn-sm btn-plain saveditem-item-remove" title="Remove">
                                        <i className="la la-trash la-2x"></i>
                                    </a>
                                </div>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

function mapStateToProps(state) {
    return {
        ...state.search,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        ...bindActionCreators({
            ...searchActions,
        }, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SavedItemList);
