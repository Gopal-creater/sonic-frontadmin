import { useSelector } from "react-redux"

export function SelectedColumn(title) {
    const checkedColumns = useSelector(state => state.monitor)
    return checkedColumns.columns.includes(title)
}
