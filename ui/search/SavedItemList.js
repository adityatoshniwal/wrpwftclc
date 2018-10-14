import React from 'react';

function SavedItemList(props) {
    let isVisible = (itemText) => itemText.toLowerCase().indexOf(props.searchText.toLowerCase()) > -1;
    let sortedList = _.sortBy(props.itemsList, (item)=>item.title.toLowerCase());
    return(
        <div class="itemslist-section">
            <ul>
                {sortedList.map((item) => {
                    return(
                        <li className={"saveditem-item my-2 "+(isVisible(item.title)?'':'d-none')}
                            data-item-id={item.id} data-item-title={item.title} onClick={props.handleItemClick}>
                            <div className="row">
                                <div className="col-9">
                                    <div className="text-40p">{item.title}</div>
                                    <div className=""> {"Total Weight : " + item.totalWt + 
                                                        " | Total Weight with Wastage : " + item.totalWtWstg + 
                                                        " | Total Cost : " + item.totalCost}
                                    </div>
                                </div>
                                <div className="col-3 text-right my-auto">
                                    <a href="#" className="btn btn-sm btn-light saveditem-item-remove" onClick={props.handleDeleteClick}>
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
