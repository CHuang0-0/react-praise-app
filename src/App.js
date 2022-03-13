import React, {useState, useEffect, useReducer} from "react";
import './App.css';
import celiapic from "./celia_london.jpg"

const sports=[
  "Swimming",
  "Dancing",
  "Biking",
  "Volleyball",
  "Football",
  "Basketball"
];
// sports.map((sport)=>console.log(sport));
const sportObjects=sports.map((sport,i)=>(
  {id:i,title:sport})
);
// console.log(sportObjects);

function App() {
  return (
    <>
      <div className="App">
        <Header name="Celia"/>
        <Main whom="yourself" sports={sportObjects}/>
        <GithubData login="CHuang0-0"/>  
        <Footer year={new Date().getFullYear()} />
      </div>
    </>
  );
};
export default App;

function Header(props){
  console.log(props);
  return(
    <header>
        <h1>Welcome to {props.name}'s Self-praise</h1>
    </header>
  )
}

function Main(props){
  // define const
  const [Praise, setPraise]=useState("the best");
  const [TeamPraise, setTeamPraise]=useState("hard-working");
  // const [checked, setChecked]=useState(false);
  const [checked, toggle]=useReducer(
    (checked)=>!checked,  //reducer function
    false  //initial state
  );
  // console.log({checked});

  // console useEffect
  useEffect(() => {
    console.log(`You are ${Praise}!`);
  }, [Praise]);

  useEffect(()=>{
    console.log(`Celia is ${TeamPraise}`);
  }, [TeamPraise]);

  // define functions
  function Permission(props){
    return (
      <>
        {props.authorized?
        <div>
          <p>You are viewing the secret content.</p>
          <a href="https://www.linkedin.com/in/cecehuang" target="_blank" >Celia's LinkedIn</a>
        </div>
        :<p>You don't have access to the secret content.</p>
        }
      </> 
    )
  }

  // return content
  return(
    <section>
      <div className="Part1">
        <h2>Praise {props.whom}: I am {Praise} and {TeamPraise}!</h2>
        <button onClick={()=>setPraise("awesome")}>
          Awesome
        </button>
        <button onClick={()=>setPraise("motivated")}>
          Motivate
        </button>
        <button onClick={()=>setPraise("a champ")}>
          Champ
        </button>
        <button onClick={()=>setTeamPraise("supportive")}>
          Supportive
        </button>
        <button onClick={()=>setTeamPraise("attentive")}>
          Attentive
        </button>
      </div>

      <div className="Part2">
        <img src={celiapic} height={500}>
        </img>
        <ul style={{textAlign: "left"}}>
          {props.sports.map((sport)=>(
            <li key={sport.i}>
              {sport.title}
            </li>
          ))}
        </ul>
      </div>

      <div className="Part3">
        <input type="checkbox" value={checked} onChange={toggle}></input>
        <p>{checked?"Like":"Unlike"}</p>
        <Permission authorized={checked} />
      </div>

      <div className="Part4">

      </div>

    </section>
  )
}

function GithubData(props){
  const[data, setData]=useState(null);
  const[loading, setLoading]=useState(null);
  const[error,setError]=useState(false);

  useEffect(()=>{
    if(!props) return;
    setLoading(true);

    fetch(`https://api.github.com/users/${props.login}`)  //login=CHuang0-0
    .then((response)=>response.json())
    .then(setData)
    .then(()=>setLoading(false))
    .catch(setError);
  },[props.login]);
  // console.log(props);

  if (loading) return <h1>Loading...</h1>;
  if (error) return <pre>{JSON.stringify(error,null,2)}</pre>;
  if (data) {
    return (
      <div>
        {/* {JSON.stringify(data)} */}
        <h2>Celia's Github Profile</h2>
        <h5>{data.company}</h5>
        <h5>{data.location}</h5>
        <img alt={data.name} src={data.avatar_url} width={100}/>
      </div>
    )
  } else {
    return <p>No Github Data Available</p>;
  }
}  

function Footer(props){
  return (
    <footer>
      <p>Cheer up. It's {props.year}!</p>
    </footer>
  )
}


