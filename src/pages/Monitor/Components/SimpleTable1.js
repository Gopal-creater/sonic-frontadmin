import React from 'react';


export default function SimpleTable1(props) {
    const {tableData} = props;
        // const newData = tableData?tableData.map((item, index) => {
        //     return {
        //         ...item,
        //         sn: index + 1
        //       }
        // }) : [];

        // const newData1 = tableData[0] ? tableData[1] ? tableData[2] ? tableData 
        //                                 :  [{sonicKey:''},{sonicKey:''},{sonicKey:''}]
        //                                 :  [tableData[0],{sonicKey:''},{sonicKey:''}]
        //                                 :  [tableData[0],tableData[1],{sonicKey:''}];
        // console.log("newData of table",newData1)

        const newData = tableData.length != 0 ? tableData : [{sonicKey:''},{sonicKey:''},{sonicKey:''}];

    return(
        <div class="table-responsive">
            <table class="table table-sm text-nowrap">
                <thead>
                    <tr>
                    <th scope="col">Key</th>
                    <th scope="col">Name</th>
                    <th scope="col">Owner</th>
                    <th scope="col">Count</th>
                    </tr>
                </thead>
                <tbody>
                    {newData.map((item,index) => {
                        return (
                            <tr key={index}>
                            <td >{item.sonicKey.sonicKey ? item.sonicKey.sonicKey : '-'}</td>
                            <td >{item.sonicKey.contentName ? item.sonicKey.contentName : '-'}</td>
                            <td >{item.sonicKey.contentOwner ? item.sonicKey.contentOwner : '-'}</td>
                            <td >{item.totalHits ? item.totalHits : '-'}</td>
                            </tr>
                        )
                    })}
                </tbody>
                </table>
            </div>
    );

};