import React from 'react'


function SavedItemList(props) {
    return(
        <ul>
            {props.itemsList.map(function(item) {
                return(
                    <li className="p-2 saveditem-item" data-route={"module/newitem/"+item.id}>
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
    )
}

export default SavedItemList;
