
// const call = (name) => {
//         alert(name)
//     }
function Task1() {
    const call = (name) => {
        alert(name)
    }

    // function call(){
    //     alert("function called");
    // }
    // call()

    return (
        <>




            <button onClick={() => call("apple")}>apple</button>
            <button onClick={() => call("banana")}>banana</button>
            <button onClick={call}>apple</button>
        </>
    );
}
export default Task1;