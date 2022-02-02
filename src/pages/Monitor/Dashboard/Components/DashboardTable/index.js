import { useState, useCallback, useEffect, useRef } from "react";
import React from 'react';
import "./styles.css";
import { log } from '../../../../../utils/app.debug';
import { ResizableTable, TableWrapper } from './StyleTable';

const createHeaders = (headers) => {
    return headers.map((item) => ({
        text: item,
        ref: useRef()
    }));
};

export default function DashboardTable({ headers, minCellWidth }) {
    const [tableHeight, setTableHeight] = useState("auto");
    const [activeIndex, setActiveIndex] = useState(null);
    const tableElement = useRef(null);
    const columns = createHeaders(headers);

    useEffect(() => {
        setTableHeight(tableElement.current.offsetHeight);
    }, []);

    const mouseMove = useCallback(
        (e) => {
            const gridColumns = columns.map((col, i) => {
                if (i === activeIndex) {
                    const width = e.clientX - col.ref.current.offsetLeft;

                    if (width >= minCellWidth) {
                        return `${width}px`;
                    }
                }
                return `${col.ref.current.offsetWidth}px`;
            });

            tableElement.current.style.gridTemplateColumns = `${gridColumns.join(
                " "
            )}`;
        },
        [activeIndex, columns, minCellWidth]
    );

    const removeListeners = useCallback(() => {
        window.removeEventListener("mousemove", mouseMove);
        window.removeEventListener("mouseup", removeListeners);
    }, [mouseMove]);

    const mouseUp = useCallback(() => {
        setActiveIndex(null);
        removeListeners();
    }, [setActiveIndex, removeListeners]);

    useEffect(() => {
        if (activeIndex !== null) {
            window.addEventListener("mousemove", mouseMove);
            window.addEventListener("mouseup", mouseUp);
        }

        return () => {
            removeListeners();
        };
    }, [activeIndex, mouseMove, mouseUp, removeListeners]);

    return (
        <TableWrapper>
            <ResizableTable ref={tableElement}>
                <thead>
                    <tr>
                        <th ref={columns[0]?.ref} key={columns[0]?.text}
                            style={{
                                position: "sticky",
                                left: 0,
                                zIndex: 88,
                                backgroundColor: "white",
                                borderTop: "2px solid black",
                                borderLeft: "2px solid black"
                            }}
                        >
                            <span>{columns[0]?.text}</span>
                        </th>

                        <th ref={columns[1]?.ref} key={columns[1]?.text}
                            style={{
                                position: "sticky",
                                left: 0,
                                zIndex: 88,
                                backgroundColor: "white",
                                borderTop: "2px solid black",
                                borderRight: "2px solid black"
                            }}
                        >
                            <span>{columns[1]?.text}</span>
                        </th>

                        {columns.map(({ ref, text }, i) => {
                            if (i >= 2) {
                                return (
                                    <th ref={ref} key={text}>
                                        <span>{text}</span>
                                        <div
                                            style={{ height: tableHeight }}
                                            onMouseDown={() => setActiveIndex(i)}
                                            className={`resize-handle ${activeIndex === i ? "active" : "idle"}`}
                                        />
                                    </th>
                                )
                            }
                        })}
                    </tr>
                </thead>

                <tbody>
                    <tr>
                        <td style={{
                            position: "sticky", left: 0, zIndex: 88, backgroundColor: "white", borderLeft: "2px solid black"
                        }}>
                            <span>Large Detroit Style Pizza</span>
                        </td>
                        <td style={{ borderRight: "2px solid black" }}>
                            <span>3213456785</span>
                        </td>
                        <td>
                            <span>$31.43</span>
                        </td>
                        <td>
                            <span>Pending</span>
                        </td>
                        <td>
                            <span>Dave</span>
                        </td>
                    </tr>
                    <tr>
                        <td style={{
                            position: "sticky",
                            left: 0,
                            zIndex: 88,
                            backgroundColor: "white",
                            borderLeft: "2px solid black"
                        }}>
                            <span>
                                Double Decker Club With Fries. Pickles, extra side avacado
                            </span>
                        </td>
                        <td style={{ borderRight: "2px solid black" }}>
                            <span>9874563245</span>
                        </td>
                        <td>
                            <span>$12.99</span>
                        </td>
                        <td>
                            <span>Delivered</span>
                        </td>
                        <td>
                            <span>Cathy</span>
                        </td>
                    </tr>
                    <tr >
                        <td style={{
                            position: "sticky", left: 0, zIndex: 88, backgroundColor: "white", borderLeft: "2px solid black",
                            borderBottom: "2px solid black"
                        }}>
                            <span>Family Sized Lobster Dinner</span>
                        </td>
                        <td style={{ borderRight: "2px solid black", borderBottom: "2px solid black" }}>
                            <span>3456781234</span>
                        </td>
                        <td>
                            <span>$320.00</span>
                        </td>
                        <td>
                            <span>In Progress</span>
                        </td>
                        <td>
                            <span>Alexander</span>
                        </td>
                    </tr>
                </tbody>
            </ResizableTable>
        </TableWrapper>
    );
}   
