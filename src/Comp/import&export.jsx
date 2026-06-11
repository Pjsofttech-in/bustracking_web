//default export
//named export
//multiple exports

function DefaultExport(){
    return(
        <h1>Default Export</h1>
)
}

function NamedExport(){
    return(
        <h1>Named Export</h1>
)
}
function MultipleExport(){
    return(
        <h1>Multiple Export</h1>
)
}
export const UserKey="Ninja007pawan"
export {NamedExport,MultipleExport}
export default DefaultExport
