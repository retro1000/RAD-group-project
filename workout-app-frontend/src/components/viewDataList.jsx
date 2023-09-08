import React, {useState, useEffect} from "react";
import "../component_style/view_data_list_style.css";
import DataItem from "./dataItem";

function ViewDataList(props){

    const [submit, setSubmit] = useState([]);

    useEffect((Event) => {
        if(submit[0] && submit[1] !== null){
            const keyIndx = parseInt(submit[1].target.getAttribute('data-keyindx'), 10);
            const index = parseInt(submit[1].target.getAttribute('data-index'), 10);
            let newList = props.sortList;
            let newSort = props.sort;
            newList[keyIndx].data[index].sts = !newList[keyIndx].data[index].sts;
            newSort[keyIndx].val = (newList[keyIndx].data).filter(itm=>itm.sts).map(itm=>itm.val);
            props.handleSortList(newList);
            props.handleSort(newSort);
            setSubmit([false, null]);
        }
    }, [props, submit]);

    const handleLabelSelect = async(Event) => {
        setSubmit([true, Event]);
    }
    return(
        <div id="view_data_list_frame">
            <div className="filter_pnl dis_flx">
                {
                    (props.sortList!==undefined)?props.sortList.map((key, keyIndx) => (
                        <div className="display_pnl dis_flx">
                            <span className="pnl_header_name">{key.name}</span>
                            <div className="pnl_data_pnl">
                                    {key.data.map((item, index)=> (
                                        <label data-keyindx={keyIndx} data-index={index} className={(props.sortList[keyIndx].data[index].sts)?"labels selected":"labels"} style={{background:(props.sortList[keyIndx].data[index].sts)?'rgb(33, 240, 233)':'white', cursor:'pointer'}} onClick={handleLabelSelect}>{item.val}</label>
                                    ))
                                }
                            </div>
                        </div>
                    )):null
                }
            </div>
            <div className="data_pnl dis_flx">
                <div className="data_itm">
                    {
                        (props.dataList !== undefined)?props.dataList.map(itm => (
                            <DataItem type={props.type} id={itm.id} name={itm.name} img={itm.img}/>
                        )):null
                    }
                </div>
            </div>
        </div>
    );
}

export default ViewDataList;