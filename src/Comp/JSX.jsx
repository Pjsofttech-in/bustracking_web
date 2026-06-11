

function JSX() {
    let path="https://images.pexels.com/photos/37644557/pexels-photo-37644557.jpeg";
    const name = "John"
    const fn1 = undefined;
     const fn2 = "";
    let x = 30;
    let y= 10;
    const obj={
        name:"pawan",
        age: 25,
        email: "pawan@example.com"
    }
    const arr = ["React", "JavaScript", "HTML", "CSS"]
    function sum(a,b){
     return a+b
    }
    const X=()=>{
        return "Hello from X function!"
    }
    function operation(a,b,op="+"){
        if(op==="+"){
            return a+b
        }
        else if(op=="-"){
            return a-b
        }
        else if(op=="*"){
            return a*b
        }
    }
    return(
        <>
        {/* User variables in JSX */}
        <h1>Hello, {name}!</h1>
           
            {/* Handling undefined and empty string */}
        <h2>{fn1? fn1 : "Friend 1 not found"}</h2>
        <h2>{fn2? fn2 : "Friend 2 not found"}</h2>
        {/* Expression in JSX */}
        <h2>Sum of {x} and {y} is {x+y}</h2>
           
            {/* JSX with event handling */}
        <button onClick={()=>alert("Button clicked!")}>Click me</button>
        
        {/* JSX with javascript function call */}
        <h2>Sum  is {sum(8,9)}</h2>
       
        {/* JSX with component function */}
        <h2>{X()}</h2>

        {/* JSX with conditional rendering */}
        <h2>Operation of 5 and 3 is {operation(5,3,"*")}</h2>

        {/* JSX with object properties */}
        <h2>Email: {obj.email}</h2>
    
        {/* JSX with array mapping */}
        <ul>
            {arr.map((item, index) => (
                <li key={index}>{item}</li>
            ))}
        </ul>
        {/*jsx with array index*/}
        <h1>{arr[2]}</h1>

        {/*jsx with html tags*/}
        <input type="text" value={name} />
        {/* <img src={path}/> */}
        </>
        
        




    )
}
export default JSX;