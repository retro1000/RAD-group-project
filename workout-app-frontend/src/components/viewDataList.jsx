import React, {useState, useEffect, useRef} from "react";
import "../component_style/view_data_list_style.css";
import DataItem from "./dataItem";
import Exercise from "./exercise";
import axios from "axios";
import { Navigate } from "react-router-dom";

function ViewDataList(props){

    const [submit, setSubmit] = useState([]);
    const [selectedList, setSelectedList] = useState([]);
    const [success, setSuccess] = useState(false);
    // eslint-disable-next-line no-mixed-operators
    const name = useRef(null);

    useEffect(()=>{
        if(success){
            const timerId = setTimeout(() => {
                setSuccess(false);
                setSelectedList([]);
            }, 3000);
        
            return () => {
                clearTimeout(timerId);
            };
        }
    }, [success]);

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

    const handleSelectedList = (id, name, img) => {
        const newList = selectedList;
        if(selectedList.length === 0) newList.push({id:id, name:name, img:img, reps:1});
        if (!selectedList.some(item => item.id === id)) newList.push({id:id, name:name, img:img, reps:1});
        setSelectedList(...[newList]);
    }

    const handleCancel = (id) => {
        const newList = selectedList.filter(itm=>itm.id!==id);
        setSelectedList(...[newList]);
    }

    const removeAll = () => {
        const newList = [];
        setSelectedList([...newList]);
    }

    const createWorkout = async() => {
        const data = {bodyPartId:props.bodyPartId, workoutData:selectedList, name:(name.current && name.current.value !== '')?name.current.value:'custom workout'};
        await axios.post('http://localhost:6600/users/create-custom-workout', data, {withCredentials:true, maxRedirects:0})
            .then(Response=>{
                if(Response.status === 200) setSuccess(true); 
                if(Response.status === 403) Navigate('/login');
            })
            .catch(Error=>{

            })
    }
    
    const getReps = (reps, id) => {
        const newList = selectedList.map((item) => {
            if (item.id === id) return { ...item, reps: parseInt(reps, 10) };
            return item;
        });
        setSelectedList([...newList]);
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
                            <DataItem handleSelectedList={handleSelectedList} type={props.type} id={itm.exersiceId} name={itm.name} img={itm.img}/>
                        )):null
                    }
                </div>

                {
                (props.type === 'exercises' && selectedList.length !== 0)?
                    <div className="selected_list">
                        <span className="topic" style={{fontSize:'30px', fontWeight:700}}>Custom workout</span>
                        {
                            (props.type === 'exercises' && selectedList.length !== 0)?
                                selectedList.map(itm => (
                                    <Exercise getReps={getReps} reps={null} handleCancel={handleCancel} cancel={true} name={itm.name} img={itm.img} id={itm.id}/>
                                )):null
                        }
                        
                        {
                            (props.type === 'exercises' && selectedList.length !== 0)?
                                <div className="data_pnl">
                                    <input type="text" ref={name} placeholder="Name for workout..."/>
                                </div>
                            :null
                        }
                        <div className="btn_pnl">
                            {(success)?<p style={{fontSize:'15px'}}>Workout successfully created.</p>:null}
                            {(props.type === 'exercises' && selectedList.length !== 0)?<button onClick={createWorkout}>Create workout</button>:null}
                            {(props.type === 'exercises' && selectedList.length !== 0)?<button onClick={removeAll}>Cancel</button>:null}
                        </div>
                    </div>
                :null
                }
            </div>
        </div>
    );
}

export default ViewDataList;