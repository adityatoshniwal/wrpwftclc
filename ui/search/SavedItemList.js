import React from 'react';

function SavedItemList(props) {
    let isVisible = (itemText) => itemText.toLowerCase().indexOf(props.searchText.toLowerCase()) > -1
    return(
        <div class="itemslist-section">
            <ul>
                {props.itemsList.map((item) => {
                    return(
                        <li className={"saveditem-item my-2 "+(isVisible(item.itemName)?'':'d-none')}
                            data-item-id={item.id} onClick={props.handleItemClick}>
                            <div className="row">
                                <div className="col-9">
                                    <div className="text-40p">{item.itemName}</div>
                                    <div className=""> {"Total Weight : " + item.totalWt + 
                                                        " | Total Weight with Wastage : " + item.totalWtWaste + 
                                                        " | Actual Cost : " + item.actualCost}
                                    </div>
                                </div>
                                <div className="col-3 text-right my-auto">
                                    <a href="#" className="btn btn-sm btn-light saveditem-item-remove" >
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

export default SavedItemList;
